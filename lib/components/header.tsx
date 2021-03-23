import { styled } from "@/helpers/css";
import styles from "./header.module.scss";

export const Header = styled.header(styles.header);

export const HeaderButton = styled.button<{
  side: "left" | "right";
}>(({ side }) => [
  styles.headerButton,
  side === "left" && styles.left,
  side === "right" && styles.right,
]);

export const Nav = styled.ol(styles.nav);

export const NavItem = styled.li<{
  status: "complete" | "active" | "incomplete";
}>(({ status }) => [
  styles.navItem,
  status === "complete" && styles.navItemComplete,
  status === "active" && styles.navItemActive,
  status === "incomplete" && styles.navItemIncomplete,
]);
