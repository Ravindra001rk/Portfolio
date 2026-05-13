"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const lastScrollY = useRef(0);
  const navLinks = [
    { label: "Works", href: "/works" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      lastScrollY.current = y;
    };
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isMobile = windowWidth > 0 && windowWidth < 640;
  // Limit how much it can shrink on mobile (e.g., max 20px inset on phones)
  const maxInset = isMobile ? 80 : 280;
  const multiplier = isMobile ? 0.45 : 1.1;
  const safeMaxInset = Math.min(maxInset, Math.max((windowWidth - 200) / 2, 16));
  const inset = Math.min(scrollY * multiplier, safeMaxInset);

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        className="fixed top-4 z-50 backdrop-blur-[18px] bg-black/10 border border-white/10 shadow-lg"
        animate={{
          left: inset,
          right: inset,
          borderRadius: Math.min(scrollY * 0.15, 30),
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? "none" : "auto",
          y: isOpen ? -20 : 0,
        }}
        transition={{ 
          duration: isOpen ? 0.2 : 0, 
          ease: isOpen ? "easeOut" : "linear" 
        }}
      >
        <div className="flex justify-between items-center px-6 lg:px-10 py-3.5">
          <Link href="/">
            <div className="font-black text-[17px] tracking-tighter cursor-pointer relative z-[60] text-white">
              RAVINDRA.
            </div>
          </Link>

          <div className="hidden lg:flex gap-8 text-[13px] font-medium absolute left-1/2 -translate-x-1/2 text-white/70">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className={`relative hover:text-white transition-colors py-1 ${isActive ? "text-white" : ""}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#ff6b35] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <a
            href="https://wa.me/9779855075137"
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden lg:inline-flex items-center gap-3 px-6 py-2.5 rounded-full font-bold text-[13px] border-2 border-[#ff6b35] text-[#ff6b35] overflow-hidden relative shadow-[0_0_20px_rgba(255,107,53,0.15)] hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] transition-shadow duration-300"
          >
            <div className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0 bg-[#ff6b35]" aria-hidden />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Let&apos;s talk</span>
            <span className="relative z-10 text-base font-black group-hover:text-black transition-all duration-300 group-hover:translate-x-1">→</span>
          </a>

          <button className="lg:hidden relative z-[60] text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
              <Link key={link.label} href={link.href} onClick={() => setIsOpen(false)}
                className="text-3xl font-black tracking-tighter text-white transition-colors hover:text-[#ff6b35]">
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/9779855075137"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-sm border-2 border-[#ff6b35] text-[#ff6b35] overflow-hidden relative transition-all duration-300 mt-4"
              onClick={() => setIsOpen(false)}
            >
              <div className="absolute inset-0 bg-[#ff6b35] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" aria-hidden />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Let&apos;s talk</span>
              <span className="relative z-10 text-lg font-black group-hover:text-black transition-all duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Toggle Button - Floating when drawer open */}
      <button 
        className={`lg:hidden fixed top-8 right-8 z-[70] transition-colors duration-300 ${isOpen ? "text-white" : "hidden"}`} 
        onClick={() => setIsOpen(false)}
      >
        <X className="w-8 h-8" />
      </button>
    </>
  );
}