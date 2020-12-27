import { Footer } from "components/shared/Footer";
import footerStyles from "components/shared/Footer.module.scss";
import type { AppProps } from "next/app";
import * as account from "services/account";
import { JsxElement } from "services/helpers/frontend";
import "styles/index.scss";

export default function AceApp({ Component, pageProps }: AppProps) {
  const layout: (page: JsxElement) => JsxElement =
    (Component as any).layout || ((page: JsxElement) => page);

  return (
    <>
      <div className={footerStyles.bodyContent}>
        <account.AccountProvider>
          {layout(<Component {...pageProps} />)}
        </account.AccountProvider>
      </div>

      <Footer />
    </>
  );
}
