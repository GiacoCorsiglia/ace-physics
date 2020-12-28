import * as account from "@/account";
import { JsxElement } from "@/helpers/frontend";
import { Footer } from "components/shared/Footer";
import footerStyles from "components/shared/Footer.module.scss";
import type { AppProps } from "next/app";
import "styles/index.scss";

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
