import { AuthProvider } from "@/auth";
import "@/design/css/index.scss";
import { Footer } from "@/design/Footer";
import footerStyles from "@/design/Footer.module.scss";
import { JsxElement } from "@/helpers/frontend";
import { init } from "@/sentry";
import type { AppProps } from "next/app";

init();

type Props = AppProps & { err: any };

export default function AceApp({ Component, pageProps, err }: Props) {
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
