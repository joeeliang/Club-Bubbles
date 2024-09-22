import { cn } from "@/lib/utils";

const AnimatedShinyText = ({
  children,
  className,
  shimmerWidth = 100,
}) => {
  return (
    (<p
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`
        }
      }
      className={cn(
        "tw-mx-auto tw-max-w-md tw-text-neutral-600/70 dark:tw-text-neutral-400/70",
        // Shimmer effect
        "tw-animate-shimmer tw-bg-clip-text tw-bg-no-repeat [background-position:tw-0_0] [background-size:tw-var(--shimmer-width)_100%] [transition:tw-background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        // Shimmer gradient
        "tw-bg-gradient-to-r tw-from-transparent tw-via-black/80 tw-via-50% tw-to-transparent tw- dark:tw-via-white/80",
        className
      )}>
      {children}
    </p>)
  );
};

export default AnimatedShinyText;
