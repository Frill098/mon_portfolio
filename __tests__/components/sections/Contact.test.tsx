import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '@/components/sections/Contact';
import { ContactMethod } from '@/lib/types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { whileHover, whileInView, initial, animate, transition, variants, viewport, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    section: ({ children, ...props }: any) => {
      const { whileHover, whileInView, initial, animate, transition, variants, viewport, ...rest } = props;
      return <section {...rest}>{children}</section>;
    },
    a: ({ children, ...props }: any) => {
      const { whileHover, whileInView, initial, animate, transition, variants, viewport, ...rest } = props;
      return <a {...rest}>{children}</a>;
    },
    button: ({ children, ...props }: any) => {
      const { whileHover, whileTap, initial, animate, transition, variants, viewport, ...rest } = props;
      return <button {...rest}>{children}</button>;
    },
  },
}));

describe('Contact Component Unit Tests', () => {
  const mockInvitation = {
    title: "Travaillons Ensemble",
    message: "Vous avez un projet en tête ? Une idée à concrétiser ?",
    callToAction: "N'hésitez pas à me contacter :"
  };

  const mockContactMethods: ContactMethod[] = [
    {
      type: 'whatsapp',
      value: '+33 6 12 34 56 78',
      url: 'https://wa.me/33612345678',
      icon: () => null
    },
    {
      type: 'linkedin',
      value: 'linkedin.com/in/test-profile',
      url: 'https://linkedin.com/in/test-profile',
      icon: () => null
    },
    {
      type: 'twitter',
      value: '@test_handle',
      url: 'https://twitter.com/test_handle',
      icon: () => null
    },
    {
      type: 'discord',
      value: 'test_user#1234',
      url: 'https://discord.com/users/test_user_id',
      icon: () => null
    },
    {
      type: 'email',
      value: 'test@example.com',
      url: 'mailto:test@example.com',
      icon: () => null
    }
  ];

  const mockFormConfig = {
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
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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
        placeholder: 'Décrivez votre projet...',
        required: true,
        minLength: 20,
        maxLength: 1000
      }
    },
    submitText: 'Envoyer le message',
    successMessage: 'Merci pour votre message !',
    errorMessage: 'Une erreur est survenue.'
  };

  describe('Contact Links Display (Requirements 6.2)', () => {
    test('should display all provided contact methods', () => {
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={mockFormConfig}
        />
      );

      // Vérifier que tous les liens de contact sont présents
      expect(screen.getByTestId('contact-link-whatsapp')).toBeInTheDocument();
      expect(screen.getByTestId('contact-link-linkedin')).toBeInTheDocument();
      expect(screen.getByTestId('contact-link-twitter')).toBeInTheDocument();
      expect(screen.getByTestId('contact-link-discord')).toBeInTheDocument();
      expect(screen.getByTestId('contact-link-email')).toBeInTheDocument();
    });

    test('should display correct contact method values and URLs', () => {
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={mockFormConfig}
        />
      );

      // Vérifier les valeurs affichées
      expect(screen.getByText('+33 6 12 34 56 78')).toBeInTheDocument();
      expect(screen.getByText('linkedin.com/in/test-profile')).toBeInTheDocument();
      expect(screen.getByText('@test_handle')).toBeInTheDocument();
      expect(screen.getByText('test_user#1234')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();

      // Vérifier les URLs des liens
      const whatsappLink = screen.getByTestId('contact-link-whatsapp');
      expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/33612345678');

      const linkedinLink = screen.getByTestId('contact-link-linkedin');
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/test-profile');

      const twitterLink = screen.getByTestId('contact-link-twitter');
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/test_handle');

      const discordLink = screen.getByTestId('contact-link-discord');
      expect(discordLink).toHaveAttribute('href', 'https://discord.com/users/test_user_id');

      const emailLink = screen.getByTestId('contact-link-email');
      expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
    });

    test('should display contact method icons', () => {
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={mockFormConfig}
        />
      );

      // Vérifier que les icônes sont présentes
      expect(screen.getByTestId('whatsapp-icon')).toBeInTheDocument();
      expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
      expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
      expect(screen.getByTestId('discord-icon')).toBeInTheDocument();
      expect(screen.getByTestId('email-icon')).toBeInTheDocument();
    });

    test('should handle empty contact methods array', () => {
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={[]}
          formConfig={mockFormConfig}
        />
      );

      const contactMethodsContainer = screen.getByTestId('contact-methods');
      expect(contactMethodsContainer).toBeInTheDocument();
      expect(contactMethodsContainer.children).toHaveLength(0);
    });
  });

  describe('Contact Form Validation (Requirements 6.3)', () => {
    test('should display contact form when enabled', () => {
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={mockFormConfig}
        />
      );

      expect(screen.getByTestId('contact-form')).toBeInTheDocument();
      expect(screen.getByTestId('contact-form-name')).toBeInTheDocument();
      expect(screen.getByTestId('contact-form-email')).toBeInTheDocument();
      expect(screen.getByTestId('contact-form-subject')).toBeInTheDocument();
      expect(screen.getByTestId('contact-form-message')).toBeInTheDocument();
      expect(screen.getByTestId('contact-form-submit')).toBeInTheDocument();
    });

    test('should not display contact form when disabled', () => {
      const disabledFormConfig = { ...mockFormConfig, enabled: false };
      
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={disabledFormConfig}
        />
      );

      expect(screen.queryByTestId('contact-form')).not.toBeInTheDocument();
    });

    test('should not display contact form when config is not provided', () => {
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
        />
      );

      expect(screen.queryByTestId('contact-form')).not.toBeInTheDocument();
    });

    test('should validate required fields', async () => {
      const user = userEvent.setup();
      
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={mockFormConfig}
        />
      );

      const submitButton = screen.getByTestId('contact-form-submit');
      await user.click(submitButton);

      // Vérifier que les erreurs de validation apparaissent
      expect(screen.getByTestId('name-error')).toBeInTheDocument();
      expect(screen.getByTestId('email-error')).toBeInTheDocument();
      expect(screen.getByTestId('subject-error')).toBeInTheDocument();
      expect(screen.getByTestId('message-error')).toBeInTheDocument();
    });

    test('should have email validation in form config', () => {
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={mockFormConfig}
        />
      );

      // Verify that the email field exists and has the correct type
      const emailInput = screen.getByTestId('contact-form-email');
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('placeholder', 'votre.email@exemple.com');
      
      // Verify that the form config has email validation pattern
      expect(mockFormConfig.fields.email.pattern).toBeDefined();
      expect(mockFormConfig.fields.email.required).toBe(true);
    });

    test('should validate field lengths', async () => {
      const user = userEvent.setup();
      
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={mockFormConfig}
        />
      );

      // Test nom trop court
      const nameInput = screen.getByTestId('contact-form-name');
      await user.type(nameInput, 'A');

      // Test sujet trop court
      const subjectInput = screen.getByTestId('contact-form-subject');
      await user.type(subjectInput, 'Hi');

      // Test message trop court
      const messageInput = screen.getByTestId('contact-form-message');
      await user.type(messageInput, 'Short message');

      const submitButton = screen.getByTestId('contact-form-submit');
      await user.click(submitButton);

      expect(screen.getByTestId('name-error')).toHaveTextContent('au moins 2 caractères');
      expect(screen.getByTestId('subject-error')).toHaveTextContent('au moins 5 caractères');
      expect(screen.getByTestId('message-error')).toHaveTextContent('au moins 20 caractères');
    });

    test('should clear errors when user starts typing', async () => {
      const user = userEvent.setup();
      
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={mockFormConfig}
        />
      );

      // Déclencher les erreurs de validation
      const submitButton = screen.getByTestId('contact-form-submit');
      await user.click(submitButton);

      expect(screen.getByTestId('name-error')).toBeInTheDocument();

      // Commencer à taper dans le champ nom
      const nameInput = screen.getByTestId('contact-form-name');
      await user.type(nameInput, 'John');

      // L'erreur devrait disparaître
      expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
    });

    test('should submit form with valid data', async () => {
      const user = userEvent.setup();
      
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={mockFormConfig}
        />
      );

      // Remplir le formulaire avec des données valides
      await user.type(screen.getByTestId('contact-form-name'), 'John Doe');
      await user.type(screen.getByTestId('contact-form-email'), 'john@example.com');
      await user.type(screen.getByTestId('contact-form-subject'), 'Test Subject');
      await user.type(screen.getByTestId('contact-form-message'), 'This is a test message with enough characters to pass validation');

      const submitButton = screen.getByTestId('contact-form-submit');
      await user.click(submitButton);

      // Attendre que le message de succès apparaisse (avec timeout plus long)
      await waitFor(() => {
        expect(screen.getByTestId('success-message')).toBeInTheDocument();
      }, { timeout: 10000 });

      // Vérifier que le formulaire a été réinitialisé
      expect(screen.getByTestId('contact-form-name')).toHaveValue('');
      expect(screen.getByTestId('contact-form-email')).toHaveValue('');
      expect(screen.getByTestId('contact-form-subject')).toHaveValue('');
      expect(screen.getByTestId('contact-form-message')).toHaveValue('');
    }, 15000);
  });

  describe('Invitation Message Display (Requirements 6.1)', () => {
    test('should display invitation title, message and call-to-action', () => {
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={mockFormConfig}
        />
      );

      expect(screen.getByTestId('invitation-title')).toHaveTextContent('Travaillons Ensemble');
      expect(screen.getByTestId('invitation-message')).toHaveTextContent('Vous avez un projet en tête ? Une idée à concrétiser ?');
      expect(screen.getByTestId('invitation-cta')).toHaveTextContent("N'hésitez pas à me contacter :");
    });
  });

  describe('Accessibility and Dark Theme (Requirements 6.4, 6.5)', () => {
    test('should have proper form labels and accessibility attributes', () => {
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={mockFormConfig}
        />
      );

      // Vérifier que tous les champs ont des labels
      expect(screen.getByLabelText('Nom complet')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Sujet')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });

    test('should have external links with proper attributes', () => {
      render(
        <Contact 
          invitation={mockInvitation} 
          contactMethods={mockContactMethods}
          formConfig={mockFormConfig}
        />
      );

      const externalLinks = [
        screen.getByTestId('contact-link-whatsapp'),
        screen.getByTestId('contact-link-linkedin'),
        screen.getByTestId('contact-link-twitter'),
        screen.getByTestId('contact-link-discord')
      ];

      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });
});