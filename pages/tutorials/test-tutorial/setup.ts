import type { Model } from "@/reactivity";
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
  id: "TestTutorial",
  link: "test-tutorial",
  label: "Documentation Tutorial",
  excludeFromList: true,
  pretest: true,
  posttest: false,
  pages: [
    { link: "1-test-page-1", label: "Test Page 1" },
    { link: "2-test-page-2", label: "Test Page 2" },
  ],
});
