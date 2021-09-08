import { cx, styled } from "@/helpers/css";
import { Html, OptionalList, useToggle } from "@/helpers/frontend";
import { ThreeBarsIcon, XIcon } from "@primer/octicons-react";
import Link from "next/link";
import { Caret } from "./caret";
import styles from "./header.module.scss";

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
  const [isOpen, setOpen, popoverRef] = useToggle<HTMLDivElement>();

  return (
    <div className={styles.popoverWrapper}>
      <button
        type="button"
        className={cx(styles.popoverButton, isOpen && styles.open)}
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

const HeaderTitle = styled.div(styles.headerTitle);

const Nav = ({
  config: { items, title, secondary },
}: {
  config: NavConfig;
}) => {
  const [isOpen, setOpen, ref] = useToggle<HTMLDivElement>();

  return (
    <nav className={styles.navWrapper}>
      <button
        type="button"
        className={cx(styles.navToggleButton, isOpen && styles.open)}
        onClick={() => setOpen((o) => !o)}
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
      <Link href={item.link}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className={cx(
            styles.navItemLink,
            status === "complete" && styles.complete,
            status === "active" && styles.active
          )}
        >
          <span
            className={cx(
              styles.navItemIcon,
              typeof item.icon === "number" && styles.navItemNumberIcon
            )}
          >
            {item.icon}
          </span>

          <span className={styles.navItemLabel}>{item.label}</span>
        </a>
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

const NavProgressItem = ({ item }: { item: NavItemWithStatus }) => (
  <li
    className={cx(
      styles.navProgressItem,
      item.status === "complete" && styles.complete,
      item.status === "active" && styles.active,
      item.status === "incomplete" && styles.incomplete
    )}
  >
    <Link href={item.link}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={styles.navProgressItemLink}>
        <span className={styles.navProgressItemIcon}>{item.icon}</span>

        <span className={styles.navProgressItemLabel}>
          <Caret className={styles.svgCaret} />
          {item.label}
        </span>
      </a>
    </Link>
  </li>
);
