"use client";;
import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },

  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  }
};
const ShinyButton = ({
  children,
  className,
  ...props
}) => {
  return (
    (<motion.button
      {...animationProps}
      {...props}
      className={cn(
        "tw-relative tw-rounded-lg tw-px-6 tw-py-2 tw-font-medium tw-backdrop-blur-xl tw-transition-shadow tw-duration-300 tw-ease-in-out hover:tw-shadow dark:tw-bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)] dark:hover:tw-shadow-[0_0_20px_hsl(var(--primary)/10%)]",
        className
      )}>
      <span
        className="tw-relative tw-block tw-size-full tw-text-sm tw-uppercase tw-tracking-wide tw-text-[rgb(0,0,0,65%)] dark:tw-font-light dark:tw-text-[rgb(255,255,255,90%)]"
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
        }}>
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="tw-absolute tw-inset-0 tw-z-10 tw-block tw-rounded-[inherit] tw-bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary) tw-p-px"></span>
    </motion.button>)
  );
};

export default ShinyButton;
