import { cx, useUniqueId } from "@/helpers/client";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Caret } from "./caret";
import { VisiblyHidden } from "./style-helpers";
import styles from "./tooltip.module.scss";

const tooltipPortalElement =
  typeof window !== "undefined" ? document.getElementById("ace-tooltip") : null;

export const useTooltip = <E extends Element = HTMLElement>(
  enabled: boolean = true,
) => {
  const [isVisible, setVisible] = useState(false);
  const tooltipId = `tooltip-${useUniqueId()}`;
  const triggerRef = useRef<E>(null);

  const baseTriggerProps = useMemo((): React.HTMLProps<E> => {
    if (!enabled) {
      return {};
    }

    const show = () => {
      setVisible(true);
    };

    const hide = () => {
      setVisible(false);
    };

    return {
      ref: triggerRef,
      onPointerEnter: show,
      onPointerLeave: hide,
      onFocus: show,
      onBlur: hide,
      tabIndex: -1,
    };
  }, [enabled]);

  const tooltipProps: TooltipProps = {
    isVisible,
    id: tooltipId,
    triggerRef,
  };

  const triggerProps = { ...baseTriggerProps };
  if (isVisible) {
    triggerProps["aria-describedby"] = tooltipId;
  }

  return {
    triggerRef,
    triggerProps,
    tooltipProps,
  };
};

type TooltipProps = {
  isVisible: boolean;
  triggerRef: RefObject<Element>;
  contentClassName?: string;
  caretClassName?: string;
  alwaysVisiblyHidden?: boolean;
} & JSX.IntrinsicElements["div"];

export const Tooltip = ({
  isVisible,
  triggerRef,
  contentClassName,
  caretClassName,
  alwaysVisiblyHidden,
  ...props
}: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<SVGSVGElement>(null);

  // This ought to be a layout effect, but there was a bizarre race condition
  // with functional refs temporarily being unset in the layout phase.
  useEffect(() => {
    const tooltipEl = tooltipRef.current;
    const caretEl = caretRef.current;
    const triggerEl = triggerRef.current;

    if (!tooltipPortalElement || !tooltipEl || !caretEl || !triggerEl) {
      return;
    }

    if (!isVisible) {
      tooltipEl.style.visibility = "hidden";
      return;
    }

    const { offsetWidth: tooltipWidth, offsetHeight: tooltipHeight } =
      tooltipEl;
    const {
      left: triggerLeft,
      right: triggerRight,
      width: triggerWidth,
      top: triggerTop,
      bottom: triggerBottom,
    } = triggerEl.getBoundingClientRect();
    const { scrollX, scrollY } = window;

    // Left.

    /** How much the tooltip overhangs on each side when it's centered. */
    const overhangX = (tooltipWidth - triggerWidth) / 2;
    /** The space between the right side of the trigger and the window edge. */
    const spaceRight = window.innerWidth - triggerRight;
    /** The `left` position of the tooltip to set. */
    let left = (triggerLeft + triggerRight - tooltipWidth) / 2;
    /** How much to shift left to avoid overflow right. */
    const shiftLeft = Math.max(overhangX - spaceRight + 1, 0);
    left -= shiftLeft;
    // Clamp at the left edge of the window regardless of shifting left.
    left = Math.max(left, 0);

    // Top.
    // Default to putting it below.
    let isTop = true;
    let top = triggerBottom;
    const spaceBottom = window.innerHeight - triggerBottom;
    // Only put it above if there's no room below and there is room above.
    if (spaceBottom < tooltipHeight && triggerTop > tooltipHeight) {
      top = triggerTop - tooltipHeight;
      isTop = false;
    }

    // Add `scrollX` and `scrollY` so we can use absolute positioning.
    tooltipEl.style.left = left + scrollX + "px";
    tooltipEl.style.top = top + scrollY + "px";
    tooltipEl.style.visibility = "visible";

    // We want to center the caret on the trigger element using positioning
    // relative to the tooltip element.
    caretEl.style.left =
      (triggerLeft + triggerRight) / 2 - left - caretEl.clientWidth / 2 + "px";
    if (isTop) {
      caretEl.style.bottom = "100%";
      caretEl.style.transform = "";
    } else {
      caretEl.style.top = "100%";
      caretEl.style.transform = "rotateZ(180deg)";
    }
  }, [isVisible, triggerRef]);

  if (alwaysVisiblyHidden && !isVisible) {
    return <VisiblyHidden as="span">{props.children}</VisiblyHidden>;
  }

  if (!tooltipPortalElement || !isVisible) {
    return null;
  }

  return createPortal(
    <div
      {...props}
      key={props.id}
      ref={tooltipRef}
      className={cx(props.className, styles.tooltip)}
    >
      <div className={cx(styles.content, contentClassName)}>
        <Caret className={cx(styles.svgCaret, caretClassName)} ref={caretRef} />
        {props.children}
      </div>
    </div>,
    tooltipPortalElement,
  );
};
