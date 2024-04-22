import { UserMenu } from "@/auth/client";
import { Header } from "@/components";
import { Html } from "@/helpers/client";
import * as urls from "@/urls";
import {
  ArrowLeftIcon,
  ChecklistIcon,
  MortarBoardIcon,
  StarIcon,
  ThumbsupIcon,
} from "@primer/octicons-react";
import { useRouter } from "next/router";
import { TutorialConfig } from "../config";
import { Mode } from "./mode-manager";

export const TutorialHeader = ({
  config,
  mode,
}: {
  config: TutorialConfig;
  mode: Mode | undefined;
}) => {
  const router = useRouter();

  const isIntroduction = router.pathname.endsWith(`/${config.link}`);
  const isPretest = router.pathname.endsWith(
    `/${config.link}/before-you-start`,
  );
  const isPosttest = router.pathname.endsWith(`/${config.link}/review`);
  const isFeedback = router.pathname.endsWith(`/${config.link}/feedback`);
  const currentPage = config.pages.findIndex((page) =>
    router.pathname.endsWith(`/${page.link}`),
  );

  const tutorialTitle =
    typeof config.label === "string" ? config.label : config.label.html;

  const pageTitle = ((): Html => {
    if (isIntroduction) {
      return "";
    } else if (isFeedback) {
      return "Feedback";
    } else if (isPretest) {
      return "Before You Start";
    } else if (isPosttest) {
      return "Review";
    } else if (currentPage > -1) {
      return config.pages[currentPage].label;
    }
  })();

  const pageStatus = (
    page:
      | "introduction"
      | "pretest"
      | "posttest"
      | "feedback"
      | TutorialConfig["pages"][number],
  ): "complete" | "active" | "incomplete" => {
    if (page === "introduction") {
      return isIntroduction ? "active" : "complete";
    }
    if (page === "pretest") {
      return isPretest ? "active" : isIntroduction ? "incomplete" : "complete";
    }
    if (page === "posttest") {
      return isPosttest ? "active" : isFeedback ? "complete" : "incomplete";
    }
    if (page === "feedback") {
      return isFeedback ? "active" : "incomplete";
    }

    // Now for regular pages.
    if (isPosttest || isFeedback) {
      return "complete";
    }

    if (isIntroduction || isPretest) {
      return "incomplete";
    }

    const thisPage = config.pages.indexOf(page);

    if (currentPage === thisPage) {
      return "active";
    } else if (thisPage < currentPage) {
      return "complete";
    } else {
      return "incomplete";
    }
  };

  const url = (...us: string[]) =>
    urls.join(`/${urls.Tutorials.path}`, config.link, ...us);

  const otherTutorialsLink =
    mode?.type === "CourseMode" ? `/courses/${mode.courseId}` : "/tutorials";

  return (
    <Header
      title={
        <>
          {tutorialTitle}
          {pageTitle && ` › ${pageTitle}`}
        </>
      }
      popovers={<UserMenu />}
      nav={{
        title: tutorialTitle,

        secondary: [
          {
            icon: <ArrowLeftIcon />,
            link: otherTutorialsLink,
            label: "Other Tutorials",
          },
        ],

        items: [
          {
            status: pageStatus("introduction"),
            link: url(),
            icon: <StarIcon />,
            label: "Introduction",
          },
          config.pretest && {
            status: pageStatus("pretest"),
            link: url("before-you-start"),
            icon: <ChecklistIcon />,
            label: "Before You Start",
          },
          ...config.pages.map((page, i) => ({
            key: page.link,
            status: pageStatus(page),
            icon: i + 1,
            link: url(page.link),
            label: page.label,
          })),
          config.posttest && {
            status: pageStatus("posttest"),
            link: url("review"),
            // I don't know what the hell a "mortar board" is, but this is a
            // graduation cap icon.
            icon: <MortarBoardIcon />,
            label: "Review",
          },
          {
            status: pageStatus("feedback"),
            icon: <ThumbsupIcon />,
            link: url("feedback"),
            label: "Feedback",
          },
        ],
      }}
    />
  );
};
