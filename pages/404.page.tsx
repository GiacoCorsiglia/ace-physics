import { UserMenu } from "@/account/UserMenu";
import { Content, Header, Page } from "@/design/layout";
import Link from "next/link";

export default function Error404() {
  return (
    <Page title="404 Not Found">
      <Header>
        <UserMenu />
      </Header>

      <Content as="main" className="prose">
        <h1>Not Found</h1>

        <p>Hey! The page you’re looking for doesn’t seem to exist.</p>

        <p>
          Maybe try the <Link href="/">homepage</Link>?
        </p>
      </Content>
    </Page>
  );
}
