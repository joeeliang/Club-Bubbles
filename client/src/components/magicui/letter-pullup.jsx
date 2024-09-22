"use client";;
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export default function LetterPullup({
  className,
  words,
  delay
}) {
  const letters = words.split("");

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * (delay ? delay : 0.05), // By default, delay each letter's animation by 0.05 seconds
      },
    }),
  };

  return (
    (<div className="tw-flex tw-justify-center">
      {letters.map((letter, i) => (
        <motion.h1
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate="animate"
          custom={i}
          className={cn(
            "tw-font-display tw-text-center tw-text-4xl tw-font-bold tw-tracking-[-0.02em] tw-text-black tw-drop-shadow-sm dark:tw-text-white md:tw-text-4xl md:tw-leading-[5rem]",
            className
          )}>
          {letter === " " ? <span>&nbsp;</span> : letter}
        </motion.h1>
      ))}
    </div>)
  );
}
