'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ContactMethod } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface ContactProps {
  invitation: {
    title: string;
    message: string;
    callToAction: string;
  };
  contactMethods: ContactMethod[];
  formConfig?: {
    enabled: boolean;
    fields: {
      name: { label: string; placeholder: string; required: boolean; minLength: number; maxLength: number };
      email: { label: string; placeholder: string; required: boolean; pattern: string };
      subject: { label: string; placeholder: string; required: boolean; minLength: number; maxLength: number };
      message: { label: string; placeholder: string; required: boolean; minLength: number; maxLength: number };
    };
    submitText: string;
    successMessage: string;
    errorMessage: string;
  };
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact({ invitation, contactMethods, formConfig }: ContactProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  // Validation du formulaire (Exigence 6.3)
  const validateForm = (): boolean => {
    if (!formConfig) return false;
    
    const newErrors: FormErrors = {};
    
    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.trim().length < formConfig.fields.name.minLength) {
      newErrors.name = `Le nom doit contenir au moins ${formConfig.fields.name.minLength} caractères`;
    } else if (formData.name.trim().length > formConfig.fields.name.maxLength) {
      newErrors.name = `Le nom ne peut pas dépasser ${formConfig.fields.name.maxLength} caractères`;
    }

    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!new RegExp(formConfig.fields.email.pattern).test(formData.email.trim())) {
      newErrors.email = 'Veuillez entrer un email valide';
    }

    // Validation du sujet
    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    } else if (formData.subject.trim().length < formConfig.fields.subject.minLength) {
      newErrors.subject = `Le sujet doit contenir au moins ${formConfig.fields.subject.minLength} caractères`;
    } else if (formData.subject.trim().length > formConfig.fields.subject.maxLength) {
      newErrors.subject = `Le sujet ne peut pas dépasser ${formConfig.fields.subject.maxLength} caractères`;
    }

    // Validation du message
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < formConfig.fields.message.minLength) {
      newErrors.message = `Le message doit contenir au moins ${formConfig.fields.message.minLength} caractères`;
    } else if (formData.message.trim().length > formConfig.fields.message.maxLength) {
      newErrors.message = `Le message ne peut pas dépasser ${formConfig.fields.message.maxLength} caractères`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulation d'envoi de formulaire
      // Dans une vraie application, ceci ferait un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Icônes pour les plateformes (simplifiées pour le moment)
  const getContactIcon = (type: ContactMethod['type']) => {
    const iconClass = "w-6 h-6";
    switch (type) {
      case 'whatsapp':
        return <div className={`${iconClass} bg-green-500 rounded`} data-testid={`${type}-icon`}></div>;
      case 'linkedin':
        return <div className={`${iconClass} bg-blue-600 rounded`} data-testid={`${type}-icon`}></div>;
      case 'twitter':
        return <div className={`${iconClass} bg-blue-400 rounded`} data-testid={`${type}-icon`}></div>;
      case 'discord':
        return <div className={`${iconClass} bg-indigo-500 rounded`} data-testid={`${type}-icon`}></div>;
      case 'email':
        return <div className={`${iconClass} bg-red-500 rounded`} data-testid={`${type}-icon`}></div>;
      default:
        return <div className={`${iconClass} bg-gray-500 rounded`} data-testid={`${type}-icon`}></div>;
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Titre de section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">Contact</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
          </motion.div>

          {/* Message d'invitation (Exigence 6.1) */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h3 className="text-3xl font-semibold text-gray-100 mb-6" data-testid="invitation-title">
              {invitation.title}
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6 max-w-4xl mx-auto" data-testid="invitation-message">
              {invitation.message}
            </p>
            <p className="text-lg text-gray-400" data-testid="invitation-cta">
              {invitation.callToAction}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Liens de contact directs (Exigence 6.2) */}
            <motion.div variants={itemVariants}>
              <h4 className="text-2xl font-semibold text-gray-100 mb-8">Contactez-moi directement</h4>
              <div className="space-y-4" data-testid="contact-methods">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:scale-105"
                    whileHover={{ x: 5 }}
                    data-testid={`contact-link-${method.type}`}
                  >
                    {getContactIcon(method.type)}
                    <div>
                      <div className="text-gray-100 font-medium capitalize">
                        {method.type === 'whatsapp' ? 'WhatsApp' : 
                         method.type === 'linkedin' ? 'LinkedIn' : 
                         method.type === 'twitter' ? 'Twitter' : 
                         method.type === 'discord' ? 'Discord' : 
                         method.type === 'email' ? 'Email' : method.type}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {method.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Formulaire de contact (Exigence 6.3) */}
            {formConfig?.enabled && (
              <motion.div variants={itemVariants}>
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-100">Envoyez-moi un message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                      {/* Champ Nom */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          {formConfig.fields.name.label}
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder={formConfig.fields.name.placeholder}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                          data-testid="contact-form-name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400" data-testid="name-error">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Champ Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          {formConfig.fields.email.label}
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder={formConfig.fields.email.placeholder}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                          data-testid="contact-form-email"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-400" data-testid="email-error">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Champ Sujet */}
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                          {formConfig.fields.subject.label}
                        </label>
                        <input
                          type="text"
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder={formConfig.fields.subject.placeholder}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                          data-testid="contact-form-subject"
                        />
                        {errors.subject && (
                          <p className="mt-1 text-sm text-red-400" data-testid="subject-error">
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Champ Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          {formConfig.fields.message.label}
                        </label>
                        <textarea
                          id="message"
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder={formConfig.fields.message.placeholder}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-vertical"
                          data-testid="contact-form-message"
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-400" data-testid="message-error">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Messages de statut */}
                      {submitStatus === 'success' && (
                        <div className="p-4 bg-green-900 border border-green-700 rounded-lg" data-testid="success-message">
                          <p className="text-green-300">{formConfig.successMessage}</p>
                        </div>
                      )}

                      {submitStatus === 'error' && (
                        <div className="p-4 bg-red-900 border border-red-700 rounded-lg" data-testid="error-message">
                          <p className="text-red-300">{formConfig.errorMessage}</p>
                        </div>
                      )}

                      {/* Bouton de soumission */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        data-testid="contact-form-submit"
                      >
                        {isSubmitting ? 'Envoi en cours...' : formConfig.submitText}
                      </button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}