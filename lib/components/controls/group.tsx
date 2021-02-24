import { borderRadius, colors, shadows, spacing } from "@/design";
import { styled } from "linaria/lib/react";
import { buttonCss } from "./buttons";

const InputGroup = styled.div`
  position: relative;
  display: flex;
  background: ${colors.neutral.$50};
  border-radius: ${borderRadius};
  align-items: stretch;
  /* box-shadow: ${shadows.input.neutral}; */
  transition: box-shadow 75ms ease-in-out;

  input {
    position: relative; // For focus state's z-index
    flex: 1 1 auto;
    width: 1%;
    min-width: 0; // https://stackoverflow.com/questions/36247140/why-dont-flex-items-shrink-past-content-size
  }

  > ${buttonCss} {
    z-index: 2; // Makes the colored borders look better like this:
  }

  > :focus,
  > :focus-within {
    z-index: 3;
  }

  > :not(:first-child) {
    margin-left: -1px; // Overlap adjacent borders.
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  > :not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const InputGroupText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing.$50} ${spacing.$75};
  background: ${colors.neutral.$100};
  color: ${colors.neutral.$900};
  border: 1px solid ${colors.neutral.$400};
  border-radius: ${borderRadius};
`;

const exportedInputGroup = Object.assign(InputGroup, {
  Text: InputGroupText,
});
export { exportedInputGroup as InputGroup };
