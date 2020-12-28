import { TutorialConfig } from "../config";

export default function TutorialHeader({ config }: { config: TutorialConfig }) {
  return (
    <>
      <p>
        {typeof config.label === "string" ? config.label : config.label.html}
      </p>
    </>
  );
}
