import { Html } from "@/helpers/frontend";
import { ChevronRightIcon } from "@primer/octicons-react";
import Link, { LinkProps } from "next/link";
import styles from "./link-card.module.scss";
import { Prose } from "./typography";

export const LinkCard = ({
  link,
  label,
  children,
}: {
  link: LinkProps["href"];
  label: Html;
  children?: Html;
}) => {
  return (
    <Link href={link}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={styles.linkCard}>
        <p className={styles.label}>{label}</p>

        <div className={styles.arrow}>
          <ChevronRightIcon />
        </div>

        <Prose size="small" hyphenate={false}>
          {children}
        </Prose>
      </a>
    </Link>
  );
};
