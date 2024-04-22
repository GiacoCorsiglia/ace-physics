import { SectionBox } from "@/components";
import { Model } from "@/reactivity";
import { Tracker } from "@/reactivity/tracker";
import { TutorialSchema } from "@/schema/tutorial";
import { PosttestSectionConfig, PretestSectionConfig } from "../config";
import { tracked } from "../state-tree";

export const PreOrPostTestSection = tracked(function PreOrPostTestSection(
  {
    config,
    modelsTracker,
  }:
    | {
        config: PretestSectionConfig;
        modelsTracker: Tracker<
          Model<TutorialSchema>["properties"]["pretest"]["properties"]
        >;
      }
    | {
        config: PosttestSectionConfig;
        modelsTracker: Tracker<
          Model<TutorialSchema>["properties"]["posttest"]["properties"]["responses"]["properties"]
        >;
      },
  state,
) {
  const modelsAccessedBefore = modelsTracker.currentAccessed.size;
  const body =
    config.body instanceof Function
      ? config.body(modelsTracker.proxy, state)
      : config.body;
  const modelsAccessedAfter = modelsTracker.currentAccessed.size;
  const anyModelsUsed = modelsAccessedAfter - modelsAccessedBefore > 0;

  const enumerate =
    config.enumerate === undefined ? anyModelsUsed : config.enumerate;

  return (
    <SectionBox as="section" enumerate={enumerate}>
      {body}
    </SectionBox>
  );
});
