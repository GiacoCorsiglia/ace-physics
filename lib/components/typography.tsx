import { colors, fonts, spacing } from "@/design";
import { css, cx } from "linaria";
import { Children } from "react";

const blockLevelElements = new Set([
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "blockquote",
  "p",
]);

export const Prose = (props: JSX.IntrinsicElements["p"]) => {
  // If there is no block level element in the children, wrap them in <p>.
  // Otherwise, just wrap everything in a <div>.  (The prop types for "p" and
  // "div" are identical.)
  let Container: "p" | "div" = "p";
  Children.forEach(props.children, (child) => {
    if (child && blockLevelElements.has((child as any).type)) {
      Container = "div";
    }
  });
  return <Container {...props} className={cx(proseCss, props.className)} />;
};

const proseCss = css`
  ${fonts.body}; // Set default font style.

  // text-align: justify;
  hyphens: auto;

  h1 {
    ${fonts.heading1};
  }

  h2 {
    ${fonts.heading2};
  }

  h3 {
    ${fonts.heading3};
  }

  h4 {
    ${fonts.heading4};
  }

  h5 {
    ${fonts.heading5};
  }

  h6 {
    ${fonts.heading6};
  }

  ol,
  ul,
  blockquote {
    margin-left: ${spacing.$200};
  }

  ul {
    list-style-type: disc;

    ul {
      list-style-type: circle;
    }
  }

  ol {
    list-style-type: decimal;
  }

  blockquote {
    font-style: italic;
  }

  i,
  em {
    font-style: italic;
  }

  b,
  strong {
    font-weight: ${fonts.bold};
  }

  a,
  .link {
    cursor: pointer;
    text-decoration: underline;
    color: ${colors.blue.$700};
    transition: color 75ms ease-in-out;

    &:hover {
      color: ${colors.blue.$600};
    }
  }

  // Reset button styles for button links.
  button.link {
    display: inline;
    margin: 0;
    padding: 0;
    font-size: inherit;
    background: none;
    border: none;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }

  // Spacing.

  // Default.
  > * + * {
    margin-top: ${spacing.$100};
  }

  * + h1,
  * + h2,
  * + h3,
  * + h4,
  * + h5,
  * + h6 {
    margin-top: ${spacing.$200};
  }

  li + li {
    margin-top: ${spacing.$50};
  }

  // Display Math.
  // If it's at the top level, give it a margin unless its first or last. Also
  // handle the case when its nested (e.g. in a paragraph).
  > :global(.display-math):not(:first-child),
  > :first-child :global(.display-math):not(:first-child),
  > :not(:first-child) :global(.display-math) {
    margin-top: ${spacing.$150};
  }

  > :global(.display-math):not(:last-child),
  > :last-child :global(.display-math):not(:last-child),
  > :not(:last-child) :global(.display-math) {
    margin-bottom: ${spacing.$150};
  }
`;
