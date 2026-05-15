"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
// import { motion } from "framer-motion";
import SplitHeader from "@/components/SplitHeader";
import { ClipboardList, PenTool, Rocket } from "lucide-react";

const PROCESS_STEPS = [
  {
    title: "Plan",
    description:
      "Define the goal, core features, and the cleanest path to build.",
    Icon: ClipboardList,
    imageUrl: "/plan.png",
  },
  {
    title: "Design",
    description:
      "Shape the layout and interaction details before jumping into code.",
    Icon: PenTool,
    imageUrl: "/design.png",

    imageBg:
      "radial-gradient(ellipse at 38% 36%, #9333ea 0%, #7e22ce 28%, #5b21b6 55%, #2d1b69 100%)",
    imageShadow:
      "0 0 140px 40px rgba(147,51,234,0.12), inset 0 0 90px rgba(0,0,0,0.6)",
  },

  {
    title: "Launch",
    description: "Deploy the project and polish what real usage reveals.",
    Icon: Rocket,
    imageUrl: "/launch.png",

    imageBg:
      "radial-gradient(ellipse at 38% 36%, #059669 0%, #047857 28%, #064e3b 55%, #051b15 100%)",
    imageShadow:
      "0 0 140px 40px rgba(5,150,105,0.12), inset 0 0 90px rgba(0,0,0,0.6)",
  },
];

const STEP_COUNT = PROCESS_STEPS.length;

// Total extra scroll height = SCROLL_MULTIPLIER × 100vh
// More = slower progression through steps. Lower value = faster stick/unpin
const SCROLL_MULTIPLIER = 1.2;

// Height of each step row in px — keep in sync with the inline style below
// Will be adjusted responsively in component
const STEP_ROW_HEIGHT_MOBILE = 95;
const STEP_ROW_HEIGHT_DESKTOP = 130;

