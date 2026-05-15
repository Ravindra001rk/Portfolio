"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SplitHeader({
  text,
  className = "",
  style = {},
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const words = text.split(" ");
  const combinedStyle: React.CSSProperties = { color: "#FF6B35", ...style };
  return (
    <h2 className={`overflow-hidden ${className}`} style={combinedStyle}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.06,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
