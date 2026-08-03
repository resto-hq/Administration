export default function DashboardPreview() {
  return (
    <section className="py-24 px-6 bg-canvas-alt">
      <h2 className="text-3xl font-bold text-secondary text-center mb-4">
        Un tableau de bord pensé pour toi
      </h2>
      <p className="text-secondary/70 text-center max-w-xl mx-auto mb-12">
        Gère ta fiche resto, tes photos et tes statistiques en quelques clics.
      </p>
      <div className="max-w-3xl mx-auto rounded-2xl bg-white shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 bg-secondary px-4 py-3">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="w-3 h-3 rounded-full bg-white/40" />
          <span className="w-3 h-3 rounded-full bg-white/40" />
        </div>
        <div className="p-8 space-y-4">
          <div className="h-8 w-1/3 rounded bg-canvas-alt" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 rounded bg-canvas-alt" />
            <div className="h-20 rounded bg-canvas-alt" />
            <div className="h-20 rounded bg-canvas-alt" />
          </div>
          <div className="h-32 rounded bg-canvas-alt" />
        </div>
      </div>
    </section>
  );
}
