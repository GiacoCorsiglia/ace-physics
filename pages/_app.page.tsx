import { AuthProvider } from "@/auth";
import { Footer } from "@/components/footer";
import footerStyles from "@/components/footer.module.scss";
import { Header, HeaderButton, Nav, NavItem } from "@/components/header";
import "@/design/global.scss";
import { JsxElement, resetUniqueIds } from "@/helpers/frontend";
import { init } from "@/sentry";
import {
  ArrowLeftIcon,
  ChecklistIcon,
  PersonIcon,
  StarIcon,
  ThumbsupIcon,
} from "@primer/octicons-react";
import type { AppProps } from "next/app";
import React from "react";

init();

type Props = AppProps & { err: any };

export default function AceApp({ Component, pageProps, err }: Props) {
  if (typeof window === "undefined") {
    // If rendering on the server, reset this at the start of every render. This
    // way we can avoid mismatching unique ids between the server and client.
    // SEE: https://github.com/downshift-js/downshift#faq
    resetUniqueIds();
  }

  if (err) {
    // https://github.com/vercel/next.js/blob/canary/examples/with-sentry/pages/_app.js
    // eslint-disable-next-line no-param-reassign
    pageProps.err = err;
  }

  const layout: (Page: typeof Component, pageProps: any) => JsxElement =
    (Component as any).layout ||
    ((Page: typeof Component, pageProps: any) => <Page {...pageProps} />);

  return (
    <AuthProvider>
      <div className={footerStyles.bodyContent}>
        <Header>
          <HeaderButton side="left">
            <ArrowLeftIcon />
          </HeaderButton>
          <HeaderButton side="right">
            <PersonIcon aria-label="My Account Menu" />
          </HeaderButton>
          <Nav>
            <NavItem status="complete">
              <StarIcon />
            </NavItem>
            <NavItem status="complete">
              <ChecklistIcon />
            </NavItem>
            <NavItem status="complete">1</NavItem>
            <NavItem status="complete">2</NavItem>
            <NavItem status="active">3</NavItem>
            <NavItem status="incomplete">4</NavItem>
            <NavItem status="incomplete">5</NavItem>
            <NavItem status="incomplete">
              <ThumbsupIcon />
            </NavItem>
          </Nav>
        </Header>

        {layout(Component, pageProps)}
      </div>

      <Footer />
    </AuthProvider>
  );
}
