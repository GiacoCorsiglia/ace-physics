import { Justify, MainContentBox } from "@/components";
import { SyncIcon } from "@primer/octicons-react";
import styles from "./TutorialLoading.module.scss";

export default function TutorialLoading() {
  return (
    <MainContentBox>
      <Justify center>
        <SyncIcon
          size="large"
          aria-label="Loading…"
          className={styles.animatedIcon}
        />
      </Justify>
    </MainContentBox>
  );
}
