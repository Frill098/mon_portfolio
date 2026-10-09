import { APP_CONFIG } from "@/lib/constants";
import { socialLinks } from "@/data/personal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Separator } from "@/components/ui/Separator";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              DG<span className="text-violet-500">.</span>DAGA
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              © {year} {APP_CONFIG.site.author}. Tous droits réservés.
            </p>
          </div>

          {/* Stack badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"].map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Profil ${link.platform}`}
                className="p-2 rounded-md text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <SocialIcon platform={link.platform} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
          © {new Date().getFullYear()} Déo-Gratias DAGA — Tous droits réservés - Cotonou, Bénin
        </p>
      </div>
    </footer>
  );
}