export default function Process() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for responsive behavior
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const scrollY = window.scrollY;
      const top = wrapper.offsetTop;
      const range = window.innerHeight * SCROLL_MULTIPLIER;

      if (scrollY <= top) setProgress(0);
      else if (scrollY >= top + range) setProgress(1);
      else setProgress((scrollY - top) / range);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIndex = Math.min(
    Math.floor(progress * STEP_COUNT),
    STEP_COUNT - 1,
  );

  const stepRowHeight = isMobile
    ? STEP_ROW_HEIGHT_MOBILE
    : STEP_ROW_HEIGHT_DESKTOP;

  // Line fills from center of dot[0] to center of dot[STEP_COUNT-1]
  const trackHeight = (STEP_COUNT - 1) * stepRowHeight; // px
  const fillHeight = Math.min(
    progress * (STEP_COUNT / (STEP_COUNT - 0.9)) * trackHeight,
    trackHeight,
  );

  return (
    /* Wrapper — consumes extra scroll height so sticky panel stays pinned */
    <div
      ref={wrapperRef}
      style={{ height: `${(1 + SCROLL_MULTIPLIER) * 100}vh` }}
      className="relative"
    >
      {/* ── Sticky full-screen panel ──────────────────────────────────── */}
      <div
        className="sticky top-0 h-screen w-full lg:overflow-hidden pt-12 sm:pt-16 lg:pt-12 lg:pb-12"
        style={{ backgroundColor: "#121212" }}
      >
        <div className="px-6 sm:px-10 lg:px-24 pt-6">
          <p
            className="font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2"
            style={{ color: "var(--color-label)" }}
          >
            Process
          </p>
          <SplitHeader
            text="Process"
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
          />
        </div>
        <div className="flex flex-col lg:flex-row h-full w-full items-center lg:items-center gap-4 sm:gap-6 lg:gap-0 px-3 sm:px-6 lg:px-0">
          {/* ══════════════════════════════════════════════════════════
              LEFT — 3D visual / image
              Replace the placeholder below with your actual asset:
                <img src="/globe.png" … />   or   <Spline … />
          ══════════════════════════════════════════════════════════ */}
          <div className="flex w-full lg:w-1/2 items-center justify-center flex-shrink-0 py-4 sm:py-6 lg:py-0 lg:h-full">
            {/* Dynamic image — changes per step with transition */}
            <div className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] lg:w-[460px] lg:h-[460px] overflow-hidden rounded-full">
              {PROCESS_STEPS[activeIndex].imageUrl ? (
                <Image
                  src={PROCESS_STEPS[activeIndex].imageUrl}
                  alt={PROCESS_STEPS[activeIndex].title}
                  fill
                  className="object-cover transition-all duration-500"
                />
              ) : (
                <div
                  className="absolute inset-0 rounded-full transition-all duration-500"
                  style={{
                    background: PROCESS_STEPS[activeIndex].imageBg,
                    boxShadow: PROCESS_STEPS[activeIndex].imageShadow,
                  }}
                />
              )}
              {/* Tilted orbit ring — decorative */}
              <div
                className="absolute inset-0 rounded-full border border-white/[0.07] pointer-events-none"
                style={{
                  transform: "scale(1.12) rotateX(72deg) rotateZ(-15deg)",
                }}
              />
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT — vertical timeline (exact match to reference)
          ══════════════════════════════════════════════════════════ */}
          <div className="flex w-full lg:w-1/2 lg:h-full lg:items-center">
            <div
              className="relative w-full"
              style={{
                paddingRight: isMobile ? "1rem" : "4rem",
                paddingLeft: "0.5rem",
              }}
            >
              {/* ── Vertical track line ─────────────────────────────── */}
              {/* Positioned at horizontal center of dot (dot = 44px wide → center = 22px = 1.375rem) */}
              <div
                className="absolute"
                style={{
                  left: "2rem", // center of the 64px dot
                  top: "2rem", // center of first dot
                  width: "2px",
                  height: `${trackHeight}px`,
                }}
              >
                {/* Dim background track (subtle white) */}
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                />
                {/* Animated white fill */}
                <div
                  className="absolute top-0 left-0 w-full"
                  style={{
                    height: `${fillHeight}px`,
                    background: "rgba(255,255,255,1)",
                    transition: "none",
                  }}
                />
              </div>

              {/* ── Step rows ───────────────────────────────────────── */}
              {PROCESS_STEPS.map(({ title, description }, i) => {
                const isActive = i <= activeIndex;
                const isCurrent = i === activeIndex;

                return (
                  <div
                    key={title}
                    className="relative flex items-start gap-3 sm:gap-4 lg:gap-7"
                    style={{ height: `${stepRowHeight}px` }}
                  >
                    {/* Dot — numbered circle, exactly like reference */}
                    <div
                      className="relative z-10 flex-shrink-0 flex items-center justify-center rounded-full"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: "#000",
                        border: isActive
                          ? "1.5px solid rgba(255,255,255,0.18)"
                          : "1.2px solid rgba(255,255,255,0.08)",
                        transition: "all 0.18s ease",
                        boxShadow: isCurrent
                          ? "0 0 30px 8px rgba(255,255,255,0.06), inset 0 0 18px rgba(0,0,0,0.6)"
                          : "0 0 18px 6px rgba(0,0,0,0.6)",
                      }}
                    >
                      <span
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          boxShadow: isCurrent
                            ? "0 0 40px 12px rgba(255,255,255,0.06)"
                            : "0 0 24px 8px rgba(255,255,255,0.02)",
                        }}
                      />
                      {/* Pulse on current */}
                      {isCurrent && (
                        <span
                          className="absolute inset-0 rounded-full animate-ping"
                          style={{
                            background: "rgba(255,255,255,0.07)",
                            animationDuration: "1.2s",
                          }}
                        />
                      )}
                      <span
                        className="relative z-10 font-mono font-semibold"
                        style={{
                          color: isActive
                            ? "#ffffff"
                            : "rgba(255,255,255,0.85)",
                          transition: "color 0.18s ease",
                          fontSize: isMobile ? "1rem" : "1.125rem",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Text block */}
                    <div
                      className="pt-0.5"
                      style={{
                        paddingTop: isMobile ? "0.75rem" : "0.125rem",
                        transform: isCurrent
                          ? "translateX(4px)"
                          : "translateX(0)",
                        transition: "transform 0.18s ease",
                      }}
                    >
                      {/* Title — big, bold, white when active */}
                      <h3
                        style={{
                          fontFamily: "var(--font-josefin)",
                          fontSize: isMobile
                            ? "clamp(1.25rem, 6vw, 1.5rem)"
                            : "clamp(1.5rem, 2.2vw, 2.25rem)",
                          fontWeight: 700,
                          lineHeight: 1,
                          color: isCurrent
                            ? "rgba(255,255,255,1)"
                            : isActive
                              ? "rgba(255,255,255,0.38)"
                              : "rgba(255,255,255,0.13)",
                          transition: "color 0.18s ease",
                        }}
                      >
                        {title}
                      </h3>

                      {/* Description — only clearly visible on current */}
                      <p
                        style={{
                          marginTop: "0.2rem",
                          fontSize: isMobile ? "0.9rem" : "0.875rem",
                          lineHeight: 1.4,
                          maxWidth: isMobile ? "26ch" : "28ch",
                          color: isCurrent
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(255,255,255,0.08)",
                          transition: "color 0.5s ease",
                        }}
                      >
                        {description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
