import { Content } from "@/design/layout";
import { SyncIcon } from "@primer/octicons-react";
import styles from "./TutorialLoading.module.scss";

export default function TutorialLoading() {
  return (
    <Content className="margin-top text-center">
      <SyncIcon
        size="large"
        aria-label="Loading…"
        className={styles.animatedIcon}
      />
    </Content>
  );
}
