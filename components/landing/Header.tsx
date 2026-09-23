import Link from "next/link";
import Image from "next/image";
import { LandingLinkButton } from "./LandingButton";

const NAV_LINKS = [
  { href: "#restaurants", label: "Restaurants" },
  { href: "#evenements", label: "Événements" },
  { href: "#comment-ca-marche", label: "Comment ça marche" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-10">
        <Link href="/" className="flex shrink-0 items-center">
          <Image src="/logo-mark.png" alt="Resto App" width={140} height={48} className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold text-ink/70 hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/connexion"
            className="hidden rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/30 sm:inline-flex"
          >
            Espace restaurateur
          </Link>
          <LandingLinkButton href="#prevenir" className="!px-5 !py-2.5">
            Être prévenu
          </LandingLinkButton>
        </div>
      </div>
    </header>
  );
}
