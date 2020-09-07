import React, { useLayoutEffect, useRef, useState } from "react";

type Corner =
  | "bottomLeft"
  | "bottomRight"
  | "topLeft"
  | "topRight"
  | "topCenter"
  | "bottomCenter"
  | "leftCenter"
  | "rightCenter";

type PropTypes = {
  t: string;
  display?: boolean;
  prespace?: boolean;
  postspace?: boolean;
} & (
  | { inSvg?: false; x?: never; y?: never; relativeTo?: never; offset?: never }
  | { inSvg: true; x: number; y: number; relativeTo?: Corner; offset?: number }
);

export function idealRelativeTo(x: number, y: number): Corner {
  if (x > 0 && y > 0) {
    // First quadrant
    return "bottomLeft";
  } else if (x > 0 && y < 0) {
    // Second quadrant
    return "topLeft";
  } else if (x < 0 && y < 0) {
    // Third quadrant
    return "topRight";
  } else if (x < 0 && y > 0) {
    // Fourth quadrant
    return "bottomRight";
  } else if (x > 0 && y === 0) {
    // Positive x-axis
    return "bottomLeft";
  } else if (x < 0 && y === 0) {
    // Negative x-axis
    return "bottomRight";
  } else if (x === 0 && y > 0) {
    // Positive y-axis
    return "bottomLeft";
  } else if (x === 0 && y < 0) {
    // Negative y-axis
    return "bottomRight";
  } else {
    // Origin
    return "bottomRight";
  }
}

function transform(
  relativeTo: Corner,
  offset: number,
  width: number,
  height: number
): string {
  switch (relativeTo) {
    case "topLeft":
      return `translate(${offset}, ${offset})`;
    case "topRight":
      return `translate(${-(width + offset)}, ${offset})`;
    case "bottomLeft":
      return `translate(${offset}, ${-(height + offset)})`;
    case "bottomRight":
      return `translate(${-(width + offset)}, ${-(height + offset)})`;
    case "topCenter":
      return `translate(${-(width / 2)}, ${offset})`;
    case "bottomCenter":
      return `translate(${-(width / 2)}, ${-(height + offset)})`;
    case "leftCenter":
      return `translate(${offset}, ${-(height / 2)})`;
    case "rightCenter":
      return `translate(${-(width + offset)}, ${-(height / 2)})`;
  }
}

const space = document.createTextNode(" ");

export default function M({
  t: tex,
  display = false,
  inSvg = false,
  x = 0,
  y = 0,
  relativeTo = "topLeft",
  offset = 5,
  prespace = true,
  postspace = false, // In case it's followed by punctuation.
}: PropTypes) {
  const foreignObjectRef = useRef<SVGForeignObjectElement>(null);
  const mathRef = useRef<any>(null);

  const [isReady, setIsReady] = useState(ACE__MathJax.isReady);

  useLayoutEffect(() => {
    if (!isReady) {
      ACE__MathJax.promise.then(() => setIsReady(true));
      return;
    }

    // This element can't be null at this point.
    const mathEl = mathRef.current as HTMLElement;

    // Kill children.
    mathEl.innerHTML = "";

    MathJax.texReset();
    const options = MathJax.getMetricsFor(mathEl);
    options.display = display;
    MathJax.tex2svgPromise(tex, options)
      .then(function (node: HTMLElement) {
        if (!display && !inSvg && prespace) {
          mathEl.appendChild(space.cloneNode(false));
        }
        mathEl.appendChild(node);
        if (!display && !inSvg && postspace) {
          mathEl.appendChild(space.cloneNode(false));
        }
        MathJax.startup.document.clear();
        MathJax.startup.document.updateDocument();

        if (inSvg) {
          // This won't be null at this point either.
          const foreignObject = foreignObjectRef.current as SVGForeignObjectElement;

          const offsetWidth = node.offsetWidth;
          const offsetHeight = node.offsetHeight;
          foreignObject.setAttribute("width", offsetWidth + "");
          foreignObject.setAttribute("height", offsetHeight + "");
          foreignObject.setAttribute(
            "transform",
            transform(relativeTo, offset, offsetWidth, offsetHeight)
          );

          // HACK: Yes, this exactly duplicates the code above.  Why? Because
          // it's the only way I could get `node.offsetWidth` to be nonzero in
          // Firefox.  This also appears to fix a weird alignment bug in Chrome.
          window.requestAnimationFrame(() => {
            const offsetWidth = node.offsetWidth;
            const offsetHeight = node.offsetHeight;
            foreignObject.setAttribute("width", offsetWidth + "");
            foreignObject.setAttribute("height", offsetHeight + "");
            foreignObject.setAttribute(
              "transform",
              transform(relativeTo, offset, offsetWidth, offsetHeight)
            );
          });
        }
      })
      .catch(function (err: any) {
        console.error(err);
      });
  }, [tex, isReady, relativeTo, offset, display, inSvg, prespace, postspace]);

  if (inSvg) {
    return (
      <foreignObject x={x} y={y} ref={foreignObjectRef}>
        <div {...{ xmlns: "http://www.w3.org/1999/xhtml" }} ref={mathRef}></div>
      </foreignObject>
    );
  }
  return <span ref={mathRef}></span>;
}
