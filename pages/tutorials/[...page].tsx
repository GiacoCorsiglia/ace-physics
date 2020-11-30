import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { routes } from "tutorials";
import { Tutorial, TutorialFinished, TutorialIntro } from "tutorials/shared";

const pages = Object.fromEntries(
  routes.flatMap((route) => {
    const intro = [
      route.url.path,
      { route, element: <TutorialIntro route={route} /> },
    ] as const;

    const parts = route.parts.map(
      (part) =>
        [
          `${route.url.path}/${part.path}`,
          { route, element: part.element },
        ] as const
    );

    const finished = [
      `${route.url.path}/finished`,
      { route, element: <TutorialFinished /> },
    ] as const;

    return [intro, ...parts, finished];
  })
);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(pages).map((path) => ({
      params: { page: path.split("/") },
    })),
    fallback: false,
  };
};

// This function is required for getStaticPaths to be respected.
export const getStaticProps: GetStaticProps = async (context) => {
  const page = context.params?.page;

  return { props: { page } };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
export default function TutorialPage({ page }: Props) {
  if (!page || typeof page === "string") {
    throw new Error("WTF");
  }

  const path = page.join("/");

  const { route, element } = pages[path];

  return <Tutorial route={route} element={element} />;
}
