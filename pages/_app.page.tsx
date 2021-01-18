import { AuthProvider } from "@/auth";
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
    <AuthProvider>
      <div className={footerStyles.bodyContent}>
        {layout(Component, pageProps)}
      </div>

      <Footer />
    </AuthProvider>
  );
}
