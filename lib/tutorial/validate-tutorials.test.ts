import { TutorialSchema } from "@/schema/tutorial";
import { tutorialSchemas } from "@pages/tutorials/schemas";
import * as fs from "fs";
import * as path from "path";
import {
  NodeConfig,
  PageConfig,
  SectionConfig,
  TutorialConfig,
} from "./config";

const tutorialsDir = path.join(__dirname, "../../pages/tutorials");

const pageSuffix = /\.page\.tsx$/;
const nonPageFiles = new Set([
  "index.page.tsx",
  "feedback.page.tsx",
  "before-you-start.page.tsx",
]);

const findAllSections = (nodes: readonly NodeConfig[]): SectionConfig[] =>
  nodes.flatMap((node) => {
    switch (node.kind) {
      case "section":
        return node;
      case "sequence":
        return findAllSections(node.sections);
      case "oneOf":
        return findAllSections(Object.values(node.sections));
    }
  });

fs.readdirSync(tutorialsDir)
  .map((p) => path.join(tutorialsDir, p))
  .filter((p) => fs.lstatSync(p).isDirectory())
  .map((dir) => {
    const files = fs.readdirSync(dir);
    const pages = files.filter(
      (f) =>
        pageSuffix.test(f) &&
        !f.startsWith(".") && // No hidden files
        !nonPageFiles.has(f) && // No non-page files
        !fs.lstatSync(path.join(dir, f)).isDirectory() // no sub-directories
    );

    return {
      dir: path.relative(__dirname, dir),
      name: path.basename(dir),
      files: new Set(files),
      pages: new Set(pages),
      filePaths: new Set(files.map((p) => path.join(dir, p))),
      pagePaths: new Set(files.map((p) => path.join(dir, p))),
    };
  })
  .forEach((t) => {
    const req = (f: string) => require(path.join(t.dir, f));
    const importDefault = (f: string) => req(f).default;

    // eslint-disable-next-line jest/valid-title
    describe(t.name, () => {
      const setup: TutorialConfig = importDefault(
        t.files.has("setup.tsx") ? "setup.tsx" : "setup.ts"
      );
      const schema: TutorialSchema = importDefault("schema.ts");
      const pages = new Map(
        [...t.pages].map((p) => [p.replace(pageSuffix, ""), importDefault(p)])
      );
      const pageConfigs: Map<string, PageConfig> = new Map(
        [...pages.entries()].map(([p, f]) => [p, f.config])
      );

      it("setup includes correct schema", () => {
        expect(setup.schema).toBe(schema);
      });

      it("setup link matches directory name", () => {
        expect(setup.link).toBe(t.name);
      });

      it(`schema is exported as "${setup.name}" from pages/tutorials/schemas.ts`, () => {
        expect(tutorialSchemas.has(setup.name)).toBe(true);
        expect(tutorialSchemas.get(setup.name)).toBe(schema);
      });

      it("intro page", () => {
        expect(t.files).toContain("index.page.tsx");
        const index = importDefault("index.page.tsx");
        expect(index.tutorialConfig).toBe(setup);
        expect(index.displayName).toMatch("Intro");
      });

      it("feedback page", () => {
        expect(t.files).toContain("feedback.page.tsx");
        const feedback = importDefault("feedback.page.tsx");
        expect(feedback.tutorialConfig).toBe(setup);
        expect(typeof feedback === "function").toBe(true);
        expect(feedback.displayName).toMatch("Feedback");
      });

      if (!setup.pretest) {
        it("doesn't have pretest page (because setup.pretest === false)", () => {
          expect(t.files).not.toContain("before-you-start.page.tsx");
        });
      } else {
        it("pretest page", () => {
          expect(t.files).toContain("before-you-start.page.tsx");
          const pretest = importDefault("before-you-start.page.tsx");
          expect(pretest.tutorialConfig).toBe(setup);
          expect(typeof pretest === "function").toBe(true);
          expect(pretest.displayName).toMatch("Pretest");
        });
      }

      it("page names start with consecutive numbers", () => {
        let i = 1;
        t.pages.forEach((p) => expect(p).toMatch(new RegExp(`^${i++}\\-`)));
      });

      it("setup pages match page files and are numerically sorted", () => {
        expect(setup.pages).toMatchObject(
          [...t.pages]
            .sort()
            .map((f) => ({ link: f.replace(/\.page\.tsx$/, "") }))
        );
      });

      it("no repeated page names", () => {
        const pageConfigNames = [...pageConfigs.values()].map((c) => c.name);
        const uniques = [...new Set(pageConfigNames)];
        expect(pageConfigNames).toStrictEqual(uniques);
      });

      it("schema pages match page config names", () => {
        const schemaPages = new Set(
          Object.keys(schema.properties.pages.properties)
        );
        const pageConfigNames = [...pageConfigs.values()].map((c) => c.name);
        pageConfigNames.forEach((name) => {
          expect(schemaPages).toContain(name);
        });
      });

      const allSections = [...pageConfigs.values()].flatMap((page) =>
        findAllSections(page.sections)
      );

      it("no repeated or invalid section names", () => {
        const validSectionNames = new Set(
          Object.keys(schema.properties.sections.properties)
        );
        const usedSectionNames = new Set<string>();

        allSections.forEach((section) => {
          expect(validSectionNames).toContain(section.name);
          expect(usedSectionNames).not.toContain(section.name);
          usedSectionNames.add(section.name);
        });
      });

      it("no repeated or invalid hint names", () => {
        const validHintNames = new Set(
          Object.keys(schema.properties.hints.properties)
        );
        const usedHintNames = new Set<string>();

        allSections.forEach((section) => {
          (section.hints || []).flat().forEach((hint) => {
            expect(validHintNames).toContain(hint.name);
            expect(usedHintNames).not.toContain(hint.name);
            usedHintNames.add(hint.name);
          });
        });
      });

      pages.forEach((page, pageName) => {
        it(`page: ${pageName}`, () => {
          expect(typeof page === "function").toBe(true);
          expect(page.tutorialConfig).toBe(setup);
          expect(page.displayName).toMatch("Page");
        });
      });

      // eslint-disable-next-line jest/expect-expect
      it("sections have either body or guidance", () => {
        allSections.forEach((section) => {
          if (!section.body && !section.guidance) {
            throw new Error(
              `Section "${section.name}" has neither body nor guidance`
            );
          }
        });
      });

      it("no repeated models", () => {
        // const identifier = /^[A-Za-z_][0-9A-Za-z_$]*$/;
        const modelsArgX = /^\s*\(?([A-Za-z_$][0-9A-Za-z_$]*)(?:,|\s|=>)/;

        const allAccessedModels: string[] = [];
        const allRepeatedModels: string[] = [];

        allSections.forEach((section) => {
          const body = section.body;
          if (!(body instanceof Function)) {
            return;
          }
          if (body.length < 1) {
            return;
          }
          const code = body.toString();

          const modelsArgMatch = code.match(modelsArgX);
          const modelsArg = modelsArgMatch ? modelsArgMatch[1] : null;
          if (modelsArg === null) {
            // We've already checked the arity, so we should be able to find the
            // name of the models arg with this pattern.
            throw new Error("Broken test");
          }

          // Check for things like:
          // m.modelName
          // m.modelName.properties
          // m.modelName.properties.subModelName.elements[0]
          // As well as:
          // m.modelName /* ignore-repeated-model */
          const modelAccessX = new RegExp(
            `[^0-9A-Za-z_$]?${modelsArg}((?:\\.[A-Za-z_$][0-9A-Za-z_$]*|\\[[0-9]+\\])+)(\\s*/\\*\\s*ignore-repeated-model\\s*\\*/)?`,
            "g"
          );
          const matches = [...code.matchAll(modelAccessX)];
          matches.forEach((match) => {
            const model = match[1].slice(1); // Drop the first dot
            if (match[2]) {
              allRepeatedModels.push(model);
            } else {
              allAccessedModels.push(model);
            }
          });
        });

        const allAccessedSet = new Set(allAccessedModels);
        const uniques = [...new Set(allAccessedModels)];
        expect(allAccessedModels).toStrictEqual(uniques);

        // Also make sure we don't have any that were flagged as "repeated"
        // but actually weren't.
        allRepeatedModels.forEach((repeatedModel) => {
          if (!allAccessedSet.has(repeatedModel)) {
            throw new Error(
              `Model "${repeatedModel}" was flagged as repeated, but it wasn't actually repeated`
            );
          }
        });
      });
    });
  });
