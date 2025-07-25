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
  pretest: true,
  posttest: true,
  pages: [
    {
      link: "1-adding-a-second-qubit",
      label: "Adding a Second Qubit",
    },
    {
      link: "2-operators",
      label: "Operators",
    },
    {
      link: "3-summary-questions",
      label: "Summary Questions",
    },
    {
      link: "4-two-qubit-vector-space",
      label: "The Two Qubit Vector Space",
    },
    {
      link: "5-two-qubit-operators",
      label: "Two Qubit Operators",
    },
    {
      link: "6-more-than-two-qubits",
      label: "More Than Two Qubits",
    },
  ],
});
