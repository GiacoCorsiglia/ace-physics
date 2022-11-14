import { Html, htmlTitle } from "@/helpers/client";
import Head from "next/head";

export const Page = ({
  title,
  children,
  metaDescription,
}: {
  title?: string;
  metaDescription?: string;
  children?: Html;
}) => {
  return (
    <>
      {title && (
        <Head>
          <title>{htmlTitle(title)}</title>

          {metaDescription && (
            <meta name="description" content={metaDescription} />
          )}
        </Head>
      )}

      {children}
    </>
  );
};
