import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Publications } from "@/components/sections/publications";
import { Skills } from "@/components/sections/skills";
import { JsonLd } from "@/components/ui/json-ld";
import { publicationsJsonLd } from "@/lib/jsonld";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Publications />
      <EducationSection />
      <Contact />
      <JsonLd data={publicationsJsonLd()} />
    </main>
  );
}
