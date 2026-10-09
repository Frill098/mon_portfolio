export interface PersonalInfo {
  fullName: string;
  role: string;
  catchphrase: string;
  avatar: string;
  cvUrl: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Statistic {
  label: string;
  value: string;
}

export interface Skill {
  name: string;
  icon?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
}

export interface ContactMethod {
  type: 'email' | 'whatsapp' | 'linkedin' | 'twitter' | 'discord';
  value: string;
  url: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
  type: 'education' | 'work' | 'internship' | 'project' | 'certification';
  skills?: string[];
  current?: boolean;
}

export interface AppConfig {
  site: {
    name: string;
    description: string;
    url: string;
    author: string;
    email: string;
    ogImage: string;
  };
  navigation: NavItem[];
  seo: {
    keywords: string[];
    ogImage: string;
  };
}
