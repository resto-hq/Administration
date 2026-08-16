import RestaurantForm from "@/components/dashboard/RestaurantForm";

export default function EmptyRestaurantState() {
  return (
    <div className="w-full max-w-md">
      <p className="text-xs font-semibold tracking-[0.3em] text-primary-dark">BIENVENUE</p>
      <h1 className="text-stamp mt-1 text-2xl text-ink sm:text-3xl">Crée ton premier resto</h1>
      <p className="mt-2 text-sm text-ink/70">
        Ton compte est prêt. Ajoute maintenant ton restaurant pour accéder à ton dashboard.
      </p>

      <div className="cut-corners mt-6 bg-paper p-6 shadow-[5px_5px_0_var(--color-ink)]">
        <RestaurantForm submitLabel="Créer mon restaurant" />
      </div>
    </div>
  );
}
