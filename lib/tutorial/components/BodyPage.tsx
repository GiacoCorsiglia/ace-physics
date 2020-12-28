import { htmlTitle } from "@/helpers";
import Head from "next/head";
import { PageConfig } from "../config";
import SectionTree from "./SectionTree";

export default function BodyPage({ config }: { config: PageConfig }) {
  return (
    <>
      <Head>
        <title>
          {htmlTitle(
            typeof config.label === "string" ? config.label : config.label.title
          )}
        </title>
      </Head>

      <section>
        <h1>
          {typeof config.label === "string" ? config.label : config.label.html}
        </h1>
      </section>

      <SectionTree config={config} />
    </>
  );
}
