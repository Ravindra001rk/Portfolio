"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Grid2X2, User, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const bottomTabs = [
  { label: "Home", href: "/", icon: Home },
  { label: "Work", href: "/works", icon: Grid2X2 },
  { label: "About", href: "/about", icon: User },
  { label: "Contact", href: "/contact", icon: MessageCircle },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  // Sync active tab with pathname, but also allow immediate local update
  useEffect(() => {
    const idx = bottomTabs.findIndex((t) => 
      t.href === "/" ? pathname === "/" : pathname.startsWith(t.href)
    );
    if (idx !== -1) setActiveTab(idx);
  }, [pathname]);

  // Faster pill movement
  useEffect(() => {
    const updatePill = () => {
      const el = itemRefs.current[activeTab];
      const container = navRef.current;
      if (!el || !container) return;
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setPillStyle({
        left: elRect.left - containerRect.left,
        top: elRect.top - containerRect.top,
        width: elRect.width,
        height: elRect.height,
      });
    };

    updatePill();
    // Re-check after a frame to ensure layout has settled
    const raf = requestAnimationFrame(updatePill);
    return () => cancelAnimationFrame(raf);
  }, [activeTab]);

  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pb-[env(safe-area-inset-bottom)]">
      <div
        ref={navRef}
        className="flex items-center p-1.5 rounded-full gap-0 relative"
        style={{
          background: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
        }}
      >
        <motion.div
          className="absolute rounded-full bg-white pointer-events-none"
          animate={pillStyle}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />

        {bottomTabs.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = activeTab === i;
          return (
            <Link href={tab.href} key={tab.label}>
              <button
                ref={(el) => { itemRefs.current[i] = el; }}
                onClick={() => setActiveTab(i)}
                className={`relative z-10 flex items-center gap-2 px-3 py-2.5 rounded-full transition-colors duration-200 whitespace-nowrap ${
                  isActive ? "text-black" : "text-white/70"
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-black" : "text-white/70"}`}
                  strokeWidth={2.2}
                />
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                  transition={{ duration: 0.18 }}
                  className="text-sm font-semibold pl-1"
                >
                  {isActive ? tab.label : ""}
                </motion.span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
