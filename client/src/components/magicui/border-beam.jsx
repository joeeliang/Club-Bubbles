import { cn } from "@/lib/utils";

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0
}) => {
  return (
    (<div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`
        }
      }
      className={cn(
        "tw-pointer-events-none tw-absolute tw-inset-0 tw-rounded-[inherit] [border:tw-calc(var(--border-width)*1px)_solid_transparent]",
        // mask styles
        "![mask-clip:tw-padding-box,border-box] ![mask-composite:tw-intersect] [mask:tw-linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        // pseudo styles
        "after:tw-absolute after:tw-aspect-square after:tw-w-[calc(var(--size)*1px)] after:tw-animate-border-beam after:[animation-delay:tw-var(--delay)] after:[background:tw-linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:tw-calc(var(--anchor)*1%)_50%] after:[offset-path:tw-rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )} />)
  );
};
