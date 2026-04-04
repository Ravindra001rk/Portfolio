"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    // Ensures the loader lasts at least 1.5s so the name animation finishes
    const t = setTimeout(() => setMinTimeElapsed(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const isLoaded = (isReady || loadProgress === 1) && minTimeElapsed;

  // Track scroll progress of this 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
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
              <div className="flex justify-center overflow-hidden text-[80px] sm:text-[90px] md:text-[100px] lg:text-[130px] font-bold tracking-tighter leading-[1.1]">
                {"Ravindra.".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ y: "100%", filter: "blur(4px)", opacity: 0 }}
                    animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1],
                      delay: index * 0.04,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
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
        className="relative w-full h-[600vh] bg-[#121212]"
      >
        <ScrollyCanvas
          scrollYProgress={scrollYProgress}
          numFrames={120}
          onLoadProgress={setLoadProgress}
          onReady={() => setIsReady(true)}
        />
        <Overlay scrollYProgress={scrollYProgress} isLoaded={isLoaded} />
      </section>
    </>
  );
}
