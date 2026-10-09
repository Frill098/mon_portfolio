import { ContactMethod } from '@/lib/types';

export const contactInvitation = {
  title: "Travaillons ensemble",
  message:
    "Tu as un projet web, une idée SaaS ou une équipe à renforcer ? Je suis disponible pour des missions freelance, des collaborations à distance ou des opportunités en CDI.",
  callToAction: "Contacte-moi directement via l'une de ces plateformes :",
};

export const contactMethods: ContactMethod[] = [
  {
    type: 'email',
    value: 'dagadeogratias@gmail.com',
    url: 'mailto:dagadeogratias@gmail.com',
  },
  {
    type: 'whatsapp',
    value: '+229 01 40 52 91 37',
    url: 'https://wa.me/22901405291370',
  },
  {
    type: 'linkedin',
    value: 'linkedin.com/in/déo-daga',
    url: 'https://www.linkedin.com/in/d%C3%A9o-daga-837266378/',
  },
  {
    type: 'discord',
    value: '@kiritox_05',
    url: 'https://discord.com/users/kiritox_05',
  },
];

export const contactFormConfig = {
  enabled: true,
  fields: {
    name: {
      label: 'Nom complet',
      placeholder: 'Votre nom et prénom',
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      label: 'Email',
      placeholder: 'votre.email@exemple.com',
      required: true,
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+',
    },
    subject: {
      label: 'Sujet',
      placeholder: 'Objet de votre message',
      required: true,
      minLength: 5,
      maxLength: 200,
    },
    message: {
      label: 'Message',
      placeholder: 'Décrivez votre projet ou votre demande…',
      required: true,
      minLength: 20,
      maxLength: 1000,
    },
  },
  submitText: 'Envoyer le message',
  successMessage: 'Message envoyé ! Je vous répondrai dans les plus brefs délais.',
  errorMessage: 'Une erreur est survenue. Veuillez réessayer ou me contacter directement.',
};
