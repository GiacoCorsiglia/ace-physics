import * as fs from "fs";
import { join } from "path";

const tutorialsDir = join(__dirname, "../pages/tutorials");

export async function run(tutorial: string, page: string) {
  if (!/^\d\-/.test(page)) {
    throw new Error("Page names should start with a number");
  }

  const dir = join(tutorialsDir, tutorial);

  if (!fs.existsSync(dir)) {
    throw new Error(`No such tutorial "${tutorial}"`);
  }

  const path = join(dir, `${page}.page.tsx`);

  if (fs.existsSync(path)) {
    throw new Error(`Page "${page}" already exists in "${tutorial}".`);
  }

  console.log("Creating page", join("pages/tutorials", tutorial, page));
  const pageWithoutNumber = page.slice(2);
  fs.writeFileSync(path, template(pageWithoutNumber));

  console.log("Done.");
  console.log(
    "Don't forget to add this to",
    join("pages/tutorials", tutorial, "setup.ts")
  );
  console.log(`{\n  link: ${page},\n  label: "TODO",\n}`);
}

const template = (page: string) => `import { Prose } from "@/design";
import { TextArea } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "${camelCase(page)}",
  label: "TODO",
  answersChecked: "none",
  sections: [
    section({
      name: "${`${camelCase(page)}Intro`}",
      body: (
        <Prose>
          TODO <M t="\\ket{+}" />
        </Prose>
      ),
    }),

    section({
      name: "TODO",
      body: (m) => (
        <TextArea
          model={m.TODO}
          label={<Prose>TODO</Prose>}
        />
      ),
    }),
  ],
})`;

const camelCase = (s: string) =>
  s
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "")
    .replace(/\-/g, "");
