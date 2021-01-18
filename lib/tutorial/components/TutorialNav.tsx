import { TutorialConfig } from "../config";

export default function TutorialNav({ config }: { config: TutorialConfig }) {
  return (
    <nav>
      <ul>
        {config.pages.map((page) => (
          <li key={page.link}>
            {/* TODO: add Link */}
            {page.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
