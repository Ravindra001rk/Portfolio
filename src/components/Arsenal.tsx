"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiTailwindcss, 
  SiMongodb, SiExpress, SiFramer, SiThreedotjs, SiGreensock, SiAngular 
} from "react-icons/si";
import { motion, useAnimationFrame, useMotionValue, wrap } from "framer-motion";

const arsenalTools = [
  { name: "React", Icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Next.js", Icon: SiNextdotjs, color: "text-white" },
  { name: "Node.js", Icon: SiNodedotjs, color: "text-[#339933]" },
  { name: "TypeScript", Icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "MongoDB", Icon: SiMongodb, color: "text-[#47A248]" },
  { name: "Express", Icon: SiExpress, color: "text-white" },
  { name: "Framer Motion", Icon: SiFramer, color: "text-[#0055FF]" },
  { name: "Three.js", Icon: SiThreedotjs, color: "text-white" },
  { name: "GSAP", Icon: SiGreensock, color: "text-[#88CE02]" },
  { name: "Angular", Icon: SiAngular, color: "text-[#DD0031]" },
];

export default function Arsenal() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  
  const x = useMotionValue(0);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Measure the exact width of one array instance
    const measureList = () => {
      if (rowRef.current) {
        // Since we map 3 arrays, total width / 3 is exactly one array
        setContentWidth(rowRef.current.scrollWidth / 3);
      }
    };
    
    measureList();
    window.addEventListener("resize", measureList);
    return () => window.removeEventListener("resize", measureList);
  }, []);

  // Frame-perfect auto-scrolling
  useAnimationFrame((time, delta) => {
    if (!contentWidth) return;

    // Only scroll if not hovered and not manually dragged
    if (!isHovered && !isDragging) {
      let moveBy = 0.5 * (delta / 10); // Smooth velocity relative to frame timing
      let currentX = x.get() - moveBy;
      
      // wrap seamlessly loops between [-contentWidth, 0]
      x.set(wrap(-contentWidth, 0, currentX));
    }
  });

  return (
    <section className="w-full bg-[#121212] py-24 md:py-32 flex flex-col items-center border-t border-white/5 z-20 relative overflow-hidden">
      <div className="w-full px-4 md:px-12 flex flex-col items-center md:items-start text-center md:text-left">
       <div className="max-w-7xl mx-auto w-full md:mx-0">
         <p className="text-zinc-500 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2">
          Technologies & Tools
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-16 tracking-tighter">
          My Arsenal
        </h2>
       </div>

        {/* Marquee Row */}
        <div 
          className="relative w-full overflow-hidden py-6 border-y border-white/5 bg-black/20 backdrop-blur-sm -mx-4 md:mx-0 md:rounded-3xl md:border-x cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Fade gradients */}
          <div className="absolute top-0 left-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none rounded-l-3xl" />
          <div className="absolute top-0 right-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none rounded-r-3xl" />

          {/* Draggable Motion Element */}
          <motion.div 
            ref={rowRef}
            drag="x"
            dragConstraints={{ right: 0, left: -contentWidth }} // Clamp drag within looping zone
            style={{ x }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onDrag={() => {
              // Smooth infinite wrap during extremely fast drags
              x.set(wrap(-contentWidth, 0, x.get()));
            }}
            className="flex w-max"
          >
            {/* Render 3 copies to ensure no visual break points during wrap (-width to 0) */}
            {[...arsenalTools, ...arsenalTools, ...arsenalTools].map((tool, index) => (
              <div
                key={index}
                className="group flex flex-grow-0 shrink-0 items-center justify-center gap-4 px-8 py-4 mx-3 md:mx-4 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 ease-out hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                <div className="w-6 h-6 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <tool.Icon className={`w-full h-full ${tool.color} drop-shadow-md pointer-events-none`} />
                </div>
                <span className="text-sm md:text-lg font-bold tracking-tight text-white/70 group-hover:text-white transition-colors pointer-events-none select-none">
                  {tool.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
