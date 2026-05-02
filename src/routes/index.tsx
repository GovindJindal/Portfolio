import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader } from "@/components/portfolio/Loader";
import { MouseGlow } from "@/components/portfolio/MouseGlow";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Terminal } from "@/components/portfolio/Terminal";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Timeline } from "@/components/portfolio/Timeline";
import { Achievements } from "@/components/portfolio/Achievements";
import { Stats } from "@/components/portfolio/Stats";
import { SystemStatus } from "@/components/portfolio/SystemStatus";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useReveal();
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  return (
    <main className="relative min-h-screen ambient-bg">
      <Loader />
      <MouseGlow />
      <Nav />
      <Hero />
      <Terminal />
      <Projects />
      <Stats />
      <Skills />
      <Timeline />
      <Achievements />
      <SystemStatus />
      <Contact />
      <Footer />
    </main>
  );
}
