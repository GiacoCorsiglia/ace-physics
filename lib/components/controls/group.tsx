import { styled } from "@/helpers/frontend";
import styles from "./group.module.scss";

// Not that kind of control group :P
const ControlGroup = styled.div(styles.controlGroupWrapper, (children) => (
  <div className={styles.controlGroup}>{children}</div>
));
const ControlGroupText = styled.div("controlGroupText");

const exportedControlGroup = Object.assign(ControlGroup, {
  Text: ControlGroupText,
});
export { exportedControlGroup as ControlGroup };
