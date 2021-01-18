import { Prose } from "@/design";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, sequence, hint }) => ({
  name: "matrix-representation",
  label: "Matrix Representation",
  sections: [
    section({
      name: "matrixRepresentationIntro",
      body: <Prose>TODO</Prose>,
    }),
  ],
}));
