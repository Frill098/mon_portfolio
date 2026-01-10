import { ContactMethod } from '@/lib/types';

// Message d'invitation pour les collaborations (Exigence 6.1)
export const contactInvitation = {
  title: "Travaillons Ensemble",
  message: "Vous avez un projet en tête ? Une idée à concrétiser ? Je serais ravi de discuter avec vous et de voir comment nous pouvons collaborer pour donner vie à vos ambitions.",
  callToAction: "N'hésitez pas à me contacter via l'une des plateformes ci-dessous :"
};

// Méthodes de contact directes (Exigence 6.2)
export const contactMethods: ContactMethod[] = [
  {
    type: 'whatsapp',
    value: '+33 6 12 34 56 78',
    url: 'https://wa.me/33612345678'
  },
  {
    type: 'linkedin',
    value: 'linkedin.com/in/votre-profil',
    url: 'https://linkedin.com/in/votre-profil'
  },
  {
    type: 'twitter',
    value: '@votre_handle',
    url: 'https://twitter.com/votre_handle'
  },
  {
    type: 'discord',
    value: 'votre_username#1234',
    url: 'https://discord.com/users/votre_user_id'
  },
  {
    type: 'email',
    value: 'contact@votre-email.com',
    url: 'mailto:contact@votre-email.com'
  }
];

// Configuration pour le formulaire de contact (Exigence 6.3)
export const contactFormConfig = {
  enabled: true,
  fields: {
    name: {
      label: 'Nom complet',
      placeholder: 'Votre nom et prénom',
      required: true,
      minLength: 2,
      maxLength: 100
    },
    email: {
      label: 'Email',
      placeholder: 'votre.email@exemple.com',
      required: true,
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+'
    },
    subject: {
      label: 'Sujet',
      placeholder: 'Objet de votre message',
      required: true,
      minLength: 5,
      maxLength: 200
    },
    message: {
      label: 'Message',
      placeholder: 'Décrivez votre projet ou votre demande...',
      required: true,
      minLength: 20,
      maxLength: 1000
    }
  },
  submitText: 'Envoyer le message',
  successMessage: 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.',
  errorMessage: 'Une erreur est survenue. Veuillez réessayer ou me contacter directement.'
};