import { UserMenu } from "@/auth/client";
import {
  Button,
  Header,
  Horizontal,
  MainContentBox,
  Page,
  Prose,
  Vertical,
} from "@/components";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@primer/octicons-react";
import * as fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { join } from "path";
import { promisify } from "util";

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

// It appears that "." resolves to the project root.
const tutorialsDir = "./pages/tutorials";

export const getStaticPaths: GetStaticPaths = async () => {
  const fsStat = promisify(fs.stat);
  const files = await promisify(fs.readdir)(tutorialsDir);
  const fileStats = await Promise.all(
    files.map(
      async (file) => [file, await fsStat(join(tutorialsDir, file))] as const,
    ),
  );
  const directories = fileStats
    .filter(([_, stat]) => stat.isDirectory())
    .map(([dir]) => dir);
  const paths = directories.map((dir) => ({
    params: { slug: [dir, "finished"] },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default function FinishedPage() {
  const router = useRouter();

  return (
    <Page title="Done For Today">
      <Header title="Done For Today" popovers={<UserMenu />} />

      <MainContentBox>
        <Prose justify="center">
          <p>
            <CheckCircleIcon
              size="large"
              verticalAlign="middle"
              className="text-green"
            />
          </p>

          <p>Nice job, and thanks for the feedback!</p>

          <p>Come back to see or update your work anytime.</p>

          <p>You can safely close this window.</p>
        </Prose>

        <Vertical.Space before={200}>
          <Horizontal justify="center">
            <Button
              onClick={() => router.back()}
              iconLeft={<ArrowLeftIcon />}
              color="yellow"
            >
              Go back
            </Button>

            <Button
              color="green"
              link="/tutorials"
              iconRight={<ArrowRightIcon />}
            >
              See other tutorials
            </Button>
          </Horizontal>
        </Vertical.Space>
      </MainContentBox>
    </Page>
  );
}
