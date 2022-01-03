import { Html } from "@/helpers/frontend";
import { ChevronRightIcon } from "@primer/octicons-react";
import Link from "next/link";
import styles from "./link-card.module.scss";
import { Prose } from "./typography";

export const LinkCard = ({
  link,
  label,
  children,
}: {
  link: string;
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

        <Prose size="small">{children}</Prose>
      </a>
    </Link>
  );
};
