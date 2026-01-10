import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import ExperienceSection from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

// Data imports
import { personalInfo, socialLinks, biography, aboutStats } from '@/data/personal';
import { skillCategories } from '@/data/skills';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { contactInvitation, contactMethods, contactFormConfig } from '@/data/contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <Hero personalInfo={personalInfo} socialLinks={socialLinks} />

      {/* About Section */}
      <About biography={biography} stats={aboutStats} />

      {/* Skills Section */}
      <Skills skillCategories={skillCategories} />

      {/* Projects Section */}
      <Projects projects={projects} />

      {/* Experience Section */}
      <ExperienceSection experiences={experiences} orderBy="chronological" />

      {/* Contact Section */}
      <Contact 
        invitation={contactInvitation}
        contactMethods={contactMethods}
        formConfig={contactFormConfig}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}