import { UserMenu } from "@/auth";
import { Header, HeaderTitle, Nav, NavItem } from "@/components";
import * as urls from "@/urls";
import {
  ArrowLeftIcon,
  ChecklistIcon,
  StarIcon,
  ThumbsupIcon,
} from "@primer/octicons-react";
import { useRouter } from "next/router";
import { TutorialConfig } from "../config";

export default function TutorialHeader({ config }: { config: TutorialConfig }) {
  const router = useRouter();

  const isIntroduction = router.pathname.endsWith(`/${config.link}`);
  const isPretest = router.pathname.endsWith(
    `/${config.link}/before-you-start`
  );
  const isFeedback = router.pathname.endsWith(`/${config.link}/feedback`);
  const currentPage = config.pages.findIndex((page) =>
    router.pathname.endsWith(`/${page.link}`)
  );

  const pageStatus = (
    page:
      | "introduction"
      | "pretest"
      | "feedback"
      | TutorialConfig["pages"][number]
  ): "complete" | "active" | "incomplete" => {
    if (page === "introduction") {
      return isIntroduction ? "active" : "complete";
    }
    if (page === "pretest") {
      return isPretest ? "active" : isIntroduction ? "incomplete" : "complete";
    }
    if (page === "feedback") {
      return isFeedback ? "active" : "incomplete";
    }

    // Now for regular pages.
    if (isFeedback) {
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

  return (
    <Header>
      <UserMenu />

      <HeaderTitle>
        {typeof config.label === "string" ? config.label : config.label.html}
      </HeaderTitle>

      <Nav>
        <NavItem
          style="small"
          icon={<ArrowLeftIcon />}
          link={urls.Tutorials.link}
        >
          Other Tutorials
        </NavItem>

        <NavItem
          status={pageStatus("introduction")}
          link={urls.join(`/${urls.Tutorials.path}`, config.link)}
          icon={<StarIcon />}
        >
          {typeof config.label === "string" ? config.label : config.label.html}
        </NavItem>

        {config.pretest && (
          <NavItem
            status={pageStatus("pretest")}
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
            status={pageStatus(page)}
            icon={i + 1}
            link={urls.join(`/${urls.Tutorials.path}`, config.link, page.link)}
          >
            {page.label}
          </NavItem>
        ))}

        <NavItem
          status={pageStatus("feedback")}
          icon={<ThumbsupIcon />}
          link={urls.join(`/${urls.Tutorials.path}`, config.link, "feedback")}
        >
          Feedback
        </NavItem>
      </Nav>
    </Header>
  );
}
