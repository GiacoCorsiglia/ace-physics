import { Footer } from "components/shared/Footer";
import footerStyles from "components/shared/Footer.module.scss";
import type { AppProps /*, AppContext */ } from "next/app";
import * as account from "services/account";
import "styles/index.scss";

export default function AceApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={footerStyles.bodyContent}>
        <account.AccountProvider>
          <Component {...pageProps} />
        </account.AccountProvider>
      </div>

      <Footer />
    </>
  );
}
