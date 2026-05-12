"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const navLinks = [
    { label: "Works", href: "/works" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      const pastThreshold = currentScrollY > 80;

      setIsHidden(pastThreshold && scrollingDown && !isOpen);
      if (currentScrollY <= 10) setIsHidden(false);

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setIsHidden(false);
  }, [isOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 z-50 w-full px-6 py-4 md:px-8 md:py-6 flex justify-between items-center bg-black/10 backdrop-blur-[10px] border-b border-white/5"
        animate={{ y: isHidden ? "-110%" : 0 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Left: Logo */}
        <Link href="/">
          <div
            className="font-black text-xl tracking-tighter cursor-pointer relative z-[60]"
            style={{ color: "var(--color-text-primary)" }}
          >
            RAVINDRA.
          </div>
        </Link>

        {/* Center: Desktop Links */}
        <div
          className="hidden lg:flex gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2"
          style={{ color: "var(--color-text-muted)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="https://github.com/Ravindra001rk"
            target="_blank"
            rel="noopener"
            className="transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/_ravindrakushwaha/"
            target="_blank"
            rel="noopener"
            className="transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}

        <button
          className="lg:hidden text-white relative z-[60]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#121212]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-black tracking-tighter transition-colors"
                style={{ color: "var(--color-text-primary)" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-6 mt-8">
              <div className="flex items-center gap-4 px-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener"
                  className="transition-colors"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  <GithubIcon className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener"
                  className="transition-colors"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  <InstagramIcon className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
