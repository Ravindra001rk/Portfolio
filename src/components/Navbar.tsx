"use client";
import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Services", "Work", "About", "Experience", "Testimonials", "Contact"];

  return (
    <>
      <motion.nav
        
        className="fixed top-0 left-0 z-50 w-full z-50 px-6 py-4 md:px-8 md:py-6 flex justify-between items-center transition-all duration-300 "
      >
        {/* Left: Logo */}
        <div className="text-white font-black text-xl tracking-tighter cursor-pointer relative z-[60]">
          RAVINDRA.
        </div>

        {/* Center: Desktop Links */}
        <div className="hidden lg:flex gap-8 text-sm font-medium text-white/60 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all backdrop-blur-md border border-white/10">
            <FileText className="w-4 h-4" /> Resume
          </button>
          <a href="https://github.com" target="_blank" rel="noopener" className="text-white/60 hover:text-white transition-colors">
            <GithubIcon className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" className="text-white/60 hover:text-white transition-colors">
            <LinkedinIcon className="w-5 h-5" />
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
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="text-white text-3xl font-black tracking-tighter hover:text-zinc-400 transition-colors"
              >
                {link}
              </a>
            ))}
            <div className="flex gap-6 mt-8">
              <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold">
                <FileText className="w-4 h-4" /> Resume
              </button>
              <div className="flex items-center gap-4 px-4">
                <a href="https://github.com" target="_blank" rel="noopener" className="text-white hover:text-zinc-400"><GithubIcon className="w-6 h-6" /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener" className="text-white hover:text-zinc-400"><LinkedinIcon className="w-6 h-6" /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
