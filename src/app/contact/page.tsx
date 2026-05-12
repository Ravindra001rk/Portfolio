"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const channels = [
  {
    label: "Email",
    value: "ravindrakushwaha2k20@gmail.com",
    href: "mailto:ravindrakushwaha2k20@gmail.com",
    Icon: Mail,
  },
  {
    label: "Phone",
    value: "+977 9855075137",
    href: "tel:+9779855075137",
    Icon: Phone,
  },
  {
    label: "Location",
    value: "Birgunj, Nepal",
    href: "https://maps.google.com/?q=Birgunj,Nepal",
    Icon: MapPin,
  },
  {
    label: "Response",
    value: "Usually within a hour",
    href: "#message",
    Icon: Clock3,
  },
];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "GitHub",
    value: "github.com/Ravindra001rk",
    href: "https://github.com/Ravindra001rk",
    Icon: GithubIcon,
  },
  {
    label: "Instagram",
    value: "@_ravindrakushwaha",
    href: "https://www.instagram.com/_ravindrakushwaha/",
    Icon: InstagramIcon,
  },
];

const goodFits = [
  "Full-stack MERN applications",
  "Admin panels and dashboards",
  "School, office, and admission workflows",
  "E-commerce and content-managed websites",
  "Bug fixing, polish, and performance improvements",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#121212] text-white selection:bg-[#ff6b35] selection:text-black">
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/5 px-6 pb-20 pt-36 md:px-16 md:pb-28 md:pt-44 lg:px-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute left-[-220px] top-0 h-[580px] w-[580px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,107,53,0.11) 0%, transparent 70%)",
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
              Contact
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE }}
              className="font-black uppercase leading-none tracking-tighter text-6xl md:text-8xl lg:text-[8.5rem]"
              style={{ fontFamily: "var(--font-josefin)" }}
            >
              Let&apos;s
              <span className="block text-[#ff6b35]">Talk.</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
            className="max-w-xl lg:justify-self-end"
          >
            <MessageSquare className="mb-6 h-9 w-9 text-[#ff6b35]" />
            <p className="text-lg leading-relaxed md:text-xl" style={{ color: "var(--color-text-muted)" }}>
              Tell me what you want to build, improve, or fix. Share the goal,
              timeline, current problem, and any links or screenshots that help
              explain the work.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-16 md:py-28 lg:px-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--color-label)" }}>
              Direct Channels
            </p>
            <div className="grid gap-px overflow-hidden border-y border-white/[0.06] bg-white/[0.06] md:grid-cols-2">
              {channels.map(({ label, value, href, Icon }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label === "Location" ? "_blank" : undefined}
                  rel={label === "Location" ? "noreferrer" : undefined}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
                  className="group bg-[#121212] p-6 transition-colors hover:bg-[#ff6b35] md:p-8"
                >
                  <div className="mb-10 flex items-start justify-between gap-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-label)] transition-colors group-hover:text-black/55">
                      {label}
                    </span>
                    <Icon className="h-5 w-5 text-[#ff6b35] transition-colors group-hover:text-black" />
                  </div>
                  <p className="break-words text-lg font-bold tracking-tight transition-colors group-hover:text-black">
                    {value}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--color-label)" }}>
              Good Fit
            </p>
            <div className="border-y border-white/[0.06]">
              {goodFits.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: EASE, delay: index * 0.05 }}
                  className="flex items-center justify-between gap-6 border-b border-white/[0.06] py-5 last:border-b-0"
                >
                  <span className="text-base font-medium" style={{ color: "var(--color-text-muted)" }}>
                    {item}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#ff6b35]" />
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--color-label)" }}>
                Social
              </p>
              <div className="flex flex-col gap-4">
                {socialLinks.map(({ label, value, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-6 border-b border-white/[0.06] pb-4"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-[#ff6b35]" />
                      <span>
                        <span className="block text-sm font-bold text-white">{label}</span>
                        <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>{value}</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/35 transition-colors group-hover:text-[#ff6b35]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="message">
        <Contact />
      </section>
    </main>
  );
}
