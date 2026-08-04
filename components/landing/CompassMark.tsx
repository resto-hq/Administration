"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function CompassMark({ size = 220 }: { size?: number }) {
  const needleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(needleRef.current, { rotate: -540, opacity: 0, scale: 0.6 });
    gsap
      .timeline({ delay: 0.15 })
      .to(needleRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "power1.out" }, 0)
      .to(needleRef.current, {
        rotate: 18,
        duration: 1.1,
        ease: "power3.out",
      }, 0)
      .to(needleRef.current, {
        rotate: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.45)",
      });
  });

  return (
    <div
      ref={needleRef}
      style={{ width: size, height: size }}
      className="relative drop-shadow-[6px_6px_0_var(--color-ink)]"
    >
      <Image src="/logo-icon.png" alt="" fill priority className="object-contain" />
    </div>
  );
}
