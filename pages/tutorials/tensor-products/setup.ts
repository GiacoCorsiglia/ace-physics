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
  id: "TensorProducts",
  link: "tensor-products",
  label: "Tensor Products",
  pretest: false,
  posttest: false,
  pages: [
    {
      link: "1-adding-a-second-qubit",
      label: "Adding a Second Qubit",
    },
  ],
});
