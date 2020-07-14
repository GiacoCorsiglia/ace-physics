import React from "react";
import { Outlet, Route, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Continue } from "src/components";
import { Content, Header, Page } from "src/components/layout";
import { UserMenu } from "src/components/shared/UserMenu";
import { Provider, ProviderSchema } from "src/state";
import * as urls from "src/urls";
import { Children, classes } from "src/util";
import styles from "./shared.module.scss";

type Parts = {
  path: string;
  label: React.ReactNode;
  element: React.ReactElement;
}[];

export function tutorialRoute({
  url,
  schema,
  label,
  intro,
  parts,
}: {
  url: urls.URL;
  schema: ProviderSchema;
  label: React.ReactNode;
  intro: React.ReactNode;
  parts: Parts;
}) {
  return (
    <Route
      path={url.path}
      element={
        <Tutorial url={url} schema={schema} label={label} parts={parts} />
      }
    >
      <Route
        path="/"
        element={
          <Content>
            <h1 className="prose">{label}</h1>

            {intro}

            <Link to={parts[0].path}>
              <Continue label="Let's get started" link={parts[0].path} />
            </Link>
          </Content>
        }
      />

      {parts.map((part) => (
        <Route key={part.path} path={part.path} element={part.element} />
      ))}
    </Route>
  );
}

function Tutorial({
  url,
  label,
  schema,
  parts,
}: {
  url: urls.URL;
  label: React.ReactNode;
  schema: ProviderSchema;
  parts: Parts;
}) {
  const location = useLocation();
  const page = location.pathname.replace(/\/$/, "").split("/").pop();

  return (
    <Provider schema={schema}>
      <Page>
        <Header>
          <nav className={styles.tutorialNav}>
            <p className={styles.tutorialLabel}>
              <Link to={url.link}>{label}</Link>
            </p>

            <ol className={styles.tutorialParts}>
              {parts.map((part) => (
                <li
                  key={part.path}
                  className={classes([styles.active, part.path === page])}
                >
                  <Link to={urls.part(url, part.path)}>{part.label}</Link>
                </li>
              ))}
            </ol>
          </nav>

          <UserMenu />
        </Header>

        <main>
          <Outlet />
        </main>
      </Page>
    </Provider>
  );
}

export function Part({
  label,
  children,
}: {
  label: React.ReactNode;
} & Children) {
  return (
    <>
      <Content className="prose">
        <h1>{label}</h1>
      </Content>

      {children}
    </>
  );
}
