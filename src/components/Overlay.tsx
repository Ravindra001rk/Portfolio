"use client";
import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Section 1 Opacity (0% -> 2% -> 10%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.02, 0.1], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.1], [0, -300]);
  const display1 = useTransform(scrollYProgress, (p) =>
    p > 0.1 ? "none" : "flex",
  );

  // Section 2 Opacity — appears earlier (10% -> 20% -> 40%)
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.2, 0.4], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.1, 0.4], [80, -80]);

  // Section 3 Opacity — shifted to match section 2's earlier timing (40% -> 55% -> 75%)
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.55, 0.75], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.4, 0.75], [80, -80]);

  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/*l Section 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1, display: display1 }}
          className="absolute inset-0 flex flex-col items-center justify-center pt-[30vh] text-center px-8"
        >
          <h1 className="text-[80px] sm:text-[100px] md:text-9xl lg:text-[172px] font-black text-white/70 tracking-tighter leading-none">
            Ravindra. <br />
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-3xl lg:text-5xl mt-4 font-black text-white/65 tracking-tighter">
            Full Stack Developer.
          </h1>

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
