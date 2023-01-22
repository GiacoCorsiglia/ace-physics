import {
  cx,
  useActualSiblingCheck,
  useIsomorphicLayoutEffect,
} from "@/helpers/client";
import { result } from "@/result";
import type { KatexOptions, ParseError } from "katex";
import "katex/dist/katex.css";
import { useState } from "react";
import styles from "./m.module.scss";
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
  renderErrorOnDev?: boolean;
}

export const M = ({
  t: tex,
  display = false,
  prespace = true,
  postspace = false,
  color,
  renderErrorOnDev = false,
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
        KaTeX.default.renderToString(tex, {
          ...options,
          displayMode: display,
        })
      );

      if (html.failed && process.env.NODE_ENV !== "production") {
        // Make these loud on local; for the most part these should just be
        // LaTeX compilation errors (from KaTeX), which we can fix.
        const message = html.error.message.replace(": ", ":\n  ");
        if (renderErrorOnDev) {
          setHtml({
            __html: `<span class="text-red">${escapeHtml(message)}</span>`,
          });
          return;
        }
        throw new Error(`\n${message}\nProblematic LaTeX code:\n  ${tex}`);
      } else if (html.failed) {
        // We shouldn't get here due to the throwOnError setting above, although
        // KaTeX could always just blow it.  In that case, presumably users will
        // get more out of the raw LaTeX code than a generic "Math Rendering
        // Failed" error message, even though it may break the layout.
        const escapedTex = escapeHtml(tex);
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

  const [elRef, classes] = useActualSiblingCheck(
    () => !!display && !!html.__html,
    [display, html.__html]
  );

  return (
    <span
      ref={elRef}
      className={display ? cx(styles.displayMath, classes) : undefined}
      style={color ? { color } : undefined}
      dangerouslySetInnerHTML={html}
    />
  );
};

export const QC = ({
  t,
  renderErrorOnDev,
}: {
  t: string;
  renderErrorOnDev?: boolean;
}) => {
  const tex = t.replaceAll("&", "");

  return (
    <M display t={`\\qcircuit{${tex}}`} renderErrorOnDev={renderErrorOnDev} />
  );
};

const escapeHtml = (html: string) =>
  html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
