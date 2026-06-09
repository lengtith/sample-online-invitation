"use client";

import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TextRevealPage() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const targets =
        containerRef.current.querySelectorAll<HTMLElement>(".reveal");

      gsap.set(targets, { opacity: 0, y: 20 });

      const tl = gsap.timeline({ delay: 0.3 });
      targets.forEach((el) => {
        tl.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <h1 className="reveal text-4xl font-bold">Text Reveal Animation</h1>
      <p className="reveal mt-4 text-lg">
        This is a simple text reveal animation using GSAP. The text will fade in
        and slide up when it enters the viewport.
      </p>
      <button className="reveal mt-6 px-4 py-2 bg-blue-500 text-white rounded">
        Learn More
      </button>
    </div>
  );
}
