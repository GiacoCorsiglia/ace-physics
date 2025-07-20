// @vitest-environment jsdom
import { TutorialSchema } from "@/schema/tutorial";
import { tutorialList } from "@pages/tutorials/list";
import { tutorialSchemas } from "@pages/tutorials/schemas";
import { describe, expect, it } from "vitest";
import {
  NodeConfig,
  PageConfig,
  SectionConfig,
  TutorialConfig,
} from "./config";

// For some weird reason, these ESM imports weren't working in the Vercel deploy
// context (when we run this test).
const fs: typeof import("node:fs") = require("node:fs");
const path: typeof import("node:path") = require("node:path");

const tutorialsDir = path.join(__dirname, "../../pages/tutorials");

const pageSuffix = /\.page\.tsx$/;
const nonPageFiles = new Set([
  "index.page.tsx",
  "feedback.page.tsx",
  "before-you-start.page.tsx",
  "review.page.tsx",
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
        !fs.lstatSync(path.join(dir, f)).isDirectory(), // no sub-directories
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
    const req = (f: string) => import(path.join(t.dir, f));
    const importDefault = async (f: string) => (await req(f)).default;

    describe(t.name, async () => {
      const setup: TutorialConfig = await importDefault(
        t.files.has("setup.tsx") ? "setup.tsx" : "setup.ts",
      );
      const schema: TutorialSchema = await importDefault("schema.ts");
      const pages = new Map(
        await Promise.all(
          [...t.pages].map(
            async (p) =>
              [p.replace(pageSuffix, ""), await importDefault(p)] as const,
          ),
        ),
      );
      const pageConfigs: Map<string, PageConfig> = new Map(
        [...pages.entries()].map(([p, f]) => [p, f.config]),
      );

      it("setup includes correct schema", () => {
        expect(setup.schema).toBe(schema);
      });

      it("setup link matches directory name", () => {
        expect(setup.link).toBe(t.name);
      });

      it(`schema is exported as "${setup.id}" from pages/tutorials/schemas.ts`, () => {
        expect(tutorialSchemas.has(setup.id)).toBe(true);
        expect(tutorialSchemas.get(setup.id)).toBe(schema);
      });

      it("listing is included in pages/tutorials/list.tsx with correct link", () => {
        if (setup.excludeFromList) {
          return;
        }

        const listing = tutorialList.find((l) => l.id === setup.id);
        expect(listing).not.toBeUndefined();
        expect(listing!.link).toBe(setup.link);
      });

      it("intro page", async () => {
        expect(t.files).toContain("index.page.tsx");
        const index = await importDefault("index.page.tsx");
        expect(index.tutorialConfig).toBe(setup);
        expect(index.displayName).toMatch("Intro");
      });

      it("feedback page", async () => {
        expect(t.files).toContain("feedback.page.tsx");
        const feedback = await importDefault("feedback.page.tsx");
        expect(feedback.tutorialConfig).toBe(setup);
        expect(typeof feedback === "function").toBe(true);
        expect(feedback.displayName).toMatch("Feedback");
      });

      if (!setup.pretest) {
        it("doesn't have pretest page (because setup.pretest === false)", () => {
          expect(t.files).not.toContain("before-you-start.page.tsx");
        });
      } else {
        it("pretest page", async () => {
          expect(t.files).toContain("before-you-start.page.tsx");
          const pretest = await importDefault("before-you-start.page.tsx");
          expect(pretest.tutorialConfig).toBe(setup);
          expect(typeof pretest === "function").toBe(true);
          expect(pretest.displayName).toMatch("Pretest");
        });
      }

      if (!setup.posttest) {
        it("doesn't have posttest page (because setup.posttest === false)", () => {
          expect(t.files).not.toContain("review.page.tsx");
        });
      } else {
        it("posttest page", async () => {
          expect(t.files).toContain("review.page.tsx");
          const posttest = await importDefault("review.page.tsx");
          expect(posttest.tutorialConfig).toBe(setup);
          expect(typeof posttest === "function").toBe(true);
          expect(posttest.displayName).toMatch("Posttest");
        });
      }

      it("page names start with consecutive numbers", () => {
        let topIndex = 0;
        let subIndex = 0;
        t.pages.forEach((p) => {
          const nextTopIndex = topIndex + 1;
          const nextSubIndex = subIndex + 1;

          const testedPatterns: string[] = [];

          // Only look for the next sub-index if we are already nested.
          if (subIndex > 0) {
            const nextSubPattern = new RegExp(
              `^${topIndex}\\-${nextSubIndex}\\-`,
            );
            testedPatterns.push(`${topIndex}-${nextSubIndex}-`);
            if (nextSubPattern.test(p)) {
              subIndex = nextSubIndex;
              return;
            }
          }

          const nextTopWithSubPattern = new RegExp(`^${nextTopIndex}\\-1\\-`);
          testedPatterns.push(`${nextTopIndex}-1-`);
          if (nextTopWithSubPattern.test(p)) {
            topIndex = nextTopIndex;
            subIndex = 1;
            return;
          }

          const nextTopSoloPattern = new RegExp(`^${nextTopIndex}\\-`);
          testedPatterns.push(`${nextTopIndex}-`);
          if (nextTopSoloPattern.test(p)) {
            topIndex = nextTopIndex;
            subIndex = 0;
            return;
          }

          throw new Error(
            `Page "${p}" is out of order in the list of pages:\n` +
              `${[...t.pages].map((s) => `  ${s}`).join("\n")}\n` +
              `Expected the page to start with ${testedPatterns.join(" or ")}`,
          );
        });
      });

      it("setup pages match page files and are numerically sorted", () => {
        expect(setup.pages).toMatchObject(
          [...t.pages]
            .sort()
            .map((f) => ({ link: f.replace(/\.page\.tsx$/, "") })),
        );
      });

      it("no repeated page names", () => {
        const pageConfigNames = [...pageConfigs.values()].map((c) => c.name);
        const uniques = [...new Set(pageConfigNames)];
        expect(pageConfigNames).toStrictEqual(uniques);
      });

      it("schema pages match page config names", () => {
        const schemaPages = new Set(
          Object.keys(schema.properties.pages.properties),
        );
        const pageConfigNames = [...pageConfigs.values()].map((c) => c.name);
        pageConfigNames.forEach((name) => {
          expect(schemaPages).toContain(name);
        });
      });

      const allSections = [...pageConfigs.values()].flatMap((page) =>
        findAllSections(page.sections),
      );

      it("no repeated or invalid section names", () => {
        const validSectionNames = new Set(
          Object.keys(schema.properties.sections.properties),
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
          Object.keys(schema.properties.hints.properties),
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

      pages.forEach((page: any, pageName) => {
        it(`page: ${pageName}`, () => {
          expect(typeof page === "function").toBe(true);
          expect(page.tutorialConfig).toBe(setup);
          expect(page.displayName).toMatch("Page");
        });
      });

      it("sections have either body or guidance", () => {
        allSections.forEach((section) => {
          if (!section.body && !section.guidance) {
            throw new Error(
              `Section "${section.name}" has neither body nor guidance`,
            );
          }
        });
      });

      it("no repeated models", () => {
        // const identifier = /^[A-Za-z_][0-9A-Za-z_$]*$/;
        const modelsArgX = /^\s*\(?([A-Za-z_$][0-9A-Za-z_$]*)(?:\)|,|\s|=>)/;

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
            throw new Error("Broken test: failed to match models arg pattern");
          }

          // Check for things like:
          // m.modelName
          // m.modelName.properties
          // m.modelName.properties.subModelName.elements[0]
          // As well as:
          // repeatedModel(m.modelName)
          // repeatedModel(
          //   m.modelName
          // )
          const modelAccessX = new RegExp(
            // It must be preceded by a non-identifier character or the start of
            // the line.
            `(?:^|(repeatedModel\\(\\s*)|[^0-9A-Za-z_$])${modelsArg}((?:\\.[A-Za-z_$][0-9A-Za-z_$]*|\\[[0-9]+\\])+)`,
            "g",
          );
          const matches = [...code.matchAll(modelAccessX)];
          matches.forEach((match) => {
            const model = match[2].slice(1); // Drop the first dot
            if (match[1]) {
              allRepeatedModels.push(model);
            } else {
              allAccessedModels.push(model);
            }
          });
        });

        const allAccessedSet = new Set(allAccessedModels);
        const uniques = [...allAccessedSet];
        expect(allAccessedModels).toStrictEqual(uniques);

        // Also make sure we don't have any that were flagged as "repeated"
        // but actually weren't.
        allRepeatedModels.forEach((repeatedModel) => {
          if (!allAccessedSet.has(repeatedModel)) {
            throw new Error(
              `Model "${repeatedModel}" was flagged as repeated, but it wasn't actually repeated`,
            );
          }
        });
      });
    });
  });
