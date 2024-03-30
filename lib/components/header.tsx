import { cx, Html, OptionalList, styled, useToggle } from "@/helpers/client";
import { ThreeBarsIcon, XIcon } from "@primer/octicons-react";
import Link, { LinkProps } from "next/link";
import styles from "./header.module.scss";
import { Tooltip, useTooltip } from "./tooltip";

interface NavConfig {
  readonly title: Html;
  readonly items: OptionalList<NavItemWithStatus>;
  readonly secondary: OptionalList<NavItem>;
}

interface NavItem {
  readonly link: string;
  readonly icon: Html;
  readonly label: Html;
}

interface NavItemWithStatus extends NavItem {
  readonly status: "complete" | "active" | "incomplete";
}

export const Header = ({
  title,
  nav,
  popovers,
}: {
  title?: Html;
  popovers?: Html;
  nav?: NavConfig;
}) => (
  <header className={styles.header}>
    <div className={styles.headerBar}>
      {nav && <Nav config={nav} />}

      <HeaderTitle>{title}</HeaderTitle>

      {popovers}
    </div>

    {nav && <NavProgress items={nav.items} />}
  </header>
);

export const HeaderPopover = ({
  icon,
  children,
}: {
  icon: Html;
  children: Html;
}) => {
  const [isOpen, toggleHandler, popoverRef] = useToggle<HTMLDivElement>();

  return (
    <div className={styles.popoverWrapper}>
      <button
        type="button"
        className={cx(styles.popoverButton, isOpen && styles.open)}
        onClick={toggleHandler}
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

const HeaderTitle = styled.div(styles.headerTitle);

const Nav = ({
  config: { items, title, secondary },
}: {
  config: NavConfig;
}) => {
  const [isOpen, toggleHandler, ref] = useToggle<HTMLDivElement>();

  return (
    <nav className={styles.navWrapper}>
      <button
        type="button"
        className={cx(styles.navToggleButton, isOpen && styles.open)}
        onClick={toggleHandler}
      >
        {isOpen ? (
          <XIcon className={styles.xIcon} />
        ) : (
          <ThreeBarsIcon className={styles.hamburgerIcon} />
        )}
      </button>

      {isOpen && (
        <div className={styles.navPopover} ref={ref}>
          <ul className={styles.navSecondaryList}>
            {secondary
              .filter((i): i is NavItem => !!i)
              .map((item) => (
                <NavItem key={item.link} item={item} />
              ))}
          </ul>

          <p className={styles.navTitle}>{title}</p>

          <ol>
            {items
              .filter((i): i is NavItemWithStatus => !!i)
              .map((item) => (
                <NavItem key={item.link} item={item} />
              ))}
          </ol>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ item }: { item: NavItem | NavItemWithStatus }) => {
  const status = "status" in item ? item.status : undefined;

  return (
    <li className={cx(styles.navItem, status === "active" && styles.active)}>
      <Link
        href={item.link}
        className={cx(
          styles.navItemLink,
          status === "complete" && styles.complete,
          status === "active" && styles.active,
        )}
      >
        <span
          className={cx(
            styles.navItemIcon,
            typeof item.icon === "number" && styles.navItemNumberIcon,
          )}
        >
          {item.icon}
        </span>
        <span className={styles.navItemLabel}>{item.label}</span>
      </Link>
    </li>
  );
};

const NavProgress = ({ items }: { items: OptionalList<NavItemWithStatus> }) => (
  <ol className={styles.navProgress}>
    {items
      .filter((i): i is NavItemWithStatus => !!i)
      .map((item) => (
        <NavProgressItem key={item.link} item={item} />
      ))}
  </ol>
);

const NavProgressItem = ({ item }: { item: NavItemWithStatus }) => {
  const { triggerProps, tooltipProps } = useTooltip<HTMLAnchorElement>();

  return (
    <li
      className={cx(
        styles.navProgressItem,
        item.status === "complete" && styles.complete,
        item.status === "active" && styles.active,
        item.status === "incomplete" && styles.incomplete,
      )}
    >
      <Link
        {...(triggerProps as LinkProps)}
        href={item.link}
        className={styles.navProgressItemLink}
      >
        <span className={styles.navProgressItemIcon}>{item.icon}</span>

        <Tooltip
          {...tooltipProps}
          contentClassName={styles.navProgressItemLabel}
          caretClassName={styles.svgCaret}
          alwaysVisiblyHidden
        >
          {item.label}
        </Tooltip>
      </Link>
    </li>
  );
};
