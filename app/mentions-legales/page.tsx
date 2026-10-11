import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { APP_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et politique de confidentialité du portfolio.",
  alternates: { canonical: `${APP_CONFIG.site.url}/mentions-legales/` },
};

const { author, email } = APP_CONFIG.site;

// TODO(user): définir la durée de conservation des messages reçus via le formulaire
const RETENTION_PERIOD = "[À DÉFINIR]";

const sections = [
  {
    title: "Éditeur du site",
    content: (
      <>
        <p>{author}</p>
        <p>
          Contact :{" "}
          <a href={`mailto:${email}`} className="text-violet-600 dark:text-violet-400 underline underline-offset-2">
            {email}
          </a>
        </p>
      </>
    ),
  },
  {
    title: "Hébergement",
    content: (
      <p>
        Le site est hébergé par Vercel Inc. (
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 dark:text-violet-400 underline underline-offset-2">
          vercel.com
        </a>
        ).
      </p>
    ),
  },
  {
    title: "Données collectées",
    content: (
      <>
        <p>
          Le formulaire de contact collecte les données suivantes : nom, adresse email, sujet et message.
          Aucune autre donnée personnelle n&apos;est collectée. Le site n&apos;utilise ni cookie de suivi
          ni outil de mesure d&apos;audience.
        </p>
        <p>
          <strong>Finalité :</strong> ces données servent uniquement à répondre à votre demande. Elles ne sont
          ni revendues ni utilisées à des fins commerciales.
        </p>
        <p>
          <strong>Sous-traitant :</strong> les messages sont transmis par email via le service Resend (
          <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 dark:text-violet-400 underline underline-offset-2">
            resend.com
          </a>
          ).
        </p>
        <p>
          <strong>Durée de conservation :</strong> {RETENTION_PERIOD}.
        </p>
      </>
    ),
  },
  {
    title: "Vos droits",
    content: (
      <p>
        Vous pouvez demander l&apos;accès à vos données ou leur suppression à tout moment en écrivant à{" "}
        <a href={`mailto:${email}`} className="text-violet-600 dark:text-violet-400 underline underline-offset-2">
          {email}
        </a>
        .
      </p>
    ),
  },
];

export default function MentionsLegales() {
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-zinc-950 pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
            Informations
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-12">
            Mentions légales
          </h1>

          <div className="space-y-10">
            {sections.map(({ title, content }) => (
              <section key={title}>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3">{title}</h2>
                <div className="space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{content}</div>
              </section>
            ))}
          </div>

          <Link
            href="/"
            className="inline-block mt-14 text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline underline-offset-2"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
