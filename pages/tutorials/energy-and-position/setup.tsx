import M from "@/math/M";
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
  name: "EnergyAndPosition",
  edition: "Main",
  link: "energy-and-position",
  label: "Energy & Position",
  pretest: true,
  pages: [
    {
      link: "1-energy-basis",
      label: "The Energy Basis",
    },
    {
      link: "2-energy-histograms",
      label: "Energy Histograms",
    },
    {
      link: "3-position-representation-A",
      label: (
        <>
          Representing <M t="\ket{\psi_A}" /> in the Position Basis
        </>
      ),
    },
    {
      link: "4-position-representation-B",
      label: (
        <>
          Representing <M t="\ket{\psi_B}" /> in the Position Basis
        </>
      ),
    },
    {
      link: "5-comparing-representations",
      label: "Comparing Representations",
    },
    {
      link: "6-connecting-bases",
      label: "Wrap Up: Connecting Bases",
    },
  ],
});
