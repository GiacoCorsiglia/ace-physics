import { memo } from "react";
import { PretestSectionConfig } from "../config";
import { useRootModel, useTracked } from "../state-tree";

export default memo(function PretestSection({
  config,
}: {
  config: PretestSectionConfig;
}) {
  return useTracked(function C(state) {
    const rootModel = useRootModel();
    const models = rootModel.properties.pretest.properties;

    const body =
      config.body instanceof Function
        ? config.body(models, state)
        : config.body;

    return <>{body}</>;
  });
});
