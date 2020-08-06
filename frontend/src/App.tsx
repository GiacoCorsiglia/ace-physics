import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { ReactComponent as ArrowRight } from "src/svgs/arrow-right.svg";
import * as account from "./account";
import { Prose } from "./components";
import { ComponentsTest } from "./components/ComponentsTest";
import { Button } from "./components/inputs";
import { Content, Header, Page } from "./components/layout";
import { Footer } from "./components/shared/Footer";
import { UserMenu } from "./components/shared/UserMenu";
import * as Generate from "./Generate";
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

            {Generate.route}

            {Privacy.route}

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

      <Content as="main">
        <Prose>
          <h1>Welcome to ACEPhysics.net</h1>

          <p>Adaptive Curricular Exercises for Physics—online!</p>

          <p>
            Today, ACEPhysics.net is home to a handful of interactive
            activities—<em>tutorials</em>—for physics students studying quantum
            mechanics. Perhaps one day this website will hold an extensive suite
            of such activities for all physics learners.
          </p>
        </Prose>

        <Button className="margin-top" link={urls.Tutorials.link}>
          Take me to the online tutorials <ArrowRight />
        </Button>
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
