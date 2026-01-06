'use client';

import ThreeBackground from "@/components/canvas/ThreeBackground";
import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

import HalftoneWave from "@/components/ui/HalftoneWave";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Fixed Background */}
        <ThreeBackground />
        <HalftoneWave />

        {/* UI Layer */}
        <div className="relative z-10 w-full">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
