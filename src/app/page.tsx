import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Plane from "@/components/Plane";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import { Experience, Education, Leadership } from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import CallToAction from "@/components/sections/CallToAction";
import { ScrollProgress } from "@/components/motion-primitives/scroll-progress";

export default function Home() {
  return (
    <main className="flex-1">
      <ScrollProgress className="fixed z-[60] h-[2px] bg-rose" />
      <Nav />
      <Plane />
      <Hero />

      {/* the portfolio slides up over the landing like a card */}
      <div className="relative z-10 -mt-[45svh] overflow-hidden rounded-t-[2.5rem] bg-paper shadow-[0_-30px_60px_-30px_rgba(70,40,20,0.22)] sm:rounded-t-[3.5rem]">
        <div>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Leadership />
          <CallToAction />
          <Contact />
        </div>
      </div>
    </main>
  );
}
