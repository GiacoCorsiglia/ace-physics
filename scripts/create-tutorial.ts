import * as fs from "fs";
import { join } from "path";
import { promisify } from "util";

const tutorialsDir = join(__dirname, "../pages/tutorials");

export async function run(name: string) {
  const dir = join(tutorialsDir, name);

  if (fs.existsSync(dir)) {
    throw new Error(`Tutorial ${name} already exists.`);
  }

  console.log("Creating directory:", join("pages/tutorials", name));
  fs.mkdirSync(dir);

  const files: Record<string, (name: string) => string> = {
    "schema.ts": schema,
    "setup.ts": setup,
    "index.page.tsx": introPage,
    "feedback.page.tsx": feedbackPage,
  };
  console.log("Creating files...\n ", Object.keys(files).join("\n "));
  const writeFile = promisify(fs.writeFile);
  await Promise.all(
    Object.entries(files).map(([file, contents]) =>
      writeFile(join(dir, file), contents(name))
    )
  );
  console.log("Done.");

  const pascal = pascalCase(name);
  console.log("Don't forget to add these lines to pages/tutorials/schemas.ts:");
  console.log(`import ${pascal} from "./${name}/schema";`);
  console.log(`["${pascal}", ${pascal}]`);
}

const schema = () => `import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    // Pages here.
  },
  pretest: {
    // Pretest fields here.
  },
  posttest: {
    // Posttest fields here.
  },
  sections: {
    // Sections here.
  },
  responses: {
    // Response fields here.
  },
  hints: {
    // Hints here.
  },
});
`;

const setup = (name: string) => `import type { Model } from "@/reactivity";
import type { Infer } from "@/schema/fields";
import { tutorialSetup } from "@/tutorial";
import schema from "./schema";

export type Schema = typeof schema;
export type State = Infer<Schema>;
export type Models = Model<Schema>["properties"];
export type Responses = Infer<Schema["properties"]["responses"]>;
export type ResponseModels = Model<
  Schema["properties"]["responses"]
>["properties"];

export default tutorialSetup({
  schema,
  id: "${pascalCase(name)}",
  link: "${name}",
  label: "TODO",
  pretest: false,
  posttest: false,
  pages: [
    {
      link: "1-TODO",
      label: "TODO",
    },
  ],
});
`;

const introPage = () => `import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      TODO
    </Prose>
  ),
}));
`;

const feedbackPage = () => `import { feedback } from "@/tutorial";
import setup from "./setup";

export default feedback(setup);
`;

const pascalCase = (s: string) =>
  s
    .replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
    .replace(/-/g, "");
