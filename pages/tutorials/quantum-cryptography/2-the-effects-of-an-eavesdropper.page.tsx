import { M, Prose } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "theEffectsOfAnEavesdropper",
  label: "TODO",
  answers: "none",
  sections: [
    section({
      name: "theEffectsOfAnEavesdropperIntro",
      body: (
        <Prose>
          TODO <M t="\ket{+}" />
        </Prose>
      ),
    }),

    section({
      name: "isPossibleEveMakeMeasurement",
      body: <></>,
    }),
  ],
}));
