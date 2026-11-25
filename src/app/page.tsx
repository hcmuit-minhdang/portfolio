import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <main
      id="noi-dung"
      tabIndex={-1}
      className="flex flex-1 flex-col outline-none"
    >
      <Hero />
      <About />
      <Projects />
      <Skills />
    </main>
  );
}
