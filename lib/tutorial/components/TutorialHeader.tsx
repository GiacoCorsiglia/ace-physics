/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { UserMenu } from "@/auth";
import { Header } from "@/design/layout";
import * as urls from "@/urls";
import { classes, useToggle } from "@/util";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { cx } from "linaria";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TutorialConfig } from "../config";
import styles from "./shared.module.scss";

export default function TutorialHeader({ config }: { config: TutorialConfig }) {
  const [toggled, setToggled, sidebarElRef] = useToggle();
  const router = useRouter();

  const currentPage = config.pages.find((page) =>
    router.pathname.endsWith(`/${page.link}`)
  );

  return (
    <Header>
      <div
        className={classes(styles.sidebarToggle, [styles.toggled, toggled])}
        onClick={() => setToggled((t) => !t)}
      >
        <svg viewBox="0 0 120 100" width="1em" height="1em">
          <rect className={styles.ht} y="14" x="10" width="100" height="12" />
          <rect className={styles.hm1} y="44" x="10" width="100" height="12" />
          <rect className={styles.hm2} y="44" x="10" width="100" height="12" />
          <rect className={styles.hb} y="74" x="10" width="100" height="12" />
        </svg>
      </div>

      <div className={styles.headerTitle}>
        <span className="prose">
          {currentPage
            ? currentPage.label
            : typeof config.label === "string"
            ? config.label
            : config.label.html}
        </span>
      </div>

      <Link href={urls.Tutorials.link}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className={classes(
            styles.otherTutorialsLink,
            styles.otherTutorialsLinkFixed
          )}
        >
          <ArrowLeftIcon />
          Other tutorials
        </a>
      </Link>

      <nav
        className={cx(styles.sidebar, toggled && styles.toggled)}
        ref={sidebarElRef}
      >
        <Link href={urls.Tutorials.link}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className={cx(
              styles.otherTutorialsLink,
              styles.otherTutorialsLinkInline
            )}
          >
            <ArrowLeftIcon />
            Other tutorials
          </a>
        </Link>

        <p className={styles.sidebarTutorialTitle}>
          <span className="prose">
            {typeof config.label === "string"
              ? config.label
              : config.label.html}
          </span>
        </p>

        <ol className={styles.tutorialParts}>
          <TutorialPartsItem
            active={router.pathname.endsWith(`/${config.link}`)}
            link={urls.join(`/${urls.Tutorials.path}`, config.link)}
            label="Introduction"
            skipCounter
          />

          {config.pretest && (
            <TutorialPartsItem
              active={router.pathname.endsWith(
                `/${config.link}/before-you-start`
              )}
              link={urls.join(
                `/${urls.Tutorials.path}`,
                config.link,
                "before-you-start"
              )}
              label="Before You Start"
              skipCounter
            />
          )}

          {config.pages.map((page) => (
            <TutorialPartsItem
              key={page.link}
              active={router.pathname.endsWith(`/${page.link}`)}
              link={urls.join(
                `/${urls.Tutorials.path}`,
                config.link,
                page.link
              )}
              label={page.label}
            />
          ))}

          <TutorialPartsItem
            active={router.pathname.endsWith(`/${config.link}/feedback`)}
            link={urls.join(`/${urls.Tutorials.path}`, config.link, "feedback")}
            label="Feedback"
            skipCounter
          />
        </ol>

        {config.info}
      </nav>

      <UserMenu />
    </Header>
  );
}

function TutorialPartsItem({
  active,
  link,
  label,
  skipCounter,
}: {
  active: boolean;
  link: string;
  label: React.ReactNode;
  skipCounter?: boolean;
}) {
  return (
    <li
      className={cx(active && styles.active, skipCounter && styles.skipCounter)}
    >
      {active ? (
        <span className={cx(styles.part, "prose")}>{label}</span>
      ) : (
        <Link href={link}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles.part}>
            <span className="prose">{label}</span>
          </a>
        </Link>
      )}
    </li>
  );
}
