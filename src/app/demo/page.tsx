"use client";
import React from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function DemoPage() {
  const boxRef = React.useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!boxRef.current) return;

    const box = boxRef.current;

    let x = 0;
    let y = 0;
    let vx = 5; // horizontal speed
    let vy = 4; // vertical speed

    const update = () => {
      const boxWidth = box.offsetWidth;
      const boxHeight = box.offsetHeight;

      const maxX = window.innerWidth - boxWidth;
      const maxY = window.innerHeight - boxHeight;

      x += vx;
      y += vy;

      // Bounce horizontally
      if (x <= 0 || x >= maxX) {
        vx *= -1;
        x = Math.max(0, Math.min(x, maxX));
      }

      // Bounce vertically
      if (y <= 0 || y >= maxY) {
        vy *= -1;
        y = Math.max(0, Math.min(y, maxY));
      }

      gsap.set(box, { x, y });
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  return <div ref={boxRef} className="size-40 bg-blue-500"></div>;
}
