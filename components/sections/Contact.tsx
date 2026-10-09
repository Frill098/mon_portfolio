"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { ContactMethod } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { SPRING_EASE } from "@/lib/constants";

interface ContactProps {
  invitation: { title: string; message: string; callToAction: string };
  contactMethods: ContactMethod[];
  formConfig?: {
    enabled: boolean;
    fields: {
      name:    { label: string; placeholder: string; required: boolean; minLength: number; maxLength: number };
      email:   { label: string; placeholder: string; required: boolean; pattern: string };
      subject: { label: string; placeholder: string; required: boolean; minLength: number; maxLength: number };
      message: { label: string; placeholder: string; required: boolean; minLength: number; maxLength: number };
    };
    submitText: string;
    successMessage: string;
    errorMessage: string;
  };
}

interface FormData { name: string; email: string; subject: string; message: string }
interface FormErrors { name?: string; email?: string; subject?: string; message?: string }

const SPRING = { ease: SPRING_EASE, duration: 0.7 };

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

const methodLabel: Record<ContactMethod["type"], string> = {
  email:    "Email",
  whatsapp: "WhatsApp",
  linkedin: "LinkedIn",
  twitter:  "Twitter",
  discord:  "Discord",
};

export default function Contact({ invitation, contactMethods, formConfig }: ContactProps) {
  const [formData, setFormData]   = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors]       = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = (): boolean => {
    if (!formConfig) return false;
    const e: FormErrors = {};
    const { name, email, subject, message } = formData;
    const f = formConfig.fields;

    if (!name.trim())                                              e.name    = "Le nom est requis";
    else if (name.trim().length < f.name.minLength)               e.name    = `Au moins ${f.name.minLength} caractères`;

    if (!email.trim())                                             e.email   = "L'email est requis";
    else if (!new RegExp(f.email.pattern).test(email.trim()))     e.email   = "Email invalide";

    if (!subject.trim())                                           e.subject = "Le sujet est requis";
    else if (subject.trim().length < f.subject.minLength)         e.subject = `Au moins ${f.subject.minLength} caractères`;

    if (!message.trim())                                           e.message = "Le message est requis";
    else if (message.trim().length < f.message.minLength)         e.message = `Au moins ${f.message.minLength} caractères`;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    "w-full px-4 py-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors";

  return (
    <section id="contact" className="py-28 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Header */}
          <motion.div variants={item} className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
              Contact
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {invitation.title}
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              {invitation.message}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Direct contact links */}
            <motion.div variants={item} className="space-y-4">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-6">
                {invitation.callToAction}
              </p>
              {contactMethods.map((method) => (
                <a
                  key={method.type}
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Me contacter via ${methodLabel[method.type]}`}
                  className="flex items-center gap-4 p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-violet-400/60 dark:hover:border-violet-500/40 hover:bg-white dark:hover:bg-zinc-800/60 hover:translate-x-1 transition-all duration-200 group"
                >
                  <div className="p-2.5 rounded-md border border-zinc-200 dark:border-zinc-700 text-violet-600 dark:text-violet-400 group-hover:border-violet-400 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20 transition-colors">
                    <SocialIcon platform={method.type} className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {methodLabel[method.type]}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {method.value}
                    </p>
                  </div>
                </a>
              ))}
            </motion.div>

            {/* Contact form */}
            {formConfig?.enabled && (
              <motion.div variants={item}>
                <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
                    Envoyez-moi un message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        {formConfig.fields.name.label}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder={formConfig.fields.name.placeholder}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={inputCls}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-red-500">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        {formConfig.fields.email.label}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder={formConfig.fields.email.placeholder}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={inputCls}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        {formConfig.fields.subject.label}
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        placeholder={formConfig.fields.subject.placeholder}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        className={inputCls}
                      />
                      {errors.subject && (
                        <p id="subject-error" className="mt-1 text-xs text-red-500">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        {formConfig.fields.message.label}
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder={formConfig.fields.message.placeholder}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={`${inputCls} resize-none`}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-xs text-red-500">{errors.message}</p>
                      )}
                    </div>

                    {/* Status messages */}
                    {submitStatus === "success" && (
                      <div className="flex items-center gap-2 p-3 rounded-md bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm">
                        <CheckCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        {formConfig.successMessage}
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="flex items-center gap-2 p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        {formConfig.errorMessage}
                      </div>
                    )}

                    <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      {isSubmitting ? "Envoi en cours…" : formConfig.submitText}
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
