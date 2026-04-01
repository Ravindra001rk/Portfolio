"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";

const SERVICES = [
  {
    label: "Web Apps",
    description:
      "Complete websites and applications built from start to finish, ready for real use.",
  },
  {
    label: "Design",
    description:
      "Clean and modern layouts that make your website easy to use and visually appealing.",
  },
  {
    label: "Backend",
    description:
      "The system behind your website that handles data, users, and functionality smoothly.",
  },
  {
    label: "Experience",
    description:
      "Making sure your website feels simple, clear, and easy for anyone to use.",
  },
  {
    label: "Speed",
    description:
      "Optimising your website so it loads fast and works smoothly on all devices.",
  },
];

let globalCharCount = 0;
const SERVICES_WITH_CHARS = SERVICES.map((service) => {
  const words = [];
  const parts = service.label.split(/( )/);
  for (const part of parts) {
    if (part === "") continue;
    if (part === " ") {
      words.push({
        isSpace: true,
        text: " ",
        chars: [{ char: " ", globalIndex: globalCharCount++ }],
      });
    } else {
      words.push({
        isSpace: false,
        text: part,
        chars: part.split("").map((char) => ({ char, globalIndex: globalCharCount++ })),
      });
    }
  }
  return { ...service, words };
});
const TOTAL_CHARS = globalCharCount;

type ProcessedService = typeof SERVICES_WITH_CHARS[0];

function Char({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const color = useTransform(progress, [start, end], ["#2e2e2e", "#B7AB98"]);
  return <motion.span style={{ color, willChange: "color" }}>{char}</motion.span>;
}

export default function WhatIDo() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "center 0.25"],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#121212] border-t border-white/5 overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-8xl mx-auto px-6 md:px-16 lg:px-24 pt-16 md:pt-20 pb-4">
        <p className="text-zinc-500 font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm">
          What I Do
        </p>
      </div>

      {/* Service rows */}
      <div className="w-full">
        {SERVICES_WITH_CHARS.map((service, i) => (
          <ServiceRow
            key={service.label}
            service={service}
            index={i}
            isActive={activeIndex === i}
            onEnter={() => setActiveIndex(i)}
            onLeave={() => setActiveIndex(null)}
            progress={scrollYProgress}
          />
        ))}
      </div>

      {/* Bottom padding */}
      <div className="pb-16 md:pb-24" />
    </section>
  );
}

// Shared clip transition config
const CLIP_TRANSITION = { duration: 0.3, ease: [0.76, 0, 0.24, 1] as const };
const CLIP_CLOSED = "inset(50% 0% 50% 0%)";
const CLIP_OPEN = "inset(0% 0% 0% 0%)";

function RowContent({
  service,
  index,
  dark,
  isActive,
  progress,
}: {
  service: ProcessedService;
  index: number;
  dark: boolean;
  isActive: boolean;
  progress?: MotionValue<number>;
}) {
  return (
    <div className="max-w-8xl mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between gap-8 py-4 md:py-2">
      {/* Index + Label */}
      <div className="flex items-baseline gap-6 flex-1 min-w-0">
        <span
          className="hidden md:block text-[11px] font-semibold tracking-[0.25em] uppercase shrink-0"
          style={{ color: dark ? "#1a1a1a" : "#4b4b4b" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <h2
          className="font-black uppercase tracking-tighter leading-none select-none"
          style={{
            fontFamily: "var(--font-josefin)",
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            color: dark ? "#121212" : "#B7AB98",
          }}
        >
          {dark || !progress ? (
            service.label
          ) : (
            service.words.map((word, wi) =>
              word.isSpace ? (
                <span key={`sp-${wi}`}>&nbsp;</span>
              ) : (
                <span key={`w-${wi}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                  {word.chars.map((c) => {
                    const sweep = 0.15;
                    const scale = 1 / (1 + sweep);
                    const start = (c.globalIndex / TOTAL_CHARS) * scale;
                    const end = start + sweep * scale;
                    return (
                      <Char
                        key={c.globalIndex}
                        char={c.char}
                        progress={progress}
                        start={start}
                        end={end}
                      />
                    );
                  })}
                </span>
              )
            )
          )}
        </h2>
      </div>

      {/* Description — only shown in dark (active) layer */}
      {dark && isActive && (
        <motion.p
          key="desc"
          className="hidden md:block text-[#1a1a1a] text-sm md:text-base font-medium max-w-xs lg:max-w-sm leading-snug text-right shrink-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
        >
          {service.description}
        </motion.p>
      )}

      {/* Arrow */}
      <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={CLIP_TRANSITION}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={1.5}
            className="w-5 h-5 md:w-6 md:h-6"
            stroke={dark ? "#1a1a1a" : "#4b4b4b"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

function ServiceRow({
  service,
  index,
  isActive,
  onEnter,
  onLeave,
  progress,
}: {
  service: ProcessedService;
  index: number;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  progress: MotionValue<number>;
}) {
  return (
    <div
      className="relative w-full cursor-default overflow-hidden border-b border-white/[0.06]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {/* ── Base layer: dark bg + light text (always visible underneath) ── */}
      <div className="relative z-10">
        <RowContent
          service={service}
          index={index}
          dark={false}
          isActive={isActive}
          progress={progress}
        />
      </div>

      {/* ── Active layer: orange bg + dark text, clipped from center ── */}
      <motion.div
        className="absolute inset-0 z-20 bg-[#E8552D] overflow-hidden"
        initial={{ clipPath: CLIP_CLOSED }}
        animate={{ clipPath: isActive ? CLIP_OPEN : CLIP_CLOSED }}
        transition={CLIP_TRANSITION}
      >
        <RowContent
          service={service}
          index={index}
          dark={true}
          isActive={isActive}
        />
      </motion.div>
    </div>
  );
}
