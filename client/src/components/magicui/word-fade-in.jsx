"use client";;
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export default function WordFadeIn({
  words,
  delay = 0.15,

  variants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  },

  className
}) {
  const _words = words.split(" ");

  return (
    (<motion.h1
      variants={variants}
      initial="hidden"
      animate="visible"
      className={cn(
        "tw-font-display tw-text-center tw-text-4xl tw-font-bold tw-tracking-[-0.02em] tw-text-black tw-drop-shadow-sm dark:tw-text-white md:tw-text-7xl md:tw-leading-[5rem]",
        className
      )}>
      {_words.map((word, i) => (
        <motion.span key={word} variants={variants} custom={i}>
          {word}{" "}
        </motion.span>
      ))}
    </motion.h1>)
  );
}
