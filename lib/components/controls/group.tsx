import { styled } from "@/helpers/frontend";
import styles from "./group.module.scss";

// Not that kind of control group :P
const ControlGroup = styled.div(styles.controlGroup);
const ControlGroupText = styled.div(styles.controlGroupText);

const exportedControlGroup = Object.assign(ControlGroup, {
  Text: ControlGroupText,
});
export { exportedControlGroup as ControlGroup };
