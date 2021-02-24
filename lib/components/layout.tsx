import { borderRadius, colors, shadows, spacing } from "@/design";
import { styled } from "linaria/react";
import { Callout } from "./callouts";

const textWidth = spacing.$4000;
// It turns out calc() doesn't behave well in media queries (at least not in
// Chrome) so we just hardcode these as pixel values assuming 1rem = 16px.
// const minContentWidth = `${spacing.$75} + ${spacing.$4000} + ${spacing.$75}`;
const minContentWidth = "664px";
const minContentWidth_ = "663px";
// const maxContentWidth = `1px + ${spacing.$400} + ${textWidth} + ${spacing.$400} + 1px`;
const maxContentWidth = "770px";
const maxContentWidth_ = "769px";

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-top: ${spacing.$300};
  padding-bottom: ${spacing.$300};
  background: ${colors.neutral.$100};
  border-style: solid;
  border-color: ${colors.neutral.$300};
  /* box-shadow: ${shadows.large.neutral}; */

  @media (min-width: ${maxContentWidth}) {
    box-sizing: content-box;
    max-width: ${textWidth};
    padding-left: ${spacing.$400};
    padding-right: ${spacing.$400};
    border-width: 1px;
    border-radius: ${borderRadius};

    ${Callout} {
      margin-left: -${spacing.$150};
      margin-right: -${spacing.$150};
    }
  }

  @media (min-width: ${minContentWidth}) and (max-width: ${maxContentWidth_}) {
    padding-left: calc((100vw - ${textWidth}) / 2);
    padding-right: calc((100vw - ${textWidth}) / 2);
    border-width: 1px 0;
  }

  @media (max-width: ${minContentWidth_}) {
    padding-left: ${spacing.$75};
    padding-right: ${spacing.$75};
    border-width: 1px 0;
  }
`;

export const Vertical = styled.div`
  > * + * {
    margin-top: ${spacing.$100};
  }
`;

interface HorizontalProps {
  align?: React.CSSProperties["alignItems"];
}
export const Horizontal = styled.div<HorizontalProps>`
  display: flex;
  align-items: ${(props) => props.align || "center"};

  > * + * {
    margin-left: ${spacing.$100};
  }
`;
