import { Prose } from "@/components";
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
  name: "EPR",
  edition: "Main",
  link: "epr",
  label: "EPR and Entangled States",
  pretest: true,
  info: (
    <Prose faded size="smallest">
      <em>
        This tutorial is from{" "}
        <a
          href="https://www.asc.ohio-state.edu/heckler.6/"
          target="_blank"
          rel="noopener noreferrer"
        >
          A. Heckler
        </a>{" "}
        at Ohio State University (modified by CU Boulder)
      </em>
    </Prose>
  ),
  pages: [
    {
      link: "1-classical-marble-scenario",
      label: "Classical Marble Scenario",
    },
    {
      link: "2-entangled-states",
      label: "Entangled States",
    },
    {
      link: "3-investigating-correlation",
      label: "Investigating Correlation",
    },
    {
      link: "4-quantum-cryptography",
      label: "Quantum Cryptography",
    },
    {
      link: "5-eavesdropping-detection",
      label: "Eavesdropping Detection",
    },
  ],
});
