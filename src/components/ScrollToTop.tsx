"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      // Show when scrolled past 500px or approximately one viewport height
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/40 hover:bg-white text-white hover:text-black backdrop-blur-lg border border-white/10 hover:border-white transition-colors duration-300 overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
          aria-label="Scroll to top"
        >
          {/* Subtle inner glow effect */}
          <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 ease-out" />
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6 relative z-10 transition-transform duration-300 group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
