"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, PenTool, Code2, TestTube2, Rocket } from "lucide-react";
import SplitScrollTitle from "./SplitScrollTitle";

const PROCESS_STEPS = [
  {
    title: "Plan",
    description:
      "Define the goal, core features, user flow, data needs, and the cleanest path to build.",
    Icon: ClipboardList,
  },
  {
    title: "Design",
    description:
      "Shape the layout, visual direction, and interaction details before jumping into code.",
    Icon: PenTool,
  },
  {
    title: "Build",
    description:
      "Turn the plan into working pages, APIs, database models, and reusable components.",
    Icon: Code2,
  },
  {
    title: "Test",
    description:
      "Check forms, edge cases, responsiveness, performance, and real user paths.",
    Icon: TestTube2,
  },
  {
    title: "Launch",
    description:
      "Deploy the project, review production behavior, and polish what real usage reveals.",
    Icon: Rocket,
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Process() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="process"
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#121212] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-[-220px] top-10 h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-8xl px-6 md:px-16 lg:px-24">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm"
              style={{ color: "var(--color-label)" }}
            >
              Process
            </motion.p>
            <SplitScrollTitle
              text="How I Build"
              className="font-black uppercase leading-none tracking-tighter text-5xl md:text-7xl lg:text-8xl"
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-josefin)",
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="max-w-xl text-base leading-relaxed md:text-lg lg:justify-self-end"
            style={{ color: "var(--color-text-muted)" }}
          >
            A practical workflow for turning an idea into a real, reliable web
            system without losing sight of speed, usability, and clean structure.
          </motion.p>
        </div>

        <div className="grid overflow-hidden border-y border-white/[0.06] lg:grid-cols-3">
          {PROCESS_STEPS.map(({ title, description, Icon }, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.button
                key={title}
                type="button"
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 0.65,
                  ease: EASE,
                  delay: index * 0.06,
                }}
                className="group relative min-h-[260px] overflow-hidden border-b border-white/[0.06] p-6 text-left outline-none last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <motion.span
                  className="absolute inset-x-0 top-0 h-full origin-bottom bg-[#ff6b35]"
                  initial={false}
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />

                <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors"
                      style={{
                        color: isActive
                          ? "var(--color-bg)"
                          : "var(--color-text-dim)",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
                      style={{
                        borderColor: isActive
                          ? "rgba(18,18,18,0.22)"
                          : "rgba(255,255,255,0.1)",
                        background: isActive
                          ? "rgba(18,18,18,0.08)"
                          : "rgba(255,255,255,0.03)",
                        color: isActive
                          ? "var(--color-bg)"
                          : "var(--color-accent)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <div>
                    <h3
                      className="mb-4 font-black uppercase leading-none tracking-tighter text-4xl transition-colors md:text-5xl"
                      style={{
                        color: isActive
                          ? "var(--color-bg)"
                          : "var(--color-text-primary)",
                        fontFamily: "var(--font-josefin)",
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-sm font-medium leading-relaxed transition-colors"
                      style={{
                        color: isActive
                          ? "rgba(18,18,18,0.78)"
                          : "var(--color-text-muted)",
                      }}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
