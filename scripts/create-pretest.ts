import * as fs from "fs";
import { join } from "path";

const tutorialsDir = join(__dirname, "../pages/tutorials");

export async function run(tutorial: string) {
  const dir = join(tutorialsDir, tutorial);

  if (!fs.existsSync(dir)) {
    throw new Error(`No such tutorial "${tutorial}"`);
  }

  const path = join(dir, `before-you-start.page.tsx`);

  if (fs.existsSync(path)) {
    throw new Error(
      `Pretest ("before-you-start") already exists in "${tutorial}".`,
    );
  }

  console.log(
    "Creating page",
    join("pages/tutorials", tutorial, "before-you-start"),
  );

  fs.writeFileSync(path, template);

  console.log("Done.");
  console.log(
    "Don't forget to add this to",
    join("pages/tutorials", tutorial, "setup.ts"),
  );
  console.log(`pretest: true`);
}

const template = `import { Prose, TextBox } from "@/components";
import { pretest } from "@/tutorial";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (
        <Prose>
          TODO
        </Prose>
      ),
    }),

    section({
      body: (m) => (
        <TextBox
          model={m.TODO}
          label={<Prose>TODO</Prose>}
        />
      ),
    }),
  ],
}));
`;
