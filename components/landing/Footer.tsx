import Link from "next/link";
import Image from "next/image";

const COLUMNS = [
  {
    title: "Découvrir",
    links: [
      { label: "Restaurants", href: "#restaurants" },
      { label: "Événements", href: "#evenements" },
      { label: "Comment ça marche", href: "#comment-ca-marche" },
      { label: "Questions fréquentes", href: "#" },
    ],
  },
  {
    title: "Professionnels",
    links: [
      { label: "Espace restaurateur", href: "/connexion" },
      { label: "Référencer mon restaurant", href: "/inscription" },
      { label: "Devenir créateur d'événements", href: "/inscription" },
      { label: "Tarifs", href: "#" },
    ],
  },
  {
    title: "Resto App",
    links: [
      { label: "À propos", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Nous rejoindre", href: "#" },
      { label: "Conditions d'utilisation", href: "#" },
      { label: "Politique de confidentialité", href: "#" },
    ],
  },
];

const SOCIALS = ["IG", "FB", "TT"];

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center">
              <Image src="/logo-mark.png" alt="Resto App" width={140} height={48} className="h-8 w-auto" />
            </Link>
            <p className="mt-3 text-sm text-white/60">Le réseau social des restaurants de votre ville.</p>
            <div className="mt-4 flex gap-2">
              {SOCIALS.map((social) => (
                <span
                  key={social}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/70"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold tracking-[0.1em] text-white/40">{column.title.toUpperCase()}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-white/70 hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-1 border-t border-white/10 pt-6 text-xs text-white/45">
          <p>Resto App, Lomé, Togo. © 2026. contact@resto-app.co</p>
          <p>
            Prototype : contenus, notes, avis, coordonnées et chiffres de démonstration, à remplacer par les
            données réelles de la collecte terrain.
          </p>
        </div>
      </div>
    </footer>
  );
}
