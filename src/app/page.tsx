"use client";

import { useState } from "react";
import PageLoader from "@/components/layout/PageLoader";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhatIBuild from "@/components/sections/WhatIBuild";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Journey from "@/components/sections/Journey";
import Statistics from "@/components/sections/Statistics";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";
import ScrollProgress from "@/components/animations/ScrollProgress";

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <>
      {!loaderComplete && (
        <PageLoader onComplete={() => setLoaderComplete(true)} />
      )}
      <SmoothScroll>
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen">
          <Hero />
          <About />
          <WhatIBuild />
          <Projects />
          <Skills />
          <Journey />
          <Statistics />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
