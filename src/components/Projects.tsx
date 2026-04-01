"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import {
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { projects } from "../data/projects";

// ── Utilities ──────────────────────────────────────────────────────────────
function SplitTitle({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const words = text.split(" ");

  return (
    <h2 ref={ref} className={`overflow-hidden ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: wi * 0.08,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

// Features and Stack removed as they are now in src/data/projects.tsx

// ── Main Component ─────────────────────────────────────────────────────────
export default function Projects() {
  const titleRef = useRef<HTMLDivElement>(null);

  // GSAP magnetic hover on the CTA button
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const onLeave = () =>
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="work"
      className="bg-[#121212] text-white relative z-20 overflow-hidden"
    >
      {/* ── Section Header ── */}
      <div ref={titleRef} className="px-6 md:px-16 lg:px-24 pt-32 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-4"
        >
          Selected Work
        </motion.p>
        <SplitTitle
          text="What I've Built"
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-orange-500"
        />
      </div>

      {/* ── Project Cards ── */}
      <div className="px-6 md:px-16 lg:px-24 pb-32 flex flex-col gap-16">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

            {/* ── Top Section: Info + Image ── */}
            <div className="relative flex flex-col lg:flex-row gap-0">
              {/* Left: Text */}
              <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs tracking-[0.2em] uppercase text-zinc-500">
                      {project.category}
                    </span>
                  </div>

                  <SplitTitle
                    text={project.title}
                    className="text-3xl md:text-4xl lg:text-5xl tracking-tighter text-zinc-300 leading-tight mb-6"
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-zinc-400 leading-relaxed text-base md:text-lg mb-8 max-w-lg"
                  >
                    {project.shortDesc}
                  </motion.p>

                  {/* Stack pills */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex flex-wrap gap-2 mb-10"
                  >
                    {project.tags.map((t, i) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-zinc-300 bg-white/5"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-full font-bold text-sm hover:bg-zinc-100 transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 border border-white/10 text-white/70 hover:text-white hover:border-white/30 px-6 py-3.5 rounded-full font-medium text-sm transition-all"
                      >
                        Live Site <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="w-full lg:w-[50%] min-h-[280px] lg:min-h-0 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-white/5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="block w-full h-full"
                >
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0d0d0d]/80 via-transparent to-transparent pointer-events-none" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
