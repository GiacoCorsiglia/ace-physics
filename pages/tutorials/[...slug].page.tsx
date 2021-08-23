import { UserMenu } from "@/auth";
import { Button, Content, Header, Page, Prose } from "@/components";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleFillIcon,
} from "@primer/octicons-react";
import * as fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { join } from "path";
import { promisify } from "util";
import styles from "./[...slug].page.module.scss";

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
      async (file) => [file, await fsStat(join(tutorialsDir, file))] as const
    )
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
    <Page title="Done">
      <Header>
        <UserMenu />
      </Header>

      <Content as="main" className={styles.content}>
        <Prose>
          <p>
            <CheckCircleFillIcon
              size="medium"
              verticalAlign="middle"
              className="text-green"
            />
          </p>

          <p>Nice job, and thanks for the feedback!</p>

          <p>
            Come back to see or update your work anytime (even if you close this
            window).
          </p>
        </Prose>

        <div className={styles.buttons}>
          <Button
            onClick={() => router.back()}
            iconLeft={<ArrowLeftIcon />}
            color="yellow"
          >
            Go back
          </Button>

          <Button color="green" link="/tutorials">
            See other tutorials <ArrowRightIcon />
          </Button>
        </div>
      </Content>
    </Page>
  );
}
