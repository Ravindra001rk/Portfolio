"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectCaseStudy({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-[#121212] min-h-screen text-white selection:bg-white/20">
      {/* ── Top Navigation ── */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference">
        <Link
          href="/#work"
          className="flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="font-black text-xl tracking-tighter">RAVINDRA.</div>
      </nav>

      {/* ── Parallax Hero ── */}
      <div
        ref={containerRef}
        className="relative h-[80vh] w-full overflow-hidden"
      >
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-[#121212]/70 backdrop-blur-md z-10" />
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-widest uppercase mb-6 text-zinc-300">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight mb-6">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">
              {project.shortDesc}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Project Details Section ── */}
      <section className="relative z-30 bg-[#121212] py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-b border-white/10 pb-16">
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-semibold">
                Client
              </p>
              <p className="font-medium text-lg">Kriti Sublimation</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-semibold">
                Role
              </p>
              <p className="font-medium text-lg">Lead Full-Stack</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-semibold">
                Timeline
              </p>
              <p className="font-medium text-lg">4 Weeks</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-semibold">
                Live link
              </p>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-lg text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Visit Site <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <p className="font-medium text-lg text-zinc-500">Offline</p>
              )}
            </div>
          </div>

          {/* Core Features */}
          <div className="mb-32">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-16">
              System Architecture & Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-black mb-6`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-12">
              Technology Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.stack.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                  <span className="text-zinc-500 text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-0">
                    {item.label}
                  </span>
                  <span className="font-medium text-zinc-200">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Next Project Footer ── */}
      <section className="py-32 px-6 flex flex-col items-center justify-center border-t border-white/10 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-6 font-semibold">
          What's Next
        </p>
        <Link
          href="/#work"
          className="text-5xl md:text-8xl font-black tracking-tighter hover:text-emerald-400 transition-colors duration-500"
        >
          View More Work
        </Link>
      </section>
    </main>
  );
}
