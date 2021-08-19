import { styled } from "@/helpers/frontend";
import { autoProse } from "../typography";
import styles from "./labels.module.scss";

export const ControlLabel = styled.label(styles.controlLabel, autoProse);
interface AlignProp {
  align?: "start" | "center" | "end";
}

export const LabelsLeft = styled.div<AlignProp>(({ align = "start" }) => [
  styles.labelsLeft,
  align === "start" && styles.alignStart,
  align === "center" && styles.alignCenter,
  align === "end" && styles.alignEnd,
]);

export const LabelsRight = styled.div<AlignProp>(({ align = "center" }) => [
  styles.labelsRight,
  align === "start" && styles.alignStart,
  align === "center" && styles.alignCenter,
  align === "end" && styles.alignEnd,
]);
