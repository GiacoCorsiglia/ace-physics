import { Image, M, Prose } from "@/components";
import { page } from "@/tutorial";
import fig5 from "./assets/D-fig-5.png";

import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "finaloperations2",
  label: "Final Operations on Bob's state (Part 2)",
  answers: "checked-all",

  sections: [
    section({
      name: "finaloperations2Intro",
      body: (
        <Prose>
          <Image src={fig5} alt="circuit diagram D-5" />
          Once again, we remind you of the state before measurement:
          {/* (with terms
          reorganized so we can easily spot the 4 possible measurement outcomes
          for Alice to the left of the tensor product):  */}
          <br />
          <M
            t="\ket{\psi_2} = \frac{1}{2}(\ \ \ \ket{00} \otimes (a\ket{0} + b\ket{1})
          \ + \ket{01} \otimes (a\ket{1} + b\ket{0})"
          />
          <br />
          <M
            t="\qquad \qquad + \ket{10} \otimes (a\ket{0} - b\ket{1})
          + \ket{11} \otimes (a\ket{1} - b\ket{0}) "
          />
          <br />
        </Prose>
      ),
      continue: {
        label: "I’m ready to move on!",
      },
    }),

    // Wrap up the page
    //
    //
    //
  ],
}));
