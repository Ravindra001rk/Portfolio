import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Arsenal from "@/components/Arsenal";
import TextReveal from "@/components/TextReveal";
import WhatIDo from "@/components/WhatIDo";
import Contact from "@/components/Contact";
import Process from "@/components/Process";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen selection:bg-white/20">
      <Navbar />
      <Hero />
      <Projects />
      <Arsenal />
      <TextReveal />
      <Process />
      <WhatIDo />
      <Contact />
    </main>
  );
}
