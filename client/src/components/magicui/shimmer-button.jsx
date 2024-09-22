import React from "react";

import { cn } from "@/lib/utils";

const ShimmerButton = React.forwardRef((
  {
    shimmerColor = "#ffffff",
    shimmerSize = "0.05em",
    shimmerDuration = "3s",
    borderRadius = "100px",
    background = "rgba(0, 0, 0, 1)",
    className,
    children,
    ...props
  },
  ref,
) => {
  return (
    (<button
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background
        }
      }
      className={cn(
        "tw-group tw-relative tw-z-0 tw-flex tw-cursor-pointer tw-items-center tw-justify-center tw-overflow-hidden tw-whitespace-nowrap tw-border tw-border-white/10 tw-px-6 tw-py-3 tw-text-white [background:tw-var(--bg)] [border-radius:tw-var(--radius)] dark:tw-text-black",
        "tw-transform-gpu tw-transition-transform tw-duration-300 tw-ease-in-out active:tw-translate-y-[1px]",
        className
      )}
      ref={ref}
      {...props}>
      {/* spark container */}
      <div
        className={cn(
          "tw--z-30 tw-blur-[2px]",
          "tw-absolute tw-inset-0 tw-overflow-visible [container-type:tw-size]"
        )}>
        {/* spark */}
        <div
          className="tw-absolute tw-inset-0 tw-h-[100cqh] tw-animate-slide [aspect-ratio:tw-1] [border-radius:tw-0] [mask:tw-none]">
          {/* spark before */}
          <div
            className="tw-animate-spin-around tw-absolute tw-inset-[-100%] tw-w-auto tw-rotate-0 [background:tw-conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:tw-0_0]" />
        </div>
      </div>
      {children}
      {/* Highlight */}
      <div
        className={cn(
          "tw-insert-0 tw-absolute tw-h-full tw-w-full",
          "tw-rounded-2xl tw-px-4 tw-py-1.5 tw-text-sm tw-font-medium tw-shadow-[inset_0_-8px_10px_#ffffff1f]",
          // transition
          "tw-transform-gpu tw-transition-all tw-duration-300 tw-ease-in-out",
          // on hover
          "group-hover:tw-shadow-[inset_0_-6px_10px_#ffffff3f]",
          // on click
          "group-active:tw-shadow-[inset_0_-10px_10px_#ffffff3f]"
        )} />
      {/* backdrop */}
      <div
        className={cn(
          "tw-absolute tw--z-20 [background:tw-var(--bg)] [border-radius:tw-var(--radius)] [inset:tw-var(--cut)]"
        )} />
    </button>)
  );
});

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;
