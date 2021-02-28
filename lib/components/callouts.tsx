import { borderRadius, colors, fonts, shadows, spacing } from "@/design";
import { Html } from "@/helpers/frontend";
import { css, cx } from "linaria";
import { styled } from "linaria/react";
import React, { forwardRef } from "react";

export const Callout = forwardRef<
  HTMLDivElement,
  {
    color: "green" | "blue" | "yellow" | "red" | "neutral";
    title?: Html;
    as?: keyof JSX.IntrinsicElements;
  } & JSX.IntrinsicElements["aside"]
>(function Callout({ as = "aside", color, children, title, ...props }, ref) {
  const As = as as "aside";
  return (
    <As
      {...props}
      className={cx(
        props.className,
        "ace-callout",
        calloutCss,
        color === "green" && greenCss,
        color === "blue" && blueCss,
        color === "yellow" && yellowCss,
        color === "red" && redCss,
        color === "neutral" && neutralCss
      )}
      ref={ref}
    >
      {title && <CalloutTitle>{title}</CalloutTitle>}

      {children}
    </As>
  );
});

const CalloutTitle = styled.p`
  ${fonts.smallest};
  // Small caps would be nice but then we need to load more fonts.
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: ${spacing.$50};
`;

const calloutCss = css`
  padding: ${spacing.$100} ${spacing.$150};
  border-width: 1px;
  border-style: solid;
  border-radius: ${borderRadius};
  transition: background-color 150ms, border-color 150ms, color 150ms;
`;

const greenCss = css`
  background-color: ${colors.green.$100};
  border-color: ${colors.green.$200};
  color: ${colors.green.$900};
  /* box-shadow: ${shadows.light.green}; */

  ${CalloutTitle} {
    color: ${colors.green.$500};
  }
`;

const blueCss = css`
  background-color: ${colors.blue.$100};
  border-color: ${colors.blue.$200};
  color: ${colors.blue.$900};
  /* box-shadow: ${shadows.light.blue}; */

  ${CalloutTitle} {
    color: ${colors.blue.$500};
  }
`;

const yellowCss = css`
  background-color: ${colors.yellow.$100};
  border-color: ${colors.yellow.$200};
  color: ${colors.yellow.$900};
  /* box-shadow: ${shadows.light.yellow}; */

  ${CalloutTitle} {
    color: ${colors.yellow.$500};
  }
`;

const redCss = css`
  background-color: ${colors.red.$100};
  border-color: ${colors.red.$200};
  color: ${colors.red.$900};
  /* box-shadow: ${shadows.light.red}; */

  ${CalloutTitle} {
    color: ${colors.red.$500};
  }
`;

const neutralCss = css`
  border-color: ${colors.neutral.$300};
  color: ${colors.neutral.$700};

  ${CalloutTitle} {
    color: ${colors.neutral.$500};
  }
`;

// Semantic versions.
// export const Info = BlueCallout;
// export const Hint = YellowCallout;
// export const Agree = GreenCallout;
// export const Disagree = RedCallout;

// export const Reminder =
