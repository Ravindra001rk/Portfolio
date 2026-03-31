"use client";
import React, { useRef, useState } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);

  // Track scroll progress of this 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <AnimatePresence>
        {loadProgress < 1 && (
          <motion.div
            initial={{ y: 0 }}
            exit={{
              y: "-100%",
              transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.2,
              },
            }}
            className="fixed inset-0 z-[100] bg-[#111111] flex flex-col items-center justify-center text-white"
          >
            <div className="flex flex-col items-stretch">
              <span className="text-[80px] sm:text-[90px] md:text-[100px] lg:text-[130px] font-bold tracking-tighter text-center leading-none">
                Ravindra.
              </span>
              <div className="mt-6 md:mt-12">
                <div className="h-[2px] w-full bg-white/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    style={{ width: `${loadProgress * 100}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between items-center mt-4 text-sm md:text-sm lg:text-base text-zinc-400 tracking-widest font-medium uppercase px-1">
                  <span>Loading Experience</span>
                  <span>{Math.round(loadProgress * 100)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        ref={containerRef}
        className="relative w-full h-[450vh] bg-[#121212]"
      >
        <ScrollyCanvas
          scrollYProgress={scrollYProgress}
          numFrames={90}
          onLoadProgress={setLoadProgress}
        />
        <Overlay scrollYProgress={scrollYProgress} />
      </section>
    </>
  );
}
