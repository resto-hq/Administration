import Link from "next/link";
import { LandingLinkButton } from "./LandingButton";

export default function ProCta() {
  return (
    <section className="bg-paper-alt px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-8">
          <p className="text-xs font-semibold tracking-[0.15em] text-ink/50">
            VOUS TENEZ UN RESTAURANT À LOMÉ ?
          </p>
          <p className="mt-2 text-2xl font-bold text-ink">Votre établissement mérite d&apos;être trouvé.</p>
          <p className="mt-3 text-sm text-ink/60">
            Menu, prix, horaires, photos, événements : présentez votre maison au moment où le client décide où
            il va manger. Le référencement de base est gratuit.
          </p>
          <LandingLinkButton href="/inscription" className="mt-6">
            Découvrir l&apos;espace restaurateur
          </LandingLinkButton>
        </div>

        <div className="rounded-2xl bg-white p-8">
          <p className="text-xs font-semibold tracking-[0.15em] text-ink/50">
            VOUS ORGANISEZ DES ÉVÉNEMENTS ?
          </p>
          <p className="mt-2 text-2xl font-bold text-ink">Remplissez votre salle.</p>
          <p className="mt-3 text-sm text-ink/60">
            Publiez vos soirées, vos dégustations et vos ateliers devant un public qui cherche déjà où sortir à
            Lomé. Vérification d&apos;identité, puis mise en ligne.
          </p>
          <Link
            href="/inscription"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink hover:border-ink/30"
          >
            Devenir créateur
          </Link>
        </div>
      </div>
    </section>
  );
}
