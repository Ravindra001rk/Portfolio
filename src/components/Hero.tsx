"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ── Animation helpers ─────────────────────────────────────────── */
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.9, ease: "easeOut" as const, delay },
});

const rotatingHeroWords = [
  "WEB APPS",
  "ADMIN PANELS",
  "MERN SYSTEMS",
  "REAL PROJECTS",
];
export default function Hero() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loader state
  const [loadProgress, setLoadProgress] = useState(0);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    // Fake loading progress
    const interval = setInterval(() => {
      setLoadProgress((p) => {
        if (p >= 1) {
          clearInterval(interval);
          return 1;
        }
        return p + 0.05;
      });
    }, 40);

    const t = setTimeout(() => setMinTimeElapsed(true), 1500);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  const isLoaded = loadProgress >= 1 && minTimeElapsed;

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;

    if (!isLoaded) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setActiveWordIndex((index) => (index + 1) % rotatingHeroWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoaded]);

  /* ── Grain canvas ──────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawGrain = (time: number) => {
      if (time - lastTime < 80) {
        animId = requestAnimationFrame(drawGrain);
        return;
      }
      lastTime = time;
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const buf = imageData.data;
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        buf[i] = v;
        buf[i + 1] = v;
        buf[i + 2] = v;
        buf[i + 3] = 18; // very subtle
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(drawGrain);
    };

    animId = requestAnimationFrame(drawGrain);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* ── Loader ─────────────────────────────────────────────────── */}
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
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1],
                      delay: index * 0.02,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
              <div className="mt-6 md:mt-12">
                <div className="h-[2px] w-full bg-white/20 overflow-hidden relative">
                  <motion.div
                    className="h-full bg-white absolute top-0 left-0"
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

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col"
      >
        {/* Grain overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-60 mix-blend-overlay"
        />

        {/* Accent glow blobs */}
        <div
          aria-hidden
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,53,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,53,0.10) 0%, transparent 70%)",
          }}
        />

        {/* Horizontal rule top */}
        {/* <motion.div
          {...fadeIn(0.1)}
          className="w-full h-px bg-white/10 mt-[72px] z-20 relative"
        /> */}

        {/* Main content */}
        <div className="relative z-20 flex flex-col flex-1 justify-center lg:justify-end px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 max-w-[1400px] mx-auto w-full pt-16 lg:pt-0">
          <div className="pb-8 md:pb-32 lg:pb-[15vh]">
            {/* Headline */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-black uppercase leading-[1.1] md:leading-[0.88] tracking-[-0.03em]"
                style={{
                  fontFamily: "var(--font-outfit), system-ui, sans-serif",
                }}
              >
                {/* Line 1 — I BUILD */}
                <motion.span
                  className="block text-white mb-4 md:mb-0"
                  style={{
                    fontSize: "clamp(5rem, 12vw, 10rem)",
                  }}
                  initial={{ y: "110%" }}
                  animate={isLoaded ? { y: 0 } : {}}
                  transition={{
                    duration: 0.9,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.3,
                  }}
                >
                  I BUILD
                </motion.span>

                {/* Line 2 — REAL WEB SYSTEMS (highlighted) */}
                <motion.span
                  className="block relative mt-4 md:mt-0"
                  style={{
                    fontSize: "clamp(3.2rem, 10vw, 8rem)",
                  }}
                  initial={{ y: "110%" }}
                  animate={isLoaded ? { y: 0 } : {}}
                  transition={{
                    duration: 0.9,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.45,
                  }}
                >
                  {/* Highlight box behind text - Animated width */}
                  <motion.span
                    aria-hidden
                    className="absolute left-0 inset-y-[6%] rounded-[6px] pointer-events-none"
                    style={{
                      background: "#ff6b35",
                      zIndex: -1,
                      marginLeft: "-0.04em",
                      marginRight: "-0.04em",
                    }}
                    initial={{ width: "0%" }}
                    animate={isLoaded ? { width: "100%" } : {}}
                    transition={{
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.8,
                    }}
                  />
                  <span
                    className="relative text-black py-4 px-4 inline-grid min-w-[8.5ch] overflow-hidden align-top"
                    style={{ zIndex: 1 }}
                    aria-live="polite"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={rotatingHeroWords[activeWordIndex]}
                        className="col-start-1 row-start-1 flex flex-wrap"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        {rotatingHeroWords[activeWordIndex]
                          .split(" ")
                          .map((word, wordIndex, wordsArr) => {
                            const previousWords = wordsArr.slice(0, wordIndex);
                            const globalStartIndex =
                              previousWords.join(" ").length +
                              (wordIndex > 0 ? 1 : 0);

                            return (
                              <span
                                key={wordIndex}
                                className="inline-block whitespace-nowrap mr-[0.3em] last:mr-0"
                              >
                                {word.split("").map((char, charIndex) => (
                                  <motion.span
                                    key={charIndex}
                                    variants={{
                                      initial: { y: "105%", opacity: 0 },
                                      animate: { y: 0, opacity: 1 },
                                      exit: { y: "-105%", opacity: 0 },
                                    }}
                                    transition={{
                                      duration: 0.25,
                                      ease: [0.33, 1, 0.68, 1],
                                      delay:
                                        (globalStartIndex + charIndex) * 0.02,
                                    }}
                                    className="inline-block"
                                  >
                                    {char}
                                  </motion.span>
                                ))}
                              </span>
                            );
                          })}
                      </motion.div>
                    </AnimatePresence>
                  </span>
                </motion.span>
              </motion.h1>
            </div>

            {/* Bottom row */}
            <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.7,
                }}
                className="text-base sm:text-lg md:text-xl leading-relaxed max-w-[440px]"
                style={{ color: "#9B9B8E" }}
              >
                Backend-focused MERN developer creating{" "}
                <span className="text-white font-medium">
                  fast, functional,
                </span>{" "}
                and <span className="text-white font-medium">scalable</span>{" "}
                applications.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.85,
                }}
                className="flex items-center gap-5"
              >
                <Link
                  href="/works"
                  className="group relative overflow-hidden inline-flex items-center gap-3 rounded-full border-2 px-8 py-3.5 font-bold text-sm tracking-wide transition-all duration-300"
                  style={{
                    borderColor: "#ff6b35",
                    color: "#ff6b35",
                  }}
                >
                  <div
                    className="absolute inset-0 bg-[#ff6b35] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0"
                    aria-hidden
                  />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300 uppercase tracking-widest">
                    View My Work
                  </span>
                  <span className="relative z-10 text-lg font-black group-hover:text-black transition-all duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
