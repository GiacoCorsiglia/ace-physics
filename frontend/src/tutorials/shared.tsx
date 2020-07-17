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

type LabelTitle =
  | {
      label: string;
      /** The page title in the browser */
      title?: string;
    }
  | {
      label: React.ReactElement;
      /** The page title in the browser */
      title: string;
    };

type Part = {
  path: string;
  element: React.ReactElement;
} & LabelTitle;

type Parts = Part[];

function getTitle({ label, title }: LabelTitle): string {
  return title !== undefined ? title : (label as string);
}

export function tutorialRoute({
  url,
  schema,
  intro,
  parts,
  ...labelTitle
}: {
  url: urls.URL;
  schema: ProviderSchema;
  intro: React.ReactNode;
  parts: Parts;
} & LabelTitle) {
  return (
    <Route
      path={url.path}
      element={
        <Tutorial url={url} schema={schema} parts={parts} {...labelTitle} />
      }
    >
      <Route
        path="/"
        element={
          <Content>
            <h1 className="prose">{labelTitle.label}</h1>

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
  schema,
  parts,
  ...labelTitle
}: {
  url: urls.URL;
  schema: ProviderSchema;
  parts: Parts;
} & LabelTitle) {
  const location = useLocation();
  const page = location.pathname.replace(/\/$/, "").split("/").pop();

  const currentPart = parts.find((part) => part.path === page);
  const currentTitle = getTitle(currentPart || labelTitle);

  return (
    <Provider schema={schema}>
      <Page title={currentTitle}>
        <Header>
          <nav className={styles.tutorialNav}>
            <p className={styles.tutorialLabel}>
              <Link to={url.link}>
                <span className="prose">{labelTitle.label}</span>
              </Link>
            </p>

            <ol className={styles.tutorialParts}>
              {parts.map((part) => (
                <li
                  key={part.path}
                  className={classes([styles.active, part.path === page])}
                >
                  <Link to={urls.part(url, part.path)}>
                    <span className="prose">{part.label}</span>
                  </Link>
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
