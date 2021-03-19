import { Html, htmlTitle } from "@/helpers/frontend";
import Head from "next/head";

export const Page = ({
  title,
  children,
}: {
  title?: string;
  children?: Html;
}) => {
  return (
    <>
      {title && (
        <Head>
          <title>{htmlTitle(title)}</title>
        </Head>
      )}

      {children}
    </>
  );
};
