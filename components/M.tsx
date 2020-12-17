import { result } from "common/util";
import type { KatexOptions, ParseError } from "katex";
import "katex/dist/katex.css";
import { useLayoutEffect, useMemo, useState } from "react";
import styles from "./M.module.scss";

// This removes the need for double backslashes in the macro definitions below.
const t = String.raw;

const macros = {
  "\\e": t`{\rm e}`,
  // Some exports from the physics package:
  "\\vu": t`\mathbf{\hat{#1}}`,
  "\\vb": t`\mathbf{#1}`,
  // The braces around {#3} here seem to improve the spacing.  An alternative is
  // to use the `\!` command for negative space as in \brasub.
  "\\prescript": t`{}_{#1}^{#2}{#3}`,
  "\\brasub": t`{}_{#1}\!`,
  // From the quantum mouse tutorial:
  "\\smalleye": t`\htmlClass{${styles.smalleye}}{\tiny \bull}`,
  "\\wideye": t`\htmlClass{${styles.wideye}}{\large \ast}`,
  "\\smiley": t`\htmlClass{${styles.smiley}}{\mathbf{\footnotesize \ddot \smile}}`,
  "\\frownie": t`\htmlClass{${styles.smiley}}{\mathbf{\footnotesize \ddot \frown}}`,
};

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

export interface PropTypes {
  t: string;
  display?: boolean;
  prespace?: boolean;
  postspace?: boolean;
  color?: string;
}

export default function M({
  t: tex,
  display = false,
  prespace = true,
  postspace = false,
  color,
}: PropTypes) {
  prespace = prespace && !display;
  postspace = postspace && !display;

  const [html, setHtml] = useState({ __html: "" });

  // With simple `useEffect()`, rendering of the math was delayed too much,
  // especially when `tex` was altered during the lifetime of the component.
  useLayoutEffect(() => {
    // This dynamic import defers the loading of KaTeX until we actually need to
    // render math, thanks to the automatic code splitting from CRA. The KaTeX
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
        setHtml({
          __html: `${prespace ? " " : ""}${tex
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}${postspace ? " " : ""}`,
        });
      } else {
        // Hey, it worked!
        setHtml({
          __html: `${prespace ? " " : ""}${html.value}${postspace ? " " : ""}`,
        });
      }
    });
  }, [tex, prespace, postspace, display]);

  const style = useMemo(
    () => ({
      display: display ? "block" : undefined, // "inline" is the default.
      color,
    }),
    [display, color]
  );

  return <span style={style} dangerouslySetInnerHTML={html} />;
}
