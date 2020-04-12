import React, { useState, useRef, useLayoutEffect } from "react";

type Corner =
  | "bottomLeft"
  | "bottomRight"
  | "topLeft"
  | "topRight"
  | "topCenter"
  | "bottomCenter"
  | "leftCenter"
  | "rightCenter";

type PropTypes = { t: string; display?: boolean } & (
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
      return `translate(${-(width / 2 + offset)}, ${offset})`;
    case "bottomCenter":
      return `translate(${-(width / 2 + offset)}, ${-(height + offset)})`;
    case "leftCenter":
      return `translate(${offset}, ${-(height / 2 + offset)})`;
    case "rightCenter":
      return `translate(${-(width + offset)}, ${-(height / 2 + offset)})`;
  }
}

export default function M({
  t: tex,
  display = false,
  inSvg = false,
  x = 0,
  y = 0,
  relativeTo = "topLeft",
  offset = 5,
}: PropTypes) {
  const foreignObjectRef = useRef<SVGForeignObjectElement>(null);
  const mathRef = useRef<HTMLSpanElement>(null);

  const [isReady, setIsReady] = useState(PT__MathJax.isReady);

  useLayoutEffect(() => {
    if (!isReady) {
      PT__MathJax.promise.then(() => setIsReady(true));
      return;
    }

    // This element can't be null at this point.
    const mathEl = mathRef.current as HTMLSpanElement;

    // Kill children.
    mathEl.innerHTML = "";

    MathJax.texReset();
    const options = MathJax.getMetricsFor(mathEl);
    options.display = display;
    MathJax.tex2svgPromise(tex, options)
      .then(function (node: any) {
        mathEl.appendChild(node);
        MathJax.startup.document.clear();
        MathJax.startup.document.updateDocument();

        if (inSvg) {
          // This won't be null at this point either.
          const foreignObject = foreignObjectRef.current as SVGForeignObjectElement;
          foreignObject.setAttribute("width", node.offsetWidth);
          foreignObject.setAttribute("height", node.offsetHeight);
          foreignObject.setAttribute(
            "transform",
            transform(relativeTo, offset, node.offsetWidth, node.offsetHeight)
          );
        }
      })
      .catch(function (err: any) {
        console.error(err);
      });
  }, [tex, isReady, relativeTo, offset, display, inSvg]);

  if (inSvg) {
    return (
      <foreignObject x={x} y={y} ref={foreignObjectRef}>
        <span
          {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
          ref={mathRef}
        ></span>
      </foreignObject>
    );
  }
  return <span ref={mathRef}></span>;
}
