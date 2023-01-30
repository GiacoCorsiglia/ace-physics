import { Footer } from "@/components/footer";
import footerStyles from "@/components/footer.module.scss";
import "@/design/global.scss";
import { Html, JsxElement } from "@/helpers/client";
import { polyfill } from "@/polyfill";
import { Bitter } from "@next/font/google";
import type { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { useMemo, useRef } from "react";
import { SWRConfig } from "swr";

polyfill();

const bitter = Bitter({
  subsets: ["latin"],
});

export default function AceApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session | null;
}>) {
  // Avoid rerenders when the providers do.  The components that actually use
  // the contexts from these providers will rerender appropriately regardless.
  const pageContent = useMemo(() => {
    const layout: (Page: typeof Component, pageProps: any) => JsxElement =
      (Component as any).layout ||
      ((Page: typeof Component, pageProps: any) => <Page {...pageProps} />);

    return (
      <>
        <style jsx global>{`
          html {
            --font-bitter: ${bitter.style.fontFamily};
          }
        `}</style>

        <div className={footerStyles.bodyContent}>
          {layout(Component, pageProps)}
        </div>

        <Footer />
      </>
    );
  }, [Component, pageProps]);

  return (
    <SessionProvider session={session}>
      <PerUserSwrCache>{pageContent}</PerUserSwrCache>
    </SessionProvider>
  );
}

const PerUserSwrCache = ({ children }: { children?: Html }) => {
  // This component should rerender whenever the session changes, thus providing
  // a new cache object if necessary.
  const latestEmail = useSession().data?.user?.email;

  const cacheEmail = useRef<string | null | undefined>();
  const cache = useRef<Map<unknown, unknown>>();
  const cacheProvider = useRef<() => Map<unknown, unknown>>();

  if (!cache.current || cacheEmail.current !== latestEmail) {
    cacheEmail.current = latestEmail;
    cache.current = new Map();
    // I don't know if SWR requires a stable reference for the cache provider
    // function, so let's provide one to be safe.
    cacheProvider.current = () => cache.current!;
  }

  return (
    <SWRConfig value={{ provider: cacheProvider.current! }}>
      {children}
    </SWRConfig>
  );
};
