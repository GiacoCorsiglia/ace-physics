import Document, { Head, Html, Main, NextScript } from "next/document";

export default class AceDocument extends Document {
  render() {
    const favicon =
      process.env.NEXT_PUBLIC_ACE_ENV === "staging"
        ? "/favicon-beta.ico"
        : "/favicon.ico";

    return (
      <Html>
        <Head>
          {/* https://css-tricks.com/how-to-load-fonts-in-a-way-that-fights-fout-and-makes-lighthouse-happy/ */}
          <link
            rel="preconnect"
            // This is the origin for the actual font files.
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            media="print"
            id="ace-font"
          />
          {/* Setting onload on the <link> doesn't work with React/Next.js */}
          <script
            dangerouslySetInnerHTML={{
              __html: `document.getElementById("ace-font").onload=function(){this.media="all"}`,
            }}
          />

          {/* Favicon. */}
          <link rel="shortcut icon" type="image/x-icon" href={favicon} />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
