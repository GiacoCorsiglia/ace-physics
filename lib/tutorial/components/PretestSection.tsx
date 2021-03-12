import { Content } from "@/design/layout";
import styles from "@/design/structure.module.scss";
import { cx } from "@/helpers/frontend";
import { Model } from "@/reactivity";
import { Tracker } from "@/reactivity/tracker";
import { TutorialSchema } from "@/schema/tutorial";
import { PretestSectionConfig } from "../config";
import { tracked } from "../state-tree";

export default tracked(function PretestSection(
  {
    config,
    modelsTracker,
  }: {
    config: PretestSectionConfig;
    modelsTracker: Tracker<
      Model<TutorialSchema>["properties"]["pretest"]["properties"]
    >;
  },
  state
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
    <Content
      as="section"
      className={cx(styles.section, enumerate && styles.enumerated)}
    >
      {body}
    </Content>
  );
});
