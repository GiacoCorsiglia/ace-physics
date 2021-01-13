import { Content } from "@/design/layout";
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

      <Content as="section">
        <h1 className="prose">
          {typeof config.label === "string" ? config.label : config.label.html}
        </h1>
      </Content>

      <SectionTree config={config} />
    </>
  );
}
