import { cn } from "@/lib/utils";

export default function RetroGrid({
                                      className,
                                      angle = 65
                                  }) {
    return (
        <div
            className={cn(
                "tw-pointer-events-none tw-absolute tw-size-full tw-overflow-hidden tw-opacity-50 [perspective:tw-200px]",
                className
            )}
            style={{
                "--grid-angle": `${angle}deg`
            }}>
            {/* Grid */}
            <div
                className="tw-absolute tw-inset-0 [transform:tw-rotateX(var(--grid-angle))]">
                <div
                    className={cn(
                        "tw-animate-grid",
                        "[background-repeat:tw-repeat] [background-size:tw-60px_60px] [height:tw-300vh] [inset:tw-0%_0px] [margin-left:tw--50%] [transform-origin:tw-100%_0_0] [width:tw-600vw]",
                        // Light Styles
                        "[background-image:tw-linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",
                        // Dark styles
                        "dark:[background-image:tw-linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]"
                    )} />
            </div>
            {/* Background Gradient */}
            <div
                className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-white tw-to-transparent tw-to-90% dark:tw-from-black" />
        </div>
    );
}
