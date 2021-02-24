import { borderRadius, colors, fonts, shadows, spacing } from "@/design";
import { Props } from "@/helpers/frontend";
import { styled } from "linaria/react";

export const Callout = styled.aside`
  padding: ${spacing.$100} ${spacing.$150};
  border-width: 1px;
  border-style: solid;
  border-radius: ${borderRadius};
`;

export const GreenCallout = styled(Callout)`
  background-color: ${colors.green.$100};
  border-color: ${colors.green.$200};
  color: ${colors.green.$900};
  /* box-shadow: ${shadows.light.green}; */
`;

export const BlueCallout = styled(Callout)`
  background-color: ${colors.blue.$100};
  border-color: ${colors.blue.$200};
  color: ${colors.blue.$900};
  /* box-shadow: ${shadows.light.blue}; */
`;

export const YellowCallout = styled(Callout)`
  background-color: ${colors.yellow.$100};
  border-color: ${colors.yellow.$200};
  color: ${colors.yellow.$900};
  /* box-shadow: ${shadows.light.yellow}; */
`;

export const RedCallout = styled(Callout)`
  background-color: ${colors.red.$100};
  border-color: ${colors.red.$200};
  color: ${colors.red.$900};
  /* box-shadow: ${shadows.light.red}; */
`;

export const NeutralCallout = styled(Callout)`
  border-color: ${colors.neutral.$300};
  color: ${colors.neutral.$700};
`;

// Title.

const CalloutTitle = styled.p`
  ${fonts.smallest};
  // Small caps would be nice but then we need to load more fonts.
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: ${spacing.$50};
`;

const ReminderTitle = styled(CalloutTitle)`
  color: ${colors.neutral.$500};
`;

// Semantic versions.
export const Info = BlueCallout;
export const Hint = YellowCallout;
export const Agree = GreenCallout;
export const Disagree = RedCallout;

export const Reminder = ({
  children,
  ...props
}: Props<typeof NeutralCallout>) => (
  <NeutralCallout {...props}>
    <ReminderTitle>Reminder</ReminderTitle>

    {children}
  </NeutralCallout>
);
