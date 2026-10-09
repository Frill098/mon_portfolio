import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Footer from "@/components/layout/Footer";

import { personalInfo, socialLinks, biography, aboutStats } from "@/data/personal";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { contactInvitation, contactMethods, contactFormConfig } from "@/data/contact";

// Lazy-load heavier sections
const Projects    = dynamic(() => import("@/components/sections/Projects"),    { ssr: true });
const Experience  = dynamic(() => import("@/components/sections/Experience"),  { ssr: true });
const Contact     = dynamic(() => import("@/components/sections/Contact"),     { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero personalInfo={personalInfo} socialLinks={socialLinks} />
      <About biography={biography} stats={aboutStats} personalInfo={personalInfo} />
      <Skills skillCategories={skillCategories} />
      <Projects projects={projects} />
      <Experience experiences={experiences} orderBy="chronological" />
      <Contact
        invitation={contactInvitation}
        contactMethods={contactMethods}
        formConfig={contactFormConfig}
      />
      <Footer />
    </main>
  );
}
