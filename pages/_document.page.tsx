import Document, { Head, Html, Main, NextScript } from "next/document";

export default class AceDocument extends Document {
  render() {
    const favicon =
      process.env.NEXT_PUBLIC_ACE_ENV === "development"
        ? "/favicon-dev.ico"
        : process.env.NEXT_PUBLIC_ACE_ENV === "staging"
        ? "/favicon-beta.ico"
        : "/favicon.ico";

    return (
      <Html lang="en">
        <Head>
          {/* Favicon. */}
          <link rel="shortcut icon" type="image/x-icon" href={favicon} />
        </Head>

        <body>
          <Main />

          {/* Portal element for <CheatSheet> component. */}
          <aside id="ace-cheat-sheet" />

          {/* Portal element for <Modal> component. */}
          <div id="ace-modal" />

          {/* Portal element for <Tooltip> component. */}
          <div id="ace-tooltip" />

          <NextScript />
        </body>
      </Html>
    );
  }
}
