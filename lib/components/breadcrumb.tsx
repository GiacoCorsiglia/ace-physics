import { Html } from "@/helpers/client";
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
          <Link href={item.link}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styles.link}>{item.label}</a>
          </Link>
        </li>
      ))}
  </ol>
);
