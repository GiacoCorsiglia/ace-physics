import { result, useIsomorphicLayoutEffect } from "@/helpers/frontend";
import type { KatexOptions, ParseError } from "katex";
import "katex/dist/katex.css";
import { useState } from "react";
import { macros } from "./macros";

// https://katex.org/docs/options.html
const options: KatexOptions = {
  macros,
  throwOnError: process.env.NODE_ENV !== "production",
  strict(errorCode: string) {
    return errorCode === "htmlExtension" ? "ignore" : "warn";
  },
  trust({ command }) {
    return command === "\\htmlClass";
  },
};

export interface MPropTypes {
  t: string;
  display?: boolean;
  prespace?: boolean;
  postspace?: boolean;
  color?: string;
}

export const M = ({
  t: tex,
  display = false,
  prespace = true,
  postspace = false,
  color,
}: MPropTypes) => {
  prespace = prespace && !display;
  postspace = postspace && !display;

  const [html, setHtml] = useState({ __html: "" });

  // With simple `useEffect()`, rendering of the math was delayed too much,
  // especially when `tex` was altered during the lifetime of the component.
  useIsomorphicLayoutEffect(() => {
    // This dynamic import defers the loading of KaTeX until we actually need to
    // render math, thanks to the automatic code splitting from Next. The KaTeX
    // stylesheet is always loaded with the rest of our CSS, however; we import
    // it at the top of this file.
    import("katex").then((KaTeX) => {
      const html = result<ParseError>(() =>
        KaTeX.renderToString(tex, {
          ...options,
          displayMode: display,
        })
      );

      if (html.failed && process.env.NODE_ENV !== "production") {
        // Make these loud on local; for the most part these should just be
        // LaTeX compilation errors (from KaTeX), which we can fix.
        const message = html.error.message.replace(": ", ":\n  ");
        throw new Error(`\n${message}\nProblematic LaTeX code:\n  ${tex}`);
      } else if (html.failed) {
        // We shouldn't get here due to the throwOnError setting above, although
        // KaTeX could always just blow it.  In that case, presumably users will
        // get more out of the raw LaTeX code than a generic "Math Rendering
        // Failed" error message, even though it may break the layout.
        const escapedTex = tex
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        setHtml({
          __html: `${prespace ? " " : ""}${escapedTex}${postspace ? " " : ""}`,
        });
      } else {
        // Hey, it worked!
        setHtml({
          __html: `${prespace ? " " : ""}${html.value}${postspace ? " " : ""}`,
        });
      }
    });
  }, [tex, prespace, postspace, display]);

  return (
    <span
      className={display ? "display-math" : undefined}
      style={color ? { color } : undefined}
      dangerouslySetInnerHTML={html}
    />
  );
};
