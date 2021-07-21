import { cx } from "@/helpers/css";
import { Html, useToggle } from "@/helpers/frontend";
import { ThreeBarsIcon, XIcon } from "@primer/octicons-react";
import React, { useRef } from "react";
import { Caret } from "./caret";
import styles from "./header.module.scss";

export const Header = ({ children }: { children: Html }) => (
  <>
    {/* This spacer is a hack but it's simpler than styling <body>. */}
    <div className={styles.headerSpacer} />
    <header className={styles.header}>{children}</header>
  </>
);

export const HeaderPopover = ({
  icon,
  children,
}: {
  icon: Html;
  children: Html;
}) => {
  const [isOpen, setOpen, popoverRef] = useToggle<HTMLDivElement>();

  return (
    <div className={styles.popoverWrapper}>
      <button
        type="button"
        className={styles.popoverButton}
        onClick={() => setOpen((o) => !o)}
      >
        {icon}
      </button>

      {isOpen && (
        <div ref={popoverRef} className={styles.popover}>
          {children}
        </div>
      )}
    </div>
  );
};

export const Nav = ({ children }: { children: Html }) => {
  const [isOpen, setOpen, ref] = useToggle<HTMLOListElement>();

  return (
    <div className={styles.navWrapper}>
      <button
        type="button"
        className={cx(styles.navToggleButton, isOpen && styles.navOpen)}
        onClick={() => setOpen((o) => !o)}
      >
        {isOpen ? (
          <XIcon className={styles.xIcon} />
        ) : (
          <ThreeBarsIcon className={styles.hamburgerIcon} />
        )}
      </button>

      {/* Hide/show with CSS since this is a media-query thing. */}
      <ol className={cx(styles.nav, isOpen && styles.navOpen)} ref={ref}>
        {children}
      </ol>
    </div>
  );
};

export const NavItem = ({
  style = "default",
  status,
  link,
  icon,
  children,
}: {
  style?: "small" | "default";
  status?: "complete" | "active" | "incomplete";
  link: string;
  icon: Html;
  children?: Html;
}) => {
  const labelRef = useRef<HTMLParagraphElement>(null);
  const handleHover = (e: React.MouseEvent | React.FocusEvent) => {
    // https://css-tricks.com/popping-hidden-overflow/
    const li = e.currentTarget as HTMLLIElement;
    labelRef.current?.style.setProperty("top", `${li.offsetTop}px`);
  };
  return (
    <li
      className={cx(
        styles.navItem,
        style === "default" && styles.withProgressConnector,
        status === "complete" && styles.navItemComplete,
        status === "active" && styles.navItemActive,
        status === "incomplete" && styles.navItemIncomplete
      )}
      onMouseOver={handleHover}
      onFocus={handleHover}
    >
      <a href={link} className={styles.navItemLink}>
        <span
          className={
            style === "small" ? styles.navItemIconSmall : cx(styles.navItemIcon)
          }
        >
          {icon}
        </span>

        <p className={styles.navItemLabel} ref={labelRef}>
          <Caret className={styles.svgCaret} />
          {children}
        </p>
      </a>
    </li>
  );
};
