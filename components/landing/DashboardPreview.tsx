export default function DashboardPreview() {
  return (
    <section className="py-24 px-6 bg-paper-alt">
      <p className="text-center text-xs font-semibold tracking-[0.3em] text-primary-dark">
        TON ESPACE
      </p>
      <h2 className="text-stamp mt-3 mb-4 text-center text-3xl text-ink md:text-4xl">
        Un tableau de bord pensé pour toi
      </h2>
      <p className="text-ink/70 text-center max-w-xl mx-auto mb-12">
        Gère ta fiche resto, tes photos et tes statistiques en quelques clics.
      </p>
      <div className="max-w-3xl mx-auto cut-corners bg-paper shadow-[8px_8px_0_var(--color-ink)] overflow-hidden">
        <div className="flex items-center gap-2 bg-ink px-4 py-3">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="w-3 h-3 rounded-full bg-paper/30" />
          <span className="w-3 h-3 rounded-full bg-paper/30" />
        </div>
        <div className="p-8 space-y-4">
          <div className="h-8 w-1/3 bg-paper-alt" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 bg-paper-alt" />
            <div className="h-20 bg-paper-alt" />
            <div className="h-20 bg-paper-alt" />
          </div>
          <div className="h-32 bg-paper-alt" />
        </div>
      </div>
    </section>
  );
}
