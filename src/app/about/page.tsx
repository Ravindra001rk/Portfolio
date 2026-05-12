"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Database,
  Gauge,
  Layers3,
  MapPin,
  Server,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const focusAreas = [
  {
    title: "Full-stack web apps",
    description:
      "Building complete systems with React, Next.js, Node.js, Express, MongoDB, and clean user flows.",
    Icon: Layers3,
  },
  {
    title: "Backend workflows",
    description:
      "Designing APIs, dashboards, authentication, file handling, status tracking, and admin operations.",
    Icon: Server,
  },
  {
    title: "Real business tools",
    description:
      "Creating systems for schools, offices, stores, admissions, ID cards, and content management.",
    Icon: Database,
  },
  {
    title: "Reliable interfaces",
    description:
      "Making pages responsive, fast, readable, and simple enough for real users to complete tasks.",
    Icon: Gauge,
  },
];

const stats = [
  { value: "5+", label: "Major Projects" },
  { value: "MERN", label: "Primary Stack" },
  { value: "Admin", label: "Dashboard Focus" },
  { value: "Nepal", label: "Based In" },
];

const timeline = [
  {
    year: "Now",
    title: "Building production-style systems",
    text: "Focused on practical MERN and Next.js applications with dashboards, forms, APIs, file uploads, and deployment.",
  },
  {
    year: "Recent",
    title: "School, e-commerce, and ID workflows",
    text: "Built systems for school management, bookstore commerce, ID card submissions, photo retrieval, and status tracking.",
  },
  {
    year: "Foundation",
    title: "Frontend and backend fundamentals",
    text: "Developed strong experience with React interfaces, Node APIs, MongoDB schemas, Tailwind styling, and responsive layouts.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#121212] text-white selection:bg-[#ff6b35] selection:text-black">
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/5 px-6 pb-20 pt-36 md:px-16 md:pb-28 md:pt-44 lg:px-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-[-240px] top-[-140px] h-[620px] w-[620px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm"
              style={{ color: "var(--color-label)" }}
            >
              About Me
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE }}
              className="font-black uppercase leading-none tracking-tighter text-6xl md:text-8xl lg:text-[8.5rem]"
              style={{ fontFamily: "var(--font-josefin)" }}
            >
              Ravindra
              <span className="block text-[#ff6b35]">Kushwaha.</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
            className="max-w-xl lg:justify-self-end"
          >
            <div className="mb-6 flex items-center gap-3 text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
              <MapPin className="h-4 w-4 text-[#ff6b35]" />
              Birgunj, Nepal
            </div>
            <p className="text-lg leading-relaxed md:text-xl" style={{ color: "var(--color-text-muted)" }}>
              I am a backend-focused MERN developer who builds practical web
              systems: admin panels, school portals, application workflows,
              e-commerce tools, and content-managed websites.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/works"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-zinc-200"
              >
                View Work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition-colors hover:border-white/35 hover:text-white"
                style={{ color: "var(--color-text-muted)" }}
              >
                Contact Me
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/5 px-6 py-16 md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px overflow-hidden border-y border-white/[0.06] bg-white/[0.06] lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE, delay: index * 0.05 }}
              className="bg-[#121212] p-6 md:p-8"
            >
              <p className="text-4xl font-black tracking-tighter text-[#ff6b35] md:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--color-label)" }}>
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 md:px-16 md:py-32 lg:px-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--color-label)" }}>
              What I Focus On
            </p>
            <h2
              className="font-black uppercase leading-none tracking-tighter text-5xl md:text-7xl"
              style={{ fontFamily: "var(--font-josefin)", color: "var(--color-text-primary)" }}
            >
              Useful systems, clean structure, real workflows.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden border-y border-white/[0.06] bg-white/[0.06] md:grid-cols-2">
            {focusAreas.map(({ title, description, Icon }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.65, ease: EASE, delay: index * 0.06 }}
                className="group bg-[#121212] p-7 transition-colors hover:bg-[#ff6b35]"
              >
                <div className="mb-12 flex items-start justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/25 transition-colors group-hover:text-black/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[#ff6b35] transition-colors group-hover:border-black/20 group-hover:text-black">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3
                  className="mb-4 font-black uppercase leading-none tracking-tighter text-3xl text-[var(--color-text-primary)] transition-colors group-hover:text-black md:text-4xl"
                  style={{ fontFamily: "var(--font-josefin)" }}
                >
                  {title}
                </h3>
                <p className="max-w-md text-sm font-medium leading-relaxed text-[var(--color-text-muted)] transition-colors group-hover:text-black/75">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-24 md:px-16 md:py-32 lg:px-24">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--color-label)" }}>
              Working Style
            </p>
            <h2
              className="font-black uppercase leading-none tracking-tighter text-5xl md:text-7xl"
              style={{ fontFamily: "var(--font-josefin)" }}
            >
              Practical first.
              <span className="block text-[#ff6b35]">Polished after.</span>
            </h2>
          </div>

          <div className="grid gap-6">
            {[
              ["Clear scope", "I start by understanding the actual task, users, data, and success criteria before building screens."],
              ["Simple architecture", "I prefer direct, understandable structures that are easy to maintain and extend."],
              ["Usable details", "Forms, validation, loading states, empty states, and mobile layouts get attention because real users depend on them."],
              ["Deployment mindset", "I think about hosting, environment variables, assets, APIs, and production behavior early."],
            ].map(([title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
                className="border-b border-white/[0.06] pb-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#ff6b35]" />
                  <h3 className="text-xl font-bold tracking-tight">{title}</h3>
                </div>
                <p className="max-w-2xl leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-24 md:px-16 md:py-32 lg:px-24">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--color-label)" }}>
            Journey
          </p>
          <div className="grid gap-8 lg:grid-cols-3">
            {timeline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
                className="border-t border-white/[0.08] pt-6"
              >
                <p className="mb-6 text-sm font-black uppercase tracking-[0.22em] text-[#ff6b35]">
                  {item.year}
                </p>
                <h3 className="mb-4 text-2xl font-bold tracking-tight">{item.title}</h3>
                <p className="leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Code2 className="mb-5 h-9 w-9 text-[#ff6b35]" />
            <h2 className="max-w-3xl text-3xl font-black uppercase tracking-tighter md:text-5xl" style={{ fontFamily: "var(--font-josefin)" }}>
              Need a system that is built for real use?
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-3 rounded-full border-2 border-[#ff6b35] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#ff6b35] transition-colors hover:bg-[#ff6b35] hover:text-black"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      <Contact />
    </main>
  );
}
