import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { SectionHash } from "@/components/section-hash";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <main
      id="noi-dung"
      tabIndex={-1}
      className="flex flex-1 flex-col outline-none"
    >
      <SectionHash />
      <Hero />
      <About />
      <Education />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
