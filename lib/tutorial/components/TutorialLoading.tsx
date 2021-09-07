import { MainContentBox } from "@/components";
import { SyncIcon } from "@primer/octicons-react";
import styles from "./TutorialLoading.module.scss";

export default function TutorialLoading() {
  return (
    <MainContentBox className="text-center">
      <SyncIcon
        size="large"
        aria-label="Loading…"
        className={styles.animatedIcon}
      />
    </MainContentBox>
  );
}
