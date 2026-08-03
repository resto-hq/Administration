import BurgerStack from "./BurgerStack";

export default function Hero() {
  return (
    <section className="relative">
      <div className="pt-20 px-6 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary max-w-3xl mx-auto">
          Ton resto, visible à Lomé.
        </h1>
        <p className="text-base md:text-lg text-secondary/70 max-w-xl mx-auto">
          Resto aide les restaurateurs à se faire découvrir, récolter des avis et
          remplir leurs tables.
        </p>
        <a
          href="#waitlist"
          className="inline-block bg-primary text-white font-semibold rounded-full px-8 py-4 hover:opacity-90 transition-opacity"
        >
          Créer mon compte restaurateur
        </a>
      </div>
      <BurgerStack />
    </section>
  );
}
