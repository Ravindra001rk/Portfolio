"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function SplitScrollTitle({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <h2 ref={ref} className={`overflow-hidden ${className}`} style={style}>
      {text.split(" ").map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="mr-[0.25em] inline-block overflow-hidden align-top"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={
              inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }
            }
            transition={{
              duration: 0.75,
              ease: EASE,
              delay: wordIndex * 0.08,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
