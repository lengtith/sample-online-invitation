"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TestPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const box1Ref = useRef<HTMLDivElement | null>(null);
  const box2Ref = useRef<HTMLDivElement | null>(null);
  const doorLeftRef = useRef<HTMLDivElement | null>(null);
  const doorRightRef = useRef<HTMLDivElement | null>(null);
  const doorSectionRef = useRef<HTMLDivElement | null>(null);
  const gradientRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = containerRef.current;
    const boxes = [box1Ref.current, box2Ref.current];

    if (!scroller) return;

    ScrollTrigger.defaults({ scroller });

    const directions = [200, -200];

    const anims = boxes.map((box, i) => {
      if (!box) return null;

      const anim = gsap.fromTo(
        box,
        { y: directions[i], opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          paused: true,
        },
      );

      ScrollTrigger.create({
        trigger: box,
        start: "top 90%",
        onEnter: () => anim.restart(),
        onEnterBack: () => anim.restart(),
        onLeave: () => anim.reverse(),
        onLeaveBack: () => anim.reverse(),
      });

      return anim;
    });

    requestAnimationFrame(() => {
      anims[0]?.restart();
    });

    // Door animation
    const doorAnim = gsap.fromTo(
      [doorLeftRef.current, doorRightRef.current],
      { x: 0 },
      {
        x: (i: number) => (i === 0 ? "-100%" : "100%"),
        duration: 1.4,
        ease: "power2.inOut",
        paused: true,
      },
    );

    ScrollTrigger.create({
      trigger: doorSectionRef.current,
      start: "top 90%",
      onEnter: () => doorAnim.restart(),
      onEnterBack: () => doorAnim.reverse(),
      onLeave: () => doorAnim.reverse(),
      onLeaveBack: () => doorAnim.reverse(),
    });

    // Infinite gradient animation
    gsap.fromTo(
      gradientRef.current,
      { backgroundPosition: "0% 50%" },
      {
        backgroundPosition: "100% 50%",
        duration: 4,
        ease: "none",
        repeat: -1,
        yoyo: true,
      },
    );

    return () => {
      ScrollTrigger.defaults({ scroller: window });
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(gradientRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
    >
      <section className="h-screen snap-start flex items-center justify-center bg-zinc-900">
        <div ref={box1Ref} className="size-96 bg-amber-500" />
      </section>

      <section className="h-screen snap-start flex items-center justify-center bg-zinc-800">
        <div ref={box2Ref} className="size-96 bg-sky-500" />
      </section>

      <section
        ref={doorSectionRef}
        className="h-screen snap-start relative overflow-hidden flex items-center justify-center"
      >
        {/* Animated gradient background behind doors */}
        <div
          ref={gradientRef}
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981, #f59e0b)",
            backgroundSize: "400% 400%",
          }}
        />

        {/* Content revealed behind the doors */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white text-center z-0">
          <p className="text-2xl font-bold tracking-widest uppercase">Welcome</p>
          <p className="text-sm text-zinc-400">The doors have opened</p>
        </div>

        {/* Left door */}
        <div
          ref={doorLeftRef}
          className="absolute inset-y-0 left-0 w-1/2 overflow-hidden z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-800 to-amber-500 flex items-center justify-end pr-4">
            <div className="w-2 h-16 rounded-full bg-amber-200 opacity-60" />
          </div>
        </div>

        {/* Right door */}
        <div
          ref={doorRightRef}
          className="absolute inset-y-0 right-0 w-1/2 overflow-hidden z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-amber-800 to-amber-500 flex items-center justify-start pl-4">
            <div className="w-2 h-16 rounded-full bg-amber-200 opacity-60" />
          </div>
        </div>
      </section>

    </div>
  );
}
