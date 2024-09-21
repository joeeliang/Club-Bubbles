"use client";

import { useEffect, useState } from "react";
import AnimatedCircularProgressBar from "@/components/magicui/animated-circular-progress-bar";

export function Progressbar({ loading }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!loading) {
            setValue(0);
            return;
        }

        const handleIncrement = (prev) => {
            if (prev >= 100) {
                return 100; // Keep at 100 to indicate loading completed
            }
            return prev + 10;
        };

        setValue(10); // Start the progress bar at 10% on loading
        const interval = setInterval(() => {
            setValue(handleIncrement);
        }, 200); // Adjust interval for faster loading feedback

        return () => clearInterval(interval);
    }, [loading]);

    return (
        <div className={`tw-flex tw-justify-center tw-items-center ${loading ? "block" : "hidden"}`}>
            <AnimatedCircularProgressBar
                max={100}
                min={0}
                value={value}
                gaugePrimaryColor="rgb(79 70 229)"
                gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                className="tw-outline-none tw-border-none" // Ensure no outline or border
            />
        </div>
    );
}
