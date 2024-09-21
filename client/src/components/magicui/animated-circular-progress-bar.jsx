import { cn } from "@/lib/utils";

export default function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className
}) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = ((value - min) / (max - min)) * 100;

  return (
    (<div
      className={cn("tw-relative tw-size-40 tw-text-2xl tw-font-semibold", className)}
      style={
        {
          "--circle-size": "100px",
          "--circumference": circumference,
          "--percent-to-px": `${percentPx}px`,
          "--gap-percent": "5",
          "--offset-factor": "0",
          "--transition-length": "1s",
          "--transition-step": "200ms",
          "--delay": "0s",
          "--percent-to-deg": "3.6deg",
          transform: "translateZ(0)"
        }
      }>
      <svg
        fill="none"
        className="tw-size-full"
        strokeWidth="2"
        viewBox="0 0 100 100">
        {currentPercent <= 90 && currentPercent >= 0 && (
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tw- tw-opacity-100"
            style={
              {
                stroke: gaugeSecondaryColor,
                "--stroke-percent": 90 - currentPercent,
                "--offset-factor-secondary": "calc(1 - var(--offset-factor))",

                strokeDasharray:
                  "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",

                transform:
                  "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)",

                transition: "all var(--transition-length) ease var(--delay)",

                transformOrigin:
                  "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)"
              }
            } />
        )}
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tw-opacity-100"
          style={
            {
              stroke: gaugePrimaryColor,
              "--stroke-percent": currentPercent,

              strokeDasharray:
                "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",

              transition:
                "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",

              transitionProperty: "stroke-dasharray,transform",

              transform:
                "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",

              transformOrigin:
                "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)"
            }
          } />
      </svg>
      <span
        data-current-value={currentPercent}
        className="tw-duration-[var(--transition-length)] tw-delay-[var(--delay)] tw-absolute tw-inset-0 tw-m-auto tw-size-fit tw-ease-linear tw-animate-in tw-fade-in">
        {currentPercent}
      </span>
    </div>)
  );
}
