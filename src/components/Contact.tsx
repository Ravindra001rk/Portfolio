"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  Transition,
} from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Send,
  CheckCircle2,
} from "lucide-react";

// ── Replace with your real Formspree form ID ─────────────────────────────────
// 1. Go to https://formspree.io → create free account → new form
// 2. Copy the form endpoint ID (e.g. "xpwzabcd") and paste it below
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgperqn";

// ── Shared cubic-bezier easing ────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Contact details ───────────────────────────────────────────────────────────
const INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "ravindrakushwaha2k20@gmail.com",
    href: "mailto:ravindrakushwaha2k20@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977 9855075137",
    href: "tel:+9779855075137",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Birgunj, Nepal",
    href: "https://maps.google.com/?q=Birgunj,Nepal",
  },
];

const titleParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2,
    },
  },
};

const titleChar = {
  hidden: { opacity: 0, y: 80, rotateX: 45 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.1, ease: EASE },
  },
};

function SplitText({ text, accent }: { text: string; accent?: boolean }) {
  return (
    <span className="inline-flex">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={titleChar}
          className="inline-block origin-bottom"
          style={accent ? { color: "#ff6b35" } : {}}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// ── Inline GitHub SVG (lucide-react has no Github export) ────────────────────
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

const SOCIALS = [
  { name: "GitHub", href: "https://github.com/Ravindra001rk", icon: GithubIcon },
  { name: "Instagram", href: "https://www.instagram.com/_ravindrakushwaha/", icon: InstagramIcon },
  { name: "Facebook", href: "https://www.facebook.com/ravindra9949", icon: FacebookIcon },
];

// ── Animated label wrapper ────────────────────────────────────────────────────
function Field({
  label,
  children,
  delay,
}: {
  label: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      className="flex flex-col gap-1 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE, delay } as Transition}
    >
      <label
        className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/70"
      >
        {label}
      </label>
      {children}
    </motion.div>
  );
}

// ── Shared input/textarea base class ─────────────────────────────────────────
const inputBase =
  "w-full bg-transparent border-b border-white/40 py-3 text-lg text-white outline-none transition-all duration-300 placeholder:text-white/50 hover:border-white/70 focus:border-transparent resize-none";

// ── Main export ───────────────────────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        formRef.current?.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const focusStyle = (name: string) =>
    focused === name
      ? {
          borderBottomColor: "#ff6b35",
          boxShadow: "0 1px 0 0 #ff6b35",
        }
      : {};

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#0e0e0e] overflow-hidden border-t border-white/5"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-60 -left-40 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-16 lg:px-24">
        {/* ── Section Heading ─────────────────────────────────────────────── */}
        <div className="pt-24 md:pt-36 pb-12 md:pb-20 perspective-[1000px]">
          <motion.h2
            variants={titleParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-6xl md:text-8xl lg:text-[8rem] font-black uppercase tracking-tighter leading-none flex flex-wrap"
            style={{ fontFamily: "var(--font-josefin)" }}
          >
            <SplitText text="Get In " />
            <SplitText text="Touch." accent />
          </motion.h2>
        </div>

        {/* ── Two-column: Info + Form ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-12 lg:gap-20 pb-24 md:pb-36">
          {/* Left — Info */}
          <div className="flex flex-col gap-10">
            <motion.p
              className="text-base md:text-lg leading-relaxed max-w-sm"
              style={{ color: "var(--color-text-muted)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                { duration: 0.8, ease: EASE, delay: 0.1 } as Transition
              }
            >
              Have a project in mind or just want to say hi? My inbox is always
              open — I&apos;ll get back to you within an hour.
            </motion.p>

            <div className="flex flex-col gap-6">
              {INFO.map(({ icon: Icon, label, value, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label === "Location" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 w-fit"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                  transition={
                    {
                      duration: 0.6,
                      ease: EASE,
                      delay: 0.15 + i * 0.08,
                    } as Transition
                  }
                >
                  <div
                    className="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/25 transition-all"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: "#ff6b35" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-0.5"
                      style={{ color: "var(--color-label)" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm font-medium group-hover:text-white transition-colors"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 pt-1">
              {SOCIALS.map(({ name, href, icon: SocialIcon }, i) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 w-fit text-sm font-medium transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                  transition={
                    { duration: 0.6, ease: EASE, delay: 0.4 + i * 0.1 } as Transition
                  }
                >
                  <div className="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center group-hover:border-white/25 group-hover:bg-white/5 transition-all">
                    <SocialIcon className="w-4 h-4" />
                  </div>
                  <span className="group-hover:text-white transition-colors">
                    {name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 } as Transition}
          >
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                /* Success */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: EASE } as Transition}
                  className="min-h-[480px] flex flex-col items-start justify-center gap-6 w-full pt-2"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 18,
                      delay: 0.2,
                    }}
                  >
                    <CheckCircle2
                      className="w-12 h-12"
                      style={{ color: "#ff6b35" }}
                    />
                  </motion.div>
                  <div>
                    <h3
                      className="text-2xl font-black tracking-tight mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Message Sent!
                    </h3>
                    <p
                      className="text-sm max-w-xs mx-auto"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Thanks for reaching out. I&apos;ll get back to you within
                      a hour.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-xs font-semibold tracking-[0.15em] uppercase hover:text-white transition-colors"
                    style={{ color: "var(--color-label)" }}
                  >
                    Send another →
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-10 w-full pt-2"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <Field label="Your Name" delay={0.25}>
                      <input
                        name="name"
                        required
                        placeholder="Your Name"
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        className={inputBase}
                        style={{
                          color: "var(--color-text-primary)",
                          ...focusStyle("name"),
                        }}
                      />
                    </Field>
                    <Field label="Email Address" delay={0.3}>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className={inputBase}
                        style={{
                          color: "var(--color-text-primary)",
                          ...focusStyle("email"),
                        }}
                      />
                    </Field>
                  </div>

                  <Field label="Subject" delay={0.35}>
                    <input
                      name="subject"
                      required
                      placeholder="Project collaboration, freelance work…"
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                      className={inputBase}
                      style={{
                        color: "var(--color-text-primary)",
                        ...focusStyle("subject"),
                      }}
                    />
                  </Field>

                  <Field label="Message" delay={0.4}>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project, timeline, or just say hello…"
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={inputBase}
                      style={{
                        color: "var(--color-text-primary)",
                        ...focusStyle("message"),
                      }}
                    />
                  </Field>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-red-400"
                      >
                        Something went wrong. Please email me directly at
                        ravindrakushwaha2k20@gmail.com
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative mt-6 flex items-center justify-center gap-3 rounded-full px-10 py-5 font-bold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed w-fit"
                    style={{ background: "#ff6b35" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={
                      { duration: 0.6, ease: EASE, delay: 0.45 } as Transition
                    }
                  >
                    {/* Shimmer sweep */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />

                    <AnimatePresence mode="wait">
                      {status === "sending" ? (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <svg
                            className="w-4 h-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                            />
                          </svg>
                          Sending…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <div className="border-t border-white/[0.06]" />
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "var(--color-label)" }}>
            © {new Date().getFullYear()} Ravindra Kushwaha · All rights
            reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
