import { Prose } from "@/design";
import { ChooseOne, TextArea } from "@/inputs";
import M from "@/math/M";
import { pretest } from "@/tutorial";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  continue: {
    allowed: (_a, _b, modelStatuses) =>
      modelStatuses.every(
        ([key, isSet]) =>
          isSet ||
          key === "whatHappensToSpinInMagneticFieldExplain" ||
          key === "orientationOfSpinExitingMagneticFieldExplain"
      ),
  },
  sections: [
    section({
      body: (m) => (
        <>
          <Prose>
            <p>
              A spin-½ particle is in the state <M t="\ket{+}_x" /> (spin up in
              the <M t="+X" /> direction).
            </p>

            <p>
              At <M t="t=0" /> it enters a region of uniform B-field, which
              points in the <M t="+Z" /> direction.
            </p>
          </Prose>

          <ChooseOne
            model={m.whatHappensToSpinInMagneticField}
            label={
              <Prose>
                As time progresses, WHILE IT IS IN THIS UNIFORM FIELD, what
                happens to the orientation of its spin?
              </Prose>
            }
            choices={[
              [
                "nothing",
                <>
                  Nothing. It stays <M t="\ket{+}_x" />.
                </>,
              ],
              [
                "rotates around z",
                <>
                  It rotates <b>around</b> the Z-axis, so at some later time it
                  is <M t="\ket{+}_y" />, and later still <M t="\ket{-}_x" />,
                  etc.
                </>,
              ],
              [
                "rotates towards z",
                <>
                  It rotates <b>towards</b> the Z-axis, so at some later time it
                  is <M t="\ket{+}_z" />.
                </>,
              ],
              [
                "flips",
                <>
                  It <b>flips</b> (“quantum jump”) from <M t="\ket{+}_x" /> to{" "}
                  <M t="\ket{-}_x" /> at some later time.
                </>,
              ],
              [
                "other",
                "Something very different (you can describe your ideas below).",
              ],
            ]}
            allowOther={false}
          />

          <TextArea
            model={m.whatHappensToSpinInMagneticFieldExplain}
            label={
              <Prose>Optional: If you want to elaborate, do so here.</Prose>
            }
          />
        </>
      ),
    }),

    section({
      body: (m) => (
        <>
          <ChooseOne
            model={m.orientationOfSpinExitingMagneticField}
            label={
              <Prose>
                Once the particle from Question A above EXITS that region of
                uniform B-field, what can you say about the orientation of its
                spin?
              </Prose>
            }
            choices={[
              [
                "return to original",
                <>
                  It will return to where it started, <M t="\ket{+}_x" /> in
                  this case.
                </>,
              ],
              [
                "sticks with final orientation",
                <>
                  It rotated while it was in the field, and then “sticks” with
                  whatever its final orientation is after it exits the field.
                </>,
              ],
              [
                "continues rotating",
                <>
                  It rotated while it was in the field, and continues to
                  rotate/evolve <b>after</b> it exits the field.
                </>,
              ],
              [
                "other",
                "Something very different (you can describe your ideas below).",
              ],
            ]}
            allowOther={false}
          />

          <TextArea
            model={m.orientationOfSpinExitingMagneticFieldExplain}
            label={
              <Prose>Optional: If you want to elaborate, do so here.</Prose>
            }
          />
        </>
      ),
    }),
  ],
}));
