import { Content } from "@/design/layout";
import styles from "@/design/structure.module.scss";
import { PretestSectionConfig } from "../config";
import { tracked, useRootModel } from "../state-tree";

export default tracked(function PretestSection(
  {
    config,
  }: {
    config: PretestSectionConfig;
  },
  state
) {
  const rootModel = useRootModel();
  const models = rootModel.properties.pretest.properties;

  const body =
    config.body instanceof Function ? config.body(models, state) : config.body;

  return (
    <Content as="section" className={styles.section}>
      {body}
    </Content>
  );
});
