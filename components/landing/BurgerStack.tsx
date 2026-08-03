"use client";

import BunTop from "./burger-layers/BunTop";
import Cheese from "./burger-layers/Cheese";
import Patty from "./burger-layers/Patty";
import Lettuce from "./burger-layers/Lettuce";
import Tomato from "./burger-layers/Tomato";
import BunBottom from "./burger-layers/BunBottom";

export default function BurgerStack() {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div className="relative w-[320px]">
        <div data-layer="bun-top" className="relative z-50">
          <BunTop />
        </div>
        <div data-layer="cheese" className="relative z-40 -mt-2">
          <Cheese />
        </div>
        <div data-layer="lettuce" className="relative z-30 -mt-2">
          <Lettuce />
        </div>
        <div data-layer="tomato" className="relative z-20 -mt-2">
          <Tomato />
        </div>
        <div data-layer="patty" className="relative z-10 -mt-2">
          <Patty />
        </div>
        <div data-layer="bun-bottom" className="relative z-0 -mt-2">
          <BunBottom />
        </div>
      </div>
    </div>
  );
}
