import { borderRadius, colors, fonts, spacing } from "@/design";
import { Html } from "@/helpers/frontend";
import { css, cx } from "linaria";
import Link from "next/link";
import { forwardRef } from "react";
import { useDisabled } from "./disabled";

type ButtonProps = {
  color: "green" | "blue" | "yellow";
  link?: string;
  iconLeft?: Html;
  iconRight?: Html;
} & JSX.IntrinsicElements["button"] &
  JSX.IntrinsicElements["a"]; // forwardRef doesn't work with generics.

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, link, children, iconLeft, iconRight, ...props }, ref) => {
    props.disabled = useDisabled(props);

    const childrenWithIcons = (
      <>
        {iconLeft}
        {children}
        {iconRight}
      </>
    );

    props.className = cx(
      props.className,
      buttonCss,
      iconLeft && iconFirstCss,
      iconRight && iconLastCss,
      color === "green" && greenCss,
      color === "blue" && blueCss,
      color === "yellow" && yellowCss
    );

    return !props.disabled && link ? (
      <Link href={link}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
        <a {...(props as JSX.IntrinsicElements["a"])} ref={ref as any}>
          {childrenWithIcons}
        </a>
      </Link>
    ) : (
      <button {...props} type={props.type || "button"} ref={ref as any}>
        {childrenWithIcons}
      </button>
    );
  }
);

/** @internal */
export const buttonCss = css`
  padding: ${spacing.$75} ${spacing.$200};
  border-radius: ${borderRadius};
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  color: ${colors.white};

  ${fonts.ui}

  transition-property: box-shadow;
  transition-duration: 100ms;
  transition-timing-function: ease-in-out;

  &:focus {
    outline: none;
  }

  &:active {
    /* transform: translateY(1px); */
  }

  // Icons.
  svg {
    width: 1em;
    height: auto;
  }
`;

const iconFirstCss = css`
  svg {
    margin-left: -0.3rem;
    margin-right: 0.6rem;
  }
`;

const iconLastCss = css`
  svg {
    margin-left: 0.6rem;
    margin-right: -0.3rem;
  }
`;

const colorCss = (color: colors.Color) => ({
  background: color.$500,
  borderColor: color.$600,
  // boxShadow: base,

  "&:hover": {
    background: color.$600,
    borderColor: color.$700,
    // boxShadow: `${base},
    //   0px 2px 9px 4px ${colors.alpha(color.$300, 0.65)}`,
  },

  "&:active": {
    background: color.$700,
    borderColor: color.$700,
    // boxShadow: `${base},
    //   0px 1px 6px 4px ${colors.alpha(color.$300, 0.75)}`,
  },

  "&:focus": {
    boxShadow: `0 0 0 2px ${color.$600},
      0 1px 6px ${colors.alpha(colors.blue.$600, 0.3)}`,
    // boxShadow: `${base},
    //   0 2px 10px 7px ${colors.alpha(color.$300, 0.65)},
    //   0 0 0 3px ${colors.alpha(color.$500, 0.75)}`,
  },
});

const greenCss = css`
  ${colorCss(colors.green)}
`;

const blueCss = css`
  ${colorCss(colors.blue)}
`;

const yellowCss = css`
  ${colorCss(colors.yellow)}
`;
