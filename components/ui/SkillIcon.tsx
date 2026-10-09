// SVG skill icons — className applied directly to each SVG element

interface SkillIconProps {
  name: string;
  className?: string;
}

export function SkillIcon({ name, className = "w-4 h-4 shrink-0" }: SkillIconProps) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const Comp = ICONS[key] ?? ICONS["default"];
  return <Comp className={className} />;
}

// Each icon is a React component that accepts className
type IconComp = ({ className }: { className: string }) => React.ReactElement;

const ICONS: Record<string, IconComp> = {
  // ── Gestion de projet ─────────────────────────────────────────
  agilescrum: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"/><path d="M12 8v4l3 3"/>
    </svg>
  ),
  jira: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.53 2.033C6.254 2.382 2 6.84 2 12.25c0 5.66 4.59 10.25 10.25 10.25S22.5 17.91 22.5 12.25c0-.424-.026-.841-.076-1.252l-6.55 6.55a3.217 3.217 0 0 1-4.548-4.548l6.55-6.55A10.205 10.205 0 0 0 11.53 2.033z" fill="#2684FF"/>
    </svg>
  ),
  trello: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="2" fill="#0052CC"/>
      <rect width="4" height="9" x="7" y="7" rx="1" fill="white"/>
      <rect width="4" height="6" x="13" y="7" rx="1" fill="white"/>
    </svg>
  ),
  roadmapproduit: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18M3 12h12M3 18h8"/>
    </svg>
  ),

  // ── Back-end ──────────────────────────────────────────────────
  phplaravel: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.642 5.43a.364.364 0 0 1 .014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 0 1-.189.326L9.93 23.949a.316.316 0 0 1-.066.027.29.29 0 0 1-.089.024.338.338 0 0 1-.089-.024.316.316 0 0 1-.066-.027L.376 18.755A.378.378 0 0 1 .187 18.43V3.574a.378.378 0 0 1 .189-.326L9.775.079a.378.378 0 0 1 .378 0l9.209 5.326.014.008.047.017z" fill="#FF2D20"/>
    </svg>
  ),
  nodejs: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.998 1.957a1.04 1.04 0 0 0-.52.14L3.093 6.886a1.04 1.04 0 0 0-.52.9v9.428c0 .372.198.716.52.9l8.385 4.789a1.04 1.04 0 0 0 1.04 0l8.385-4.789a1.04 1.04 0 0 0 .52-.9V7.786a1.04 1.04 0 0 0-.52-.9L12.518 2.1a1.04 1.04 0 0 0-.52-.14z" fill="#539E43"/>
    </svg>
  ),
  python: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.13V3.13S18.28 0 11.913 0zM8.708 1.81a1.047 1.047 0 1 1 0 2.094 1.047 1.047 0 0 1 0-2.094z" fill="#3776AB"/>
      <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.402-3.35 3.402H9.451s-3.24-.052-3.24 3.13v5.27S5.72 24 12.086 24zm3.206-1.81a1.047 1.047 0 1 1 0-2.094 1.047 1.047 0 0 1 0 2.094z" fill="#FFD43B"/>
    </svg>
  ),
  mysql: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 0 0-.27-4.41h-.013l-1.524 4.41H2.15l-1.51-4.41h-.013c-.06 1.49-.104 2.96-.128 4.41H0c.04-1.81.107-3.61.2-5.4h1.284l1.523 4.304h.013L4.55 13.3h1.21zm4.728 0H9.22v-5.4h1.277zm9.72 0h-1.523l-1.937-2.973h-.013v2.973h-1.277v-5.4h1.277l1.937 2.973h.013V13.3h1.523z" fill="#4479A1"/>
    </svg>
  ),
  postgresql: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403C13.045.327 11.966.27 11.03.318 9.6.394 8.222.814 7.268 1.856c-.96 1.048-1.387 2.576-1.271 4.674.03.586.198 1.558.476 2.809.277 1.251.685 2.512 1.213 3.423.264.455.554.832.896 1.082.342.25.773.377 1.226.322a1.8 1.8 0 0 0 1.068-.494l.028.028c.257.285.553.495.89.622.33.127.696.16 1.07.101-.042.414-.057.83-.045 1.243.023.882.167 1.665.504 2.265.336.6.904.99 1.643.99.587 0 1.077-.184 1.468-.498.39-.313.675-.762.857-1.317.18-.548.264-1.188.297-1.882a14.914 14.914 0 0 0-.042-1.88c-.031-.317-.08-.624-.141-.919.332-.157.653-.36.956-.615.468-.39.882-.896 1.18-1.543.298-.647.455-1.417.455-2.318 0-.9-.167-1.685-.485-2.342C20.13 3.51 19.525 3 18.77 2.65a5.515 5.515 0 0 0-.717-.244A10.166 10.166 0 0 0 17.128 0z" fill="#336791"/>
    </svg>
  ),
  apirest: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 20V10M12 20V4M6 20v-6"/>
    </svg>
  ),

  // ── Front-end ─────────────────────────────────────────────────
  javascriptes6: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="2" fill="#F7DF1E"/>
      <path d="M6.5 17.5c.3.6.9 1 1.7 1 .7 0 1.2-.4 1.2-.9 0-.6-.5-.8-1.3-1.2l-.5-.2c-1.2-.5-2-.9-2-2.1 0-1 .8-1.8 2.1-1.8.9 0 1.6.3 2 1l-1.1.7c-.2-.4-.5-.5-.9-.5-.4 0-.7.2-.7.6 0 .4.3.6 1 .9l.4.2c1.4.6 2.2 1.2 2.2 2.5 0 1.4-1.1 2.2-2.6 2.2-1.5 0-2.4-.7-2.8-1.6l1.3-.8zm6.5.1c.2.5.6.8 1.1.8.4 0 .7-.2.7-.9V12h1.5v5.5c0 1.5-.9 2.2-2.2 2.2-1.2 0-1.9-.6-2.2-1.4l1.1-.7z" fill="#323330"/>
    </svg>
  ),
  reactjs: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)"/>
    </svg>
  ),
  nextjs: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="black"/>
      <path d="M9.5 7.5v9l8-9v9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  typescript: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="2" fill="#3178C6"/>
      <path d="M13.5 15v-1.5H18V15h-1.5v4.5H15V15h-1.5zM7.5 13.5h5v1.5H9.75v1.5H12a1.5 1.5 0 1 1 0 3H7.5V18H12v-1.5H9.75a1.5 1.5 0 1 1 0-3z" fill="white"/>
    </svg>
  ),
  tailwindcss: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.51 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 17.85 9.49 19 12 19c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.51 12 7 12z" fill="#38BDF8"/>
    </svg>
  ),
  reactnative: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)"/>
    </svg>
  ),

  // ── DevOps & Outils ───────────────────────────────────────────
  gitgithub: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  githubactionscicd: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  awsec2s3: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.527 4.729c-.245-.26-.587-.439-.964-.439-.298 0-.574.1-.793.264l-5.47 4.123a1.27 1.27 0 0 0-.48.993v4.66c0 .553.256 1.044.655 1.373l5.468 4.123c.22.165.496.264.793.264.377 0 .72-.18.964-.44.217-.228.347-.533.347-.862V5.591c0-.329-.13-.634-.347-.862z" fill="#FF9900"/>
      <path d="M18.5 8.5l-2 1v5l2 1V8.5z" fill="#FF9900"/>
    </svg>
  ),
  figma: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
      <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
      <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
      <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
      <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
    </svg>
  ),
  docker: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" fill="#2496ED"/>
    </svg>
  ),

  // ── Autres ────────────────────────────────────────────────────
  flutter: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.314 0L2.3 12 6 15.7 21.684.012h-7.37zm.159 11.971l-4.575 4.586 4.575 4.586 4.575-4.586z" fill="#54C5F8"/>
      <path d="M9.898 16.557l4.575-4.586-4.575-4.586L5.323 11.97z" fill="#01B4E4"/>
    </svg>
  ),
  kotlin: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="kg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7F52FF"/>
          <stop offset="50%" stopColor="#C811E1"/>
          <stop offset="100%" stopColor="#E44857"/>
        </linearGradient>
      </defs>
      <path d="M2 2h10l10 10L12 22H2V2z" fill="url(#kg)"/>
    </svg>
  ),
  wordpress: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-8.468 10c0-1.58.347-3.077.963-4.42L8.2 19.395A8.466 8.466 0 0 1 3.532 12zm8.468 8.468a8.434 8.434 0 0 1-2.404-.35l2.552-7.41 2.613 7.158a.395.395 0 0 0 .03.059 8.44 8.44 0 0 1-2.791.543zm1.172-11.409c.512-.027.974-.08.974-.08.459-.054.405-.729-.054-.703 0 0-1.378.108-2.268.108-.836 0-2.241-.108-2.241-.108-.46-.026-.514.676-.055.703 0 0 .435.053.893.08l1.327 3.637-1.864 5.589-3.099-9.226c.512-.027.974-.08.974-.08.459-.054.405-.729-.054-.703 0 0-1.378.108-2.268.108a15.29 15.29 0 0 1-.572-.012A8.466 8.466 0 0 1 12 3.532c2.213 0 4.228.847 5.742 2.232a3.388 3.388 0 0 0-.068-.004c-.836 0-1.428.729-1.428 1.512 0 .703.405 1.297.837 1.999.324.567.702 1.296.702 2.348 0 .728-.28 1.574-.648 2.753l-.852 2.844-3.075-9.157zM17.4 19.07l2.594-7.499c.485-1.215.647-2.187.647-3.051 0-.313-.02-.604-.057-.877A8.468 8.468 0 0 1 20.468 12 8.451 8.451 0 0 1 17.4 19.07z" fill="#21759B"/>
    </svg>
  ),
  cc: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3C11.81 3 9 5.5 9 5.5S6.19 3 1.5 3C1.22 3 1 3.22 1 3.5v13c0 .28.22.5.5.5 4.69 0 7.5 2.5 7.5 2.5s2.81-2.5 7.5-2.5c.28 0 .5-.22.5-.5v-13c0-.28-.22-.5-.5-.5z" fill="#00599C"/>
    </svg>
  ),

  // ── Réseaux & Sécurité ────────────────────────────────────────
  tcpip: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  dnsdhcp: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  scuritrseau: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  linuxwindowsserver: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 3h10.5v10.5H0V3zm13.5 0H24v10.5H13.5V3zM0 16.5h10.5V27H0V16.5zm13.5 0H24V27H13.5V16.5z" fill="#0078D4"/>
    </svg>
  ),

  // ── Maintenance & Support ─────────────────────────────────────
  diagnosticmatrilogiciel: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  installationos: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M12 7v6m-3-3 3 3 3-3"/>
    </svg>
  ),
  virtualisationvirtualbox: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="12" height="9" rx="1"/>
      <rect x="8" y="10" width="12" height="9" rx="1"/>
    </svg>
  ),
  photoshop: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#001E36"/>
      <path d="M9.85 14.82H7.34L6.8 16.5H5l2.6-8h1.8l2.6 8H9.7l-.55-1.68zM7.73 13.4h1.73L8.6 10.2l-1.43 3.2zM13.5 14c.03.7.57 1.15 1.3 1.15.75 0 1.3-.48 1.3-1.17 0-.66-.43-1-1.34-1.35-.93-.35-1.97-.77-1.97-2.03 0-1.2.9-2 2.2-2 .68 0 1.27.18 1.7.5.46.35.72.87.72 1.52H16c-.03-.6-.47-1-.96-1-.56 0-.97.35-.97.9 0 .55.4.78 1.3 1.1 1 .37 2 .83 2 2.27 0 1.28-.97 2.15-2.38 2.15-1.47 0-2.4-.87-2.42-2.04H13.5z" fill="#31A8FF"/>
    </svg>
  ),

  // ── Default ───────────────────────────────────────────────────
  default: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
    </svg>
  ),
};
