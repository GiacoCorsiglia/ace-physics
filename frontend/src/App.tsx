import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import * as account from "./account";
import { ComponentsTest } from "./components/ComponentsTest";
import { Content, Header, Page } from "./components/layout";
import { Footer } from "./components/shared/Footer";
import { UserMenu } from "./components/shared/UserMenu";
import * as globalParams from "./globalParams";
import * as Privacy from "./Privacy";
import * as Tutorials from "./tutorials";
import * as urls from "./urls";

export default function App() {
  return (
    <Router>
      <globalParams.GlobalParamsProvider>
        <account.AccountProvider>
          <Routes>
            <Route path="/" element={<Index />} />

            {Tutorials.route}

            {account.createAccountRoute}
            {account.loginRoute}

          <Route path="/test" element={<ComponentsTest />} />
          <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="test" element={<ComponentsTest />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </account.AccountProvider>

        <Footer />
      </globalParams.GlobalParamsProvider>
    </Router>
  );
}

function Index() {
  return (
    <Page title="">
      <Header>
        <UserMenu />
      </Header>

      <Content as="main" className="prose">
        <h1>Welcome to ACEPhysics.net</h1>

        <p>
          <Link to={urls.Tutorials.link}>
            Check out the online tutorials &raquo;
          </Link>
        </p>
      </Content>
    </Page>
  );
}

function NotFound() {
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
