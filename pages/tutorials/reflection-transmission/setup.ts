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
  id: "ReflectionTransmission",
  link: "reflection-transmission",
  label: "Reflecting on Transmission",
  pretest: true,
  posttest: false,
  pages: [
    {
      link: "1-symmetric-potential-well",
      label: "Symmetric Potential Well",
    },
    {
      link: "2-transmission-coefficients",
      label: "Transmission Coefficients",
    },
    {
      link: "3-transmission-for-the-potential-well-experiment",
      label: "Transmission for the Potential Well: Experiment",
    },
    {
      link: "4-transmission-for-the-potential-well-formula",
      label: "Transmission for the Potential Well: Formula",
    },
    {
      link: "5-summary",
      label: "Summary",
    },
  ],
});
