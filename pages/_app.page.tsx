import { AuthProvider } from "@/auth";
import { Footer } from "@/components/footer";
import footerStyles from "@/components/footer.module.scss";
import "@/design/global.scss";
import { JsxElement, resetUniqueIds } from "@/helpers/frontend";
import { init } from "@/sentry";
import type { AppProps } from "next/app";

init();

type Props = AppProps & { err: any };

export default function AceApp({ Component, pageProps, err }: Props) {
  if (typeof window === "undefined") {
    // If rendering on the server, reset this at the start of every render. This
    // way we can avoid mismatching unique ids between the server and client.
    // SEE: https://github.com/downshift-js/downshift#faq
    resetUniqueIds();
  }

  // if (Component.name === "TestPage") {
  //   return <Component />;
  // }

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
        {layout(Component, pageProps)}
      </div>

      <Footer />
    </AuthProvider>
  );
}
