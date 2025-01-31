import { Html } from "@/helpers/client";
import { ChevronRightIcon } from "@primer/octicons-react";
import Link, { LinkProps } from "next/link";
import styles from "./link-card.module.scss";
import { Prose, ProseProps } from "./typography";

export const LinkCard = ({
  link,
  label,
  children,
  proseSize = "small",
}: {
  link: LinkProps["href"];
  label: Html;
  children?: Html;
  proseSize?: ProseProps["size"];
}) => {
  return (
    <Link href={link} className={styles.linkCard}>
      <p className={styles.label}>{label}</p>
      <div className={styles.arrow}>
        <ChevronRightIcon />
      </div>
      <Prose size={proseSize} hyphenate={false}>
        {children}
      </Prose>
    </Link>
  );
};
