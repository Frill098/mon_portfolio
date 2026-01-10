import * as fc from 'fast-check';
import { PersonalInfo, Project, Skill, SkillCategory, SocialLink, ContactMethod, NavItem, Statistic, Experience } from '@/lib/types';

// Générateur pour les chaînes non vides (sans espaces uniquement)
const nonWhitespaceStringGenerator = (minLength: number, maxLength: number) =>
  fc.string({ minLength, maxLength }).filter(s => s.trim().length > 0);

// Générateur pour les informations personnelles
export const personalInfoGenerator = fc.record({
  fullName: nonWhitespaceStringGenerator(2, 50),
  role: nonWhitespaceStringGenerator(5, 100),
  catchphrase: nonWhitespaceStringGenerator(10, 200),
  avatar: fc.webUrl(),
  cvUrl: fc.webUrl()
}) as fc.Arbitrary<PersonalInfo>;

// Générateur pour les liens de réseaux sociaux
export const socialLinkGenerator = fc.record({
  platform: fc.constantFrom('github', 'linkedin', 'twitter', 'discord', 'facebook'),
  url: fc.webUrl(),
  icon: fc.constant(() => null) // Mock icon component
}) as fc.Arbitrary<SocialLink>;

// Générateur pour les compétences
export const skillGenerator = fc.record({
  name: fc.constantFrom('React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'CSS', 'HTML', 'Git', 'Docker'),
  icon: fc.option(nonWhitespaceStringGenerator(1, 50)),
  level: fc.option(fc.constantFrom('beginner', 'intermediate', 'advanced', 'expert'))
}) as fc.Arbitrary<Skill>;

// Générateur pour les catégories de compétences
export const skillCategoryGenerator = fc.record({
  title: fc.constantFrom('Frontend', 'Backend', 'Languages', 'Tools', 'Databases', 'Frameworks'),
  skills: fc.array(skillGenerator, { minLength: 1, maxLength: 10 })
}) as fc.Arbitrary<SkillCategory>;

// Générateur pour les projets
export const projectGenerator = fc.record({
  id: nonWhitespaceStringGenerator(1, 10),
  title: nonWhitespaceStringGenerator(5, 100),
  description: nonWhitespaceStringGenerator(20, 500),
  technologies: fc.array(nonWhitespaceStringGenerator(2, 20), { minLength: 1, maxLength: 8 }),
  image: fc.webUrl(),
  githubUrl: fc.webUrl(),
  demoUrl: fc.option(fc.webUrl()),
  featured: fc.boolean()
}) as fc.Arbitrary<Project>;

// Générateur pour les méthodes de contact
export const contactMethodGenerator = fc.record({
  type: fc.constantFrom('email', 'whatsapp', 'linkedin', 'twitter', 'discord'),
  value: nonWhitespaceStringGenerator(5, 100),
  url: fc.webUrl(),
  icon: fc.constant(() => null) // Mock icon component
}) as fc.Arbitrary<ContactMethod>;

// Générateur pour les chaînes de caractères non vides
export const nonEmptyStringGenerator = fc.string({ minLength: 1 });

// Générateur pour les chaînes composées uniquement d'espaces
export const whitespaceOnlyGenerator = fc.string().filter(s => s.trim() === '' && s.length > 0);

// Générateur pour les listes de projets avec contrainte 3-6 éléments
export const projectListGenerator = fc.array(projectGenerator, { minLength: 3, maxLength: 6 });

// Générateur pour les listes de compétences par catégories
export const skillCategoriesGenerator = fc.array(skillCategoryGenerator, { minLength: 1, maxLength: 6 });

// Générateur pour les éléments de navigation
export const navItemGenerator = fc.record({
  id: nonWhitespaceStringGenerator(2, 20),
  label: nonWhitespaceStringGenerator(3, 30),
  href: nonWhitespaceStringGenerator(2, 50).map(s => `#${s}`)
}) as fc.Arbitrary<NavItem>;

// Générateur pour les listes de navigation
export const navigationListGenerator = fc.array(navItemGenerator, { minLength: 3, maxLength: 8 });

// Générateur pour les tailles d'écran (largeurs en pixels)
export const screenSizeGenerator = fc.record({
  width: fc.integer({ min: 320, max: 1920 }),
  height: fc.integer({ min: 568, max: 1080 }),
  isMobile: fc.boolean(),
  isTablet: fc.boolean(),
  isDesktop: fc.boolean()
});

// Générateur pour les IDs de sections valides
export const sectionIdGenerator = fc.constantFrom('hero', 'about', 'skills', 'projects', 'experience', 'contact');

// Générateur pour les expériences
export const experienceGenerator = fc.record({
  id: fc.string({ minLength: 1, maxLength: 20 }),
  title: nonWhitespaceStringGenerator(5, 50),
  organization: nonWhitespaceStringGenerator(3, 40),
  location: fc.option(nonWhitespaceStringGenerator(3, 30)),
  startDate: fc.date({ min: new Date('2015-01-01'), max: new Date('2024-12-31') }).map(d => d.toISOString().split('T')[0]),
  endDate: fc.option(fc.date({ min: new Date('2015-01-01'), max: new Date('2024-12-31') }).map(d => d.toISOString().split('T')[0])),
  description: nonWhitespaceStringGenerator(20, 200),
  type: fc.constantFrom('education', 'work', 'internship', 'project', 'certification'),
  skills: fc.option(fc.array(nonWhitespaceStringGenerator(2, 15), { minLength: 1, maxLength: 8 })),
  current: fc.option(fc.boolean())
});

// Générateur pour une liste d'expériences
export const experienceListGenerator = fc.array(experienceGenerator, { minLength: 1, maxLength: 10 });

// Générateur pour les paragraphes de biographie
export const biographyParagraphGenerator = nonWhitespaceStringGenerator(50, 300);

// Générateur pour les biographies avec nombre variable de paragraphes
export const biographyGenerator = fc.array(biographyParagraphGenerator, { minLength: 1, maxLength: 10 });

// Générateur pour les statistiques
export const statisticGenerator = fc.record({
  label: nonWhitespaceStringGenerator(5, 50),
  value: nonWhitespaceStringGenerator(1, 20),
  icon: fc.option(fc.constant(() => null)) // Mock icon component
});