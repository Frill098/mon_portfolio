// Types pour les données personnelles
export interface PersonalInfo {
  fullName: string;
  role: string;
  catchphrase: string;
  avatar: string;
  cvUrl: string;
}

// Types pour les liens de réseaux sociaux
export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType;
}

// Types pour les statistiques
export interface Statistic {
  label: string;
  value: string;
  icon?: React.ComponentType;
}

// Types pour les compétences
export interface Skill {
  name: string;
  icon?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

// Types pour les projets
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

// Types pour les méthodes de contact
export interface ContactMethod {
  type: 'email' | 'whatsapp' | 'linkedin' | 'twitter' | 'discord';
  value: string;
  url: string;
  icon: React.ComponentType;
}

// Types pour la navigation
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

// Types pour la configuration du thème
export interface ThemeConfig {
  defaultTheme: 'dark' | 'light' | 'system';
  enableSystemTheme: boolean;
  storageKey: string;
}

// Types pour la configuration de l'application
export interface AppConfig {
  site: {
    name: string;
    description: string;
    url: string;
    author: string;
  };
  navigation: NavItem[];
  social: SocialLink[];
  seo: {
    keywords: string[];
    ogImage: string;
  };
}