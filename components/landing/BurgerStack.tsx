"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import BunTop from "./burger-layers/BunTop";
import Cheese from "./burger-layers/Cheese";
import Patty from "./burger-layers/Patty";
import Lettuce from "./burger-layers/Lettuce";
import Tomato from "./burger-layers/Tomato";
import BunBottom from "./burger-layers/BunBottom";

export default function BurgerStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pattyRef = useRef<HTMLDivElement>(null);
  const cheeseRef = useRef<HTMLDivElement>(null);
  const lettuceRef = useRef<HTMLDivElement>(null);
  const tomatoRef = useRef<HTMLDivElement>(null);
  const bunTopRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const buildOrder = [
        { ref: pattyRef, fromY: -160 },
        { ref: cheeseRef, fromY: -220 },
        { ref: lettuceRef, fromY: -280 },
        { ref: tomatoRef, fromY: -340 },
        { ref: bunTopRef, fromY: -400 },
      ];

      buildOrder.forEach(({ ref, fromY }) => {
        gsap.set(ref.current, { y: fromY, opacity: 0 });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
        },
      });

      buildOrder.forEach(({ ref, fromY }, index) => {
        timeline.fromTo(
          ref.current,
          { y: fromY, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          index === 0 ? 0 : "+=0.3"
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative flex min-h-screen items-center justify-center">
      <div className="relative w-[320px]">
        <div ref={bunTopRef} data-layer="bun-top" className="relative z-50">
          <BunTop />
        </div>
        <div ref={cheeseRef} data-layer="cheese" className="relative z-40 -mt-2">
          <Cheese />
        </div>
        <div ref={lettuceRef} data-layer="lettuce" className="relative z-30 -mt-2">
          <Lettuce />
        </div>
        <div ref={tomatoRef} data-layer="tomato" className="relative z-20 -mt-2">
          <Tomato />
        </div>
        <div ref={pattyRef} data-layer="patty" className="relative z-10 -mt-2">
          <Patty />
        </div>
        <div data-layer="bun-bottom" className="relative z-0 -mt-2">
          <BunBottom />
        </div>
      </div>
    </div>
  );
}
