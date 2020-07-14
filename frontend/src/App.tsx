import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { ComponentsTest } from "./components/ComponentsTest";
import { Content, Header, Page } from "./components/layout";
import { Footer } from "./components/shared/Footer";
import { UserMenu } from "./components/shared/UserMenu";
import * as Tutorials from "./tutorials";
import * as urls from "./urls";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppIndex />} />
        {Tutorials.route}
        <Route path="/test" element={<ComponentsTest />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>

      <Footer />
    </Router>
  );
}

function AppIndex() {
  return (
    <Page>
      <Header>
        <UserMenu />
      </Header>

      <Content as="main" className="prose">
        <h1>ACE Physics Online</h1>

        <p>
          <Link to={urls.Tutorials.link}>
            Check out the online tutorials &raquo;
          </Link>
        </p>
      </Content>
    </Page>
  );
}
