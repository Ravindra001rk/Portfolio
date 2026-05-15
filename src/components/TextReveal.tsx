"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import SplitHeader from "@/components/SplitHeader";

// Segments: accent:true → orange highlight
const SEGMENTS = [
  { text: "I build ", accent: false },
  { text: "modern websites", accent: true },
  { text: " and", accent: false },
  { text: " powerful systems", accent: true },
  { text: " that help businesses", accent: false },
  { text: " work faster", accent: true },
  { text: ", manage things easily,", accent: false },
  { text: " and deliver better results.", accent: true },
];
type CharToken = { char: string; accent: boolean; globalIndex: number };
type WordToken = { chars: CharToken[]; isSpace: boolean };

// Build word-grouped tokens to prevent mid-word line breaks
function buildWords(totalChars: { count: number }) {
  const words: WordToken[] = [];
  let globalIndex = 0;

  for (const seg of SEGMENTS) {
    // Split each segment on spaces, preserving spaces as separate tokens
    const parts = seg.text.split(/( )/);
    for (const part of parts) {
      if (part === "") continue;
      if (part === " ") {
        words.push({
          isSpace: true,
          chars: [{ char: " ", accent: false, globalIndex: globalIndex++ }],
        });
      } else {
        words.push({
          isSpace: false,
          chars: part.split("").map((char) => ({
            char,
            accent: seg.accent,
            globalIndex: globalIndex++,
          })),
        });
      }
    }
  }

  totalChars.count = globalIndex;
  return words;
}

function Char({
  char,
  accent,
  progress,
  start,
  end,
}: {
  char: string;
  accent: boolean;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const dimColor = accent ? "#3a1508" : "#2a2a2a"; // #2a2a2a is --color-text-unlit
  const litColor = accent ? "#ff6b35" : "#9B9B8E"; // #ff6b35 is --color-accent, #9B9B8E is --color-text-muted
  const color = useTransform(progress, [start, end], [dimColor, litColor]);

  return (
    <motion.span style={{ color, willChange: "color" }}>{char}</motion.span>
  );
}

export default function TextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "center 0.25"],
  });

  const totalChars = useMemo(() => ({ count: 0 }), []);
  const words = useMemo(() => buildWords(totalChars), [totalChars]);
  const total = totalChars.count;

  // Sweep window — 15% of total chars in transition at once for smooth wave
  const sweep = 0.15;
  const scale = 1 / (1 + sweep);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-[#121212] py-18 md:py-24 border-t border-white/5"
    >
      <div className="max-w-8xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Label */}
        <div className="max-w-7xl mx-auto w-full md:mx-0">
          <p
            className="font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2"
            style={{ color: "var(--color-label)" }}
          >
            ABOUT ME
          </p>
          <SplitHeader
            text="Who I Am"
            className="text-5xl pb-16 md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
          />
        </div>

        {/* Highlight text — Josefin Sans (Avant Garde style) */}
        <p
          className="tracking-tight leading-[1.25] "
          style={{
            fontFamily: "var(--font-josefin)",
            fontWeight: 700,
            fontSize: "clamp(2.2rem, 4vw, 4.5rem)",
            wordBreak: "normal",
            overflowWrap: "normal",
          }}
        >
          {words.map((word, wi) =>
            word.isSpace ? (
              // Space between words — allows line break here only
              <span key={`sp-${wi}`}>&nbsp;</span>
            ) : (
              // Wrap each word in nowrap so it never breaks mid-character
              <span
                key={`w-${wi}`}
                style={{ display: "inline-block", whiteSpace: "nowrap" }}
              >
                {word.chars.map(({ char, accent, globalIndex }) => {
                  const rawStart = globalIndex / total;
                  const start = rawStart * scale;
                  const end = (rawStart + sweep) * scale;
                  return (
                    <Char
                      key={globalIndex}
                      char={char}
                      accent={accent}
                      progress={scrollYProgress}
                      start={start}
                      end={end}
                    />
                  );
                })}
              </span>
            ),
          )}
        </p>
      </div>
    </section>
  );
}
