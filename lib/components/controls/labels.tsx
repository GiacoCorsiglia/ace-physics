import { spacing } from "@/design";
import type { Css } from "@/helpers/frontend";
import { styled } from "linaria/react";

export const ControlLabel = styled.label`
  display: block;
`;

interface AlignProp {
  align?: Css["alignItems"];
}

export const LabelsLeft = styled.div<AlignProp>`
  display: grid;

  @media (min-width: 512px) {
    grid-template-columns: auto 1fr;
    align-items: ${(props) => props.align || "start"};
    row-gap: ${spacing.$100};
    column-gap: ${spacing.$100};

    > * {
      grid-column: 2;
    }

    > ${ControlLabel} {
      grid-column: 1;
      text-align: right;
      padding: ${spacing.$50} 0;
    }
  }

  @media (max-width: 511px) {
    grid-template-columns: 1fr;
    row-gap: ${spacing.$100};
  }
`;

export const LabelsRight = styled.div<AlignProp>`
  display: grid;

  @media (min-width: 512px) {
    grid-template-columns: 1fr auto;
    grid-auto-flow: dense; // Make the first field go before the first label.
    align-items: ${(props) => props.align || "center"};
    row-gap: ${spacing.$100};
    column-gap: ${spacing.$100};

    > * {
      grid-column: 1;
    }

    > ${ControlLabel} {
      grid-column: 2;
      padding: ${spacing.$50} 0;
    }
  }

  @media (max-width: 511px) {
    grid-template-columns: 1fr;
    row-gap: ${spacing.$100};
  }
`;
