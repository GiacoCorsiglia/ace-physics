import { UserMenu } from "@/auth";
import { Header, Nav, NavItem } from "@/components";
import * as urls from "@/urls";
import {
  ArrowLeftIcon,
  ChecklistIcon,
  StarIcon,
  ThumbsupIcon,
} from "@primer/octicons-react";
import { useRouter } from "next/router";
import React from "react";
import { TutorialConfig } from "../config";

export default function TutorialHeader({ config }: { config: TutorialConfig }) {
  const router = useRouter();

  const currentPage = config.pages.find((page) =>
    router.pathname.endsWith(`/${page.link}`)
  );

  return (
    <Header>
      <UserMenu />

      {/* <div className={styles.headerTitle}>
        <span className="prose">
          {currentPage
            ? currentPage.label
            : typeof config.label === "string"
            ? config.label
            : config.label.html}
        </span>
      </div> */}

      <Nav
        title={
          typeof config.label === "string" ? config.label : config.label.html
        }
      >
        <NavItem
          style="small"
          icon={<ArrowLeftIcon />}
          link={urls.Tutorials.link}
        >
          Other Tutorials
        </NavItem>

        <NavItem
          status={
            router.pathname.endsWith(`/${config.link}`) ? "active" : "complete"
          }
          link={urls.join(`/${urls.Tutorials.path}`, config.link)}
          icon={<StarIcon />}
        >
          Introduction
        </NavItem>

        {config.pretest && (
          <NavItem
            status={
              router.pathname.endsWith(`/${config.link}/before-you-start`)
                ? "active"
                : "incomplete"
            }
            icon={<ChecklistIcon />}
            link={urls.join(
              `/${urls.Tutorials.path}`,
              config.link,
              "before-you-start"
            )}
          >
            Before You Start
          </NavItem>
        )}

        {config.pages.map((page, i) => (
          <NavItem
            key={page.link}
            status={
              router.pathname.endsWith(`/${page.link}`)
                ? "active"
                : "incomplete"
            }
            icon={i + 1}
            link={urls.join(`/${urls.Tutorials.path}`, config.link, page.link)}
          >
            {page.label}
          </NavItem>
        ))}

        <NavItem
          status={
            router.pathname.endsWith(`/${config.link}/feedback`)
              ? "active"
              : "incomplete"
          }
          icon={<ThumbsupIcon />}
          link={urls.join(`/${urls.Tutorials.path}`, config.link, "feedback")}
        >
          Feedback
        </NavItem>
      </Nav>
    </Header>
  );
}
