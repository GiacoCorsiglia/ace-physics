import { AuthProvider } from "@/auth";
import { Footer } from "@/components/footer";
import footerStyles from "@/components/footer.module.scss";
import "@/design/global.scss";
import { JsxElement, resetUniqueIds } from "@/helpers/frontend";
import { polyfill } from "@/polyfill";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

polyfill();

export default function AceApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  if (typeof window === "undefined") {
    // If rendering on the server, reset this at the start of every render. This
    // way we can avoid mismatching unique ids between the server and client.
    // SEE: https://github.com/downshift-js/downshift#faq
    resetUniqueIds();
  }

  const layout: (Page: typeof Component, pageProps: any) => JsxElement =
    (Component as any).layout ||
    ((Page: typeof Component, pageProps: any) => <Page {...pageProps} />);

  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <div className={footerStyles.bodyContent}>
          {layout(Component, pageProps)}
        </div>

        <Footer />
      </AuthProvider>
    </SessionProvider>
  );
}
