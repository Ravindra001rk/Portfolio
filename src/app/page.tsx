import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Arsenal from "@/components/Arsenal";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen selection:bg-white/20">
      <Navbar />
      <Hero />
      <Projects />
      <Arsenal />
    </main>
  );
}
