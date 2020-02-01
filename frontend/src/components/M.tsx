import React, { useEffect, useState } from "react";

export default function M({
  m: tex,
  display = false
}: {
  m: string;
  display?: boolean;
}) {
  const [isReady, setIsReady] = useState(PT__MathJax.isReady);

  useEffect(() => {
    if (isReady) {
      MathJax.typeset();
    } else {
      PT__MathJax.promise.then(() => setIsReady(true));
    }
  }, [tex, isReady]);

  return (
    <>
      {!display ? " " : ""}
      {display ? "\\[" : "\\("}
      {tex}
      {display ? "\\]" : "\\)"}{" "}
    </>
  );
}
