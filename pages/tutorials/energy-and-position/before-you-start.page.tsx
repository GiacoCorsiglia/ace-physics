import { Prose } from "@/design";
import { ChooseOne, TextArea } from "@/inputs";
import M from "@/math/M";
import { pretest } from "@/tutorial";
import React from "react";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (
        <Prose>
          Consider two spin–½ states. They are the same, except for a negative
          sign on the second term:
          <M
            display
            t="
                \begin{aligned}
                \ket{\psi_1} &= \frac{1}{2}\ket{\uparrow} + \frac{\sqrt{3}}{2}\ket{\downarrow} \\
                \ket{\psi_2} &= \frac{1}{2}\ket{\uparrow} - \frac{\sqrt{3}}{2}\ket{\downarrow}
                \end{aligned}
                "
          />
          Consider the <em>True/False</em> questions below:
        </Prose>
      ),
    }),

    section({
      body: (m) => (
        <ChooseOne
          model={m.probUpZEqual}
          choices={trueFalse}
          label={
            <Prose>
              <em>True or false:</em> The probability(measuring <M t="Z" />{" "}
              component of spin to be <M t="+\hbar/2" /> for state{" "}
              <M t="\ket{\psi_1}" />) EQUALS the probability(measuring{" "}
              <M t="Z" /> component of spin to be <M t="+\hbar/2" /> for state{" "}
              <M t="\ket{\psi_2}" />)
            </Prose>
          }
        />
      ),
    }),

    section({
      body: (m) => (
        <ChooseOne
          model={m.probDownZEqual}
          choices={trueFalse}
          label={
            <Prose>
              <em>True or false:</em> The probability(measuring <M t="Z" />{" "}
              component of spin to be <M t="-\hbar/2" /> for state{" "}
              <M t="\ket{\psi_1}" />) EQUALS the probability(measuring{" "}
              <M t="Z" /> component of spin to be <M t="-\hbar/2" /> for state{" "}
              <M t="\ket{\psi_2}" />)
            </Prose>
          }
        />
      ),
    }),

    section({
      body: (m) => (
        <ChooseOne
          model={m.probUpXEqual}
          choices={trueFalse}
          label={
            <Prose>
              <em>True or false:</em> The probability(measuring <M t="X" />{" "}
              component of spin to be <M t="+\hbar/2" /> for state{" "}
              <M t="\ket{\psi_1}" />) EQUALS the probability(measuring{" "}
              <M t="X" /> component of spin to be <M t="+\hbar/2" /> for state{" "}
              <M t="\ket{\psi_2}" />)
            </Prose>
          }
        />
      ),
    }),

    section({
      body: (m) => (
        <TextArea
          model={m.howToNormalizeWaveFunction}
          label={
            <Prose>
              This may be a little tough to “type” in words, but do your best.
              Briefly, how might you go about normalizing a wave function{" "}
              <M t="\psi(x) = \braket{x|\psi}" />?
            </Prose>
          }
          minRows={4}
        />
      ),
    }),
  ],
}));

const trueFalse = [
  ["true", "True"],
  ["false", "False"],
] as const;
