"use client";
import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

export interface OverlayProps {
  scrollYProgress: MotionValue<number>;
  isLoaded?: boolean;
}

export default function Overlay({
  scrollYProgress,
  isLoaded = true,
}: OverlayProps) {
  // Hero intro animations triggered by isLoaded
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.5,
      },
    },
  };

  const subtitleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.9,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  // Section 1 Opacity
  const opacity1 = useTransform(scrollYProgress, [0, 0.04, 0.14], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.14], [0, -300]);
  const display1 = useTransform(scrollYProgress, (p) =>
    p > 0.14 ? "none" : "flex",
  );

  // Section 2 Opacity — earlier appearance
  const opacity2 = useTransform(scrollYProgress, [0.12, 0.22, 0.42], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.12, 0.42], [80, -80]);

  // Section 3 Opacity — appears early, holds until end
  const opacity3 = useTransform(scrollYProgress, [0.42, 0.54, 0.96, 1.0], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.42, 0.54], [80, 0]);

  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/*l Section 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1, display: display1 }}
          className="absolute inset-0 flex flex-col items-center justify-center pt-[30vh] text-center px-8"
        >
          <motion.h1 
            className="text-[80px] sm:text-[100px] md:text-9xl lg:text-[172px] font-black text-white/70 tracking-tighter leading-none"
            variants={titleContainerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            style={{ perspective: 1000 }}
          >
            {"Ravindra.".split("").map((char, i) => (
              <motion.span key={i} variants={charVariants} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-3xl lg:text-5xl mt-4 font-black text-white/65 tracking-tighter flex justify-center space-x-2"
            variants={subtitleContainerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {"Full Stack Developer.".split(" ").map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Scroll Indicator */}
          <div className="absolute bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-white/40 mb-3 font-semibold">
              Scroll
            </span>
            <div className="w-[24px] h-[38px] md:w-[28px] md:h-[44px] border-[2px] border-white/30 rounded-full flex justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="w-1 h-1.5 md:w-1 md:h-2 bg-white/80 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex items-center justify-center md:justify-start px-4 sm:px-6 md:px-24 text-left md:text-left"
        >
          <div className="max-w-2xl">
            <h2
              className="font-bold tracking-tight leading-tight 
      text-[clamp(2.5rem,5vw,3.5rem)]
      bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-transparent"
            >
              I build fast, reliable systems <br />
              that solve real business problems.
            </h2>
          </div>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex items-center justify-center md:justify-end px-4 sm:px-6 md:px-24 text-right md:text-right"
        >
          <div className="max-w-2xl">
            <h2
              className="font-bold tracking-tight leading-tight 
  text-[clamp(2.5rem,5vw,3.5rem)]
  bg-gradient-to-l from-zinc-100 to-zinc-500 bg-clip-text text-transparent"
            >
              From idea to deployment — <br />
              <span className="text-white">
                I turn concepts into real, working systems that solve actual
                problems.
              </span>
            </h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
