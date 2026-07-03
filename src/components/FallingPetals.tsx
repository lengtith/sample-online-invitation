"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PETAL_COUNT = 10;

const PETAL_COLORS = [
  "#a78bca",
  "#c4a9dd",
  "#b79bd6",
  "#d3bce6",
  "#ad91cf",
  "#c8aee0",
];

function Petal() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-sm">
      <g>
        {PETAL_COLORS.map((color, i) => (
          <path
            key={i}
            d="M16 16 C10 15 8 10 12 5 C14 2.5 18 2.5 20 5 C24 10 22 15 16 16 Z"
            fill={color}
            transform={`rotate(${i * 60} 16 16)`}
          />
        ))}
        <circle cx="16" cy="16" r="3" fill="#8a5fb0" />
      </g>
    </svg>
  );
}

export default function FallingPetals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const petals = gsap.utils.toArray<HTMLDivElement>(".falling-petal");

      petals.forEach((petal) => {
        const startX = gsap.utils.random(0, 100);
        const fallDuration = gsap.utils.random(35, 55);
        const swayDuration = gsap.utils.random(4, 7);
        const size = gsap.utils.random(10, 34);
        const delay = gsap.utils.random(0, 20);
        const opacity = gsap.utils.random(0.5, 0.95);

        gsap.set(petal, {
          left: `${startX}%`,
          top: "-10%",
          width: size,
          height: size,
          opacity,
          rotation: gsap.utils.random(0, 360),
        });

        gsap.to(petal, {
          top: "110%",
          duration: fallDuration,
          delay,
          ease: "none",
          repeat: -1,
        });

        gsap.to(petal, {
          x: `+=${gsap.utils.random(30, 60)}`,
          duration: swayDuration,
          delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(petal, {
          rotation: "+=180",
          duration: fallDuration,
          delay,
          ease: "none",
          repeat: -1,
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden z-30"
      aria-hidden="true"
    >
      {Array.from({ length: PETAL_COUNT }).map((_, i) => (
        <div
          key={i}
          className="falling-petal absolute w-4 h-4 opacity-0"
        >
          <Petal />
        </div>
      ))}
    </div>
  );
}
