import { Html } from "@/helpers/client";
import { ArrowLeftIcon } from "@primer/octicons-react";
import Link, { LinkProps } from "next/link";
import styles from "./breadcrumb.module.scss";

interface Item {
  label: Html;
  link: LinkProps["href"];
}

export const Breadcrumb = ({
  items,
}: {
  items: (Item | void | false | null)[];
}) => (
  <ol className={styles.list}>
    {items
      .filter((item): item is Item => !!item)
      .map((item) => (
        <li
          key={typeof item.link === "string" ? item.link : item.link?.pathname}
        >
          <Link href={item.link} className={styles.link}>
            {item.label}
          </Link>
        </li>
      ))}
  </ol>
);

Breadcrumb.home = {
  link: "/",
  label: (
    <>
      <ArrowLeftIcon /> Home
    </>
  ),
};
