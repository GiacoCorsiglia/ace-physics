import { Content } from "@/design/layout";
import { SyncIcon } from "@primer/octicons-react";
import { css } from "linaria";

export default function TutorialLoading() {
  return (
    <Content className="margin-top text-center">
      <SyncIcon
        size="large"
        aria-label="Loading…"
        className={css`
          animation: rotating 1.5s linear infinite;

          @keyframes rotating {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      />
    </Content>
  );
}
