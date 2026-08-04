"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import CompassMark from "./CompassMark";

export default function Hero() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({ delay: 0.1 });

      timeline
        .from("[data-hero-line]", {
          yPercent: 130,
          opacity: 0,
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.08,
        })
        .from(
          "[data-hero-stamp]",
          {
            scale: 0,
            rotate: 20,
            opacity: 0,
            duration: 0.55,
            ease: "back.out(2.4)",
          },
          "-=0.25"
        )
        .from(
          "[data-hero-sub]",
          { y: 16, opacity: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .from(
          "[data-hero-cta]",
          { y: 16, opacity: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );
    },
    { scope: scopeRef }
  );

  return (
    <section ref={scopeRef} className="relative overflow-hidden bg-canvas bg-grain">
      <div
        aria-hidden
        className="absolute -top-24 -right-32 h-96 w-96 rotate-12 bg-mustard/30 cut-corners"
      />
      <div
        aria-hidden
        className="absolute bottom-10 -left-20 h-64 w-64 -rotate-6 bg-primary/10 cut-corners"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-24 md:grid-cols-[1.2fr_1fr] md:pt-32">
        <div>
          <h1 className="text-stamp text-5xl leading-[0.95] text-ink sm:text-6xl md:text-7xl">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                Ton resto,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                visible à
              </span>
            </span>
            <span
              data-hero-stamp
              className="cut-corners-sm mt-3 inline-block -rotate-3 bg-primary px-5 py-2 text-paper shadow-[6px_6px_0_var(--color-ink)]"
            >
              Lomé.
            </span>
          </h1>

          <p
            data-hero-sub
            className="mt-8 max-w-md text-base text-ink/70 md:text-lg"
          >
            Resto aide les restaurateurs à se faire découvrir, récolter des avis
            et remplir leurs tables.
          </p>

          <a
            data-hero-cta
            href="/inscription"
            className="cut-corners-sm mt-8 inline-block bg-ink px-8 py-4 font-semibold text-paper shadow-[6px_6px_0_var(--color-primary)] transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--color-primary)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[3px_3px_0_var(--color-primary)]"
          >
            Créer mon compte restaurateur
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <CompassMark size={260} />
        </div>
      </div>
    </section>
  );
}
