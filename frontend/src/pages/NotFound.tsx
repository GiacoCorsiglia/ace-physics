import React from "react";
import { Link } from "react-router-dom";
import { Content, Header, Page } from "src/components/layout";
import { UserMenu } from "src/components/shared/UserMenu";

export default function NotFound() {
  return (
    <Page title="404 Not Found">
      <Header>
        <UserMenu />
      </Header>

      <Content as="main" className="prose">
        <h1>Not Found</h1>

        <p>Hey! The page you’re looking for doesn’t seem to exist.</p>

        <p>
          Maybe try the <Link to="/">homepage</Link>?
        </p>
      </Content>
    </Page>
  );
}
