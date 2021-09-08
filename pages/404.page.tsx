import { UserMenu } from "@/auth";
import { Header, MainContentBox, Page, Prose } from "@/components";
import Link from "next/link";

export default function Error404() {
  return (
    <Page title="404 Not Found">
      <Header title="404 Not Found" popovers={<UserMenu />} />

      <MainContentBox>
        <Prose>
          <h1>Not Found</h1>

          <p>Hey! The page you’re looking for doesn’t seem to exist.</p>

          <p>
            Maybe try the <Link href="/">homepage</Link>?
          </p>
        </Prose>
      </MainContentBox>
    </Page>
  );
}
