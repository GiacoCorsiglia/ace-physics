import * as account from "@/account";
import "@/design/css/index.scss";
import { Footer } from "@/design/Footer";
import footerStyles from "@/design/Footer.module.scss";
import { JsxElement } from "@/helpers/frontend";
import type { AppProps } from "next/app";

export default function AceApp({ Component, pageProps }: AppProps) {
  const layout: (Page: typeof Component, pageProps: any) => JsxElement =
    (Component as any).layout ||
    ((Page: typeof Component, pageProps: any) => <Page {...pageProps} />);

  return (
    <>
      <div className={footerStyles.bodyContent}>
        <account.AccountProvider>
          {layout(Component, pageProps)}
        </account.AccountProvider>
      </div>

      <Footer />
    </>
  );
}
