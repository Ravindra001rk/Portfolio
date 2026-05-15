"use client";
import React, { useRef, useMemo, useState } from "react";
import Contact from "@/components/Contact";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { motion, useInView } from "framer-motion";

function SplitTitle({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={`overflow-hidden ${className}`} style={style}>
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

export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const groups = new Set<string>();
    projects.forEach((p) => {
      // prefer explicit categoryGroup, fallback to category string
      if (p.categoryGroup) groups.add(p.categoryGroup);
      else if (p.category) groups.add(p.category);
    });
    return ["All", ...Array.from(groups)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter(
      (p) => (p.categoryGroup || p.category) === activeCategory,
    );
  }, [activeCategory]);

  return (
    <main className="bg-[#121212] min-h-screen text-white selection:bg-[#ff6b35] selection:text-black">
      {/* Hero Section for Works */}
      <section className="pt-40 pb-20 px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto relative z-20">
        <SplitTitle
          text="All Works"
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
          style={{ color: "#ff6b35" }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed"
        >
          A comprehensive collection of my projects, ranging from robust
          full-stack applications to dynamic frontend experiences.
        </motion.p>
      </section>

      {/* Filter bar + Projects Grid: 2 columns on PC */}
      <section className="px-6 md:px-16 lg:px-24 pb-32 max-w-[1400px] mx-auto relative z-20">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat
                  ? "bg-[#ff6b35] text-black border-[#ff6b35]"
                  : "bg-white/5 text-zinc-300 border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: (index % 2) * 0.1,
              }}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden flex flex-col h-full"
            >
              {/* Top: Image */}
              <div className="w-full aspect-video relative overflow-hidden border-b border-white/5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="block w-full h-full"
                  prefetch={true}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-[#0d0d0d]/20 to-transparent pointer-events-none" />
                </Link>
              </div>

              {/* Bottom: Info */}
              <div className="p-8 md:p-10 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs tracking-[0.2em] uppercase text-zinc-500">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-3xl font-bold tracking-tighter leading-tight mb-4 text-white group-hover:text-[#ff6b35] transition-colors">
                  {project.title}
                </h3>

                <p className="leading-relaxed text-sm md:text-base mb-8 text-zinc-400 flex-1">
                  {project.shortDesc}
                </p>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4 mt-auto">
                  <Link
                    href={`/projects/${project.slug}`}
                    prefetch={true}
                    className="group/btn flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors"
                  >
                    <span>View Project</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 border border-white/10 hover:border-white/30 px-5 py-2.5 rounded-full font-medium text-sm transition-all text-zinc-400 hover:text-white"
                    >
                      Live Site <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}
