import * as fc from 'fast-check';
import { PersonalInfo, Project, Skill, SkillCategory, SocialLink, ContactMethod } from '@/lib/types';

// Générateur pour les informations personnelles
export const personalInfoGenerator = fc.record({
  fullName: fc.string({ minLength: 2, maxLength: 50 }),
  role: fc.string({ minLength: 5, maxLength: 100 }),
  catchphrase: fc.string({ minLength: 10, maxLength: 200 }),
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
  name: fc.string({ minLength: 2, maxLength: 30 }),
  icon: fc.option(fc.string({ minLength: 1, maxLength: 50 })),
  level: fc.option(fc.constantFrom('beginner', 'intermediate', 'advanced', 'expert'))
}) as fc.Arbitrary<Skill>;

// Générateur pour les catégories de compétences
export const skillCategoryGenerator = fc.record({
  title: fc.string({ minLength: 3, maxLength: 20 }),
  skills: fc.array(skillGenerator, { minLength: 1, maxLength: 10 })
}) as fc.Arbitrary<SkillCategory>;

// Générateur pour les projets
export const projectGenerator = fc.record({
  id: fc.string({ minLength: 1, maxLength: 10 }),
  title: fc.string({ minLength: 5, maxLength: 100 }),
  description: fc.string({ minLength: 20, maxLength: 500 }),
  technologies: fc.array(fc.string({ minLength: 2, maxLength: 20 }), { minLength: 1, maxLength: 8 }),
  image: fc.webUrl(),
  githubUrl: fc.webUrl(),
  demoUrl: fc.option(fc.webUrl()),
  featured: fc.boolean()
}) as fc.Arbitrary<Project>;

// Générateur pour les méthodes de contact
export const contactMethodGenerator = fc.record({
  type: fc.constantFrom('email', 'whatsapp', 'linkedin', 'twitter', 'discord'),
  value: fc.string({ minLength: 5, maxLength: 100 }),
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