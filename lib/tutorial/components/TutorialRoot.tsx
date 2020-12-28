import { JsxElement } from "@/helpers/frontend";
import { TutorialConfig } from "../config";
import { Root } from "../state-tree";
import TutorialHeader from "./TutorialHeader";
import TutorialNav from "./TutorialNav";
import TutorialSidebar from "./TutorialSidebar";

export default function TutorialRoot({
  config,
  routeElement,
}: {
  config: TutorialConfig;
  routeElement: JsxElement;
}) {
  const schema = config.schema;

  return (
    <Root overrideRootField={schema} initial={{}}>
      <TutorialHeader config={config} />
      <TutorialNav config={config} />
      <TutorialSidebar />
      {routeElement}
    </Root>
  );
}
