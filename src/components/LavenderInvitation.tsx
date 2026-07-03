"use client";

import { DEFAULT_WISHES, type Wish } from "@/constants/data";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

import lavenderSparkle from "../../public/lottie/lavender-sparkle.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

// ── SVG butterfly drawn inline so we can animate each wing independently ──
const ButterflySVG = ({
  className,
  style,
  id,
}: {
  className?: string;
  style?: React.CSSProperties;
  id: string;
}) => (
  <svg
    id={id}
    viewBox="0 0 64 48"
    className={className}
    style={style}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Left wings */}
    <g className="wing-left" style={{ transformOrigin: "32px 24px" }}>
      <ellipse
        cx="18"
        cy="16"
        rx="16"
        ry="12"
        fill="#c4b5fd"
        fillOpacity="0.85"
      />
      <ellipse
        cx="14"
        cy="34"
        rx="11"
        ry="8"
        fill="#a78bfa"
        fillOpacity="0.7"
      />
    </g>
    {/* Right wings */}
    <g className="wing-right" style={{ transformOrigin: "32px 24px" }}>
      <ellipse
        cx="46"
        cy="16"
        rx="16"
        ry="12"
        fill="#c4b5fd"
        fillOpacity="0.85"
      />
      <ellipse
        cx="50"
        cy="34"
        rx="11"
        ry="8"
        fill="#a78bfa"
        fillOpacity="0.7"
      />
    </g>
    {/* Body */}
    <ellipse cx="32" cy="24" rx="3" ry="10" fill="#7c3aed" />
    {/* Antennae */}
    <line
      x1="32"
      y1="14"
      x2="24"
      y2="4"
      stroke="#7c3aed"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="23" cy="3" r="1.5" fill="#7c3aed" />
    <line
      x1="32"
      y1="14"
      x2="40"
      y2="4"
      stroke="#7c3aed"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="41" cy="3" r="1.5" fill="#7c3aed" />
  </svg>
);

// One floating butterfly with its own GSAP timeline
const Butterfly = ({
  id,
  size,
  startX,
  startY,
  delay,
}: {
  id: string;
  size: number;
  startX: string;
  startY: string;
  delay: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const wingLeft = el.querySelector(".wing-left") as SVGGElement | null;
    const wingRight = el.querySelector(".wing-right") as SVGGElement | null;

    // Wing-flap loop
    const flapTl = gsap.timeline({ repeat: -1 });
    if (wingLeft && wingRight) {
      flapTl
        .to(wingLeft, { scaleX: 0.15, duration: 0.18, ease: "power1.inOut" }, 0)
        .to(wingRight, { scaleX: 0.15, duration: 0.18, ease: "power1.inOut" }, 0)
        .to(wingLeft, { scaleX: 1, duration: 0.18, ease: "power1.inOut" })
        .to(wingRight, { scaleX: 1, duration: 0.18, ease: "power1.inOut" }, "<");
    }

    // Float path loop
    const floatTl = gsap.timeline({ repeat: -1, delay });
    floatTl
      .fromTo(
        el,
        { opacity: 0, x: 0, y: 0 },
        { opacity: 1, duration: 0.8, ease: "power1.out" }
      )
      .to(el, {
        x: gsap.utils.random(-60, 60),
        y: gsap.utils.random(-80, -160),
        rotation: gsap.utils.random(-20, 20),
        duration: gsap.utils.random(4, 7),
        ease: "sine.inOut",
      })
      .to(el, {
        x: gsap.utils.random(-80, 80),
        y: gsap.utils.random(-200, -320),
        rotation: gsap.utils.random(-30, 30),
        duration: gsap.utils.random(4, 7),
        ease: "sine.inOut",
      })
      .to(el, { opacity: 0, duration: 1, ease: "power1.in" }, "-=1")
      .set(el, { x: 0, y: 0, rotation: 0 });

    return () => {
      flapTl.kill();
      floatTl.kill();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute"
      style={{ left: startX, top: startY, width: size, height: size }}
    >
      <ButterflySVG id={id} className="w-full h-full" />
    </div>
  );
};

// ── Butterfly field spawned across the full invitation ──
const BUTTERFLIES = [
  { id: "bf-1", size: 36, startX: "10%", startY: "5%", delay: 0 },
  { id: "bf-2", size: 28, startX: "75%", startY: "12%", delay: 1.2 },
  { id: "bf-3", size: 44, startX: "55%", startY: "3%", delay: 2.5 },
  { id: "bf-4", size: 32, startX: "20%", startY: "30%", delay: 0.7 },
  { id: "bf-5", size: 38, startX: "80%", startY: "45%", delay: 3.1 },
  { id: "bf-6", size: 26, startX: "40%", startY: "60%", delay: 1.8 },
  { id: "bf-7", size: 34, startX: "65%", startY: "70%", delay: 4.0 },
  { id: "bf-8", size: 30, startX: "8%", startY: "80%", delay: 2.2 },
  { id: "bf-9", size: 42, startX: "88%", startY: "88%", delay: 0.4 },
  { id: "bf-10", size: 28, startX: "50%", startY: "92%", delay: 3.6 },
];

export const LavenderInvitation = () => {
  const mainRef = React.useRef<HTMLElement | null>(null);

  const [rsvpStatus, setRsvpStatus] = React.useState<string>("");
  const [guestCount, setGuestCount] = React.useState<number>(1);
  const [wishName, setWishName] = React.useState<string>("");
  const [wishRelation, setWishRelation] = React.useState<string>("មិត្តភក្តិ");
  const [wishContent, setWishContent] = React.useState<string>("");
  const [wishesList, setWishesList] = React.useState<Wish[]>(() => {
    if (typeof window === "undefined") return DEFAULT_WISHES;
    try {
      const saved = localStorage.getItem("wedding_wishes_lavender");
      return saved ? JSON.parse(saved) : DEFAULT_WISHES;
    } catch {
      return DEFAULT_WISHES;
    }
  });
  const [hasSubmittedRSVP, setHasSubmittedRSVP] = React.useState(false);

  // ── Scroll-reveal animations ──
  useGSAP(
    () => {
      if (!mainRef.current) return;

      const getFrom = (el: HTMLElement): gsap.TweenVars => {
        const dir = el.dataset.animate ?? "up";
        if (dir === "left") return { opacity: 0, x: -40 };
        if (dir === "right") return { opacity: 0, x: 40 };
        if (dir === "down") return { opacity: 0, y: -40 };
        if (dir === "scale") return { opacity: 0, scale: 0.8 };
        return { opacity: 0, y: 40 };
      };

      const toVars: gsap.TweenVars = {
        opacity: 1, x: 0, y: 0, scale: 1,
        duration: 0.7, ease: "power2.out",
      };

      mainRef.current.querySelectorAll<HTMLElement>(".scroll-reveal").forEach((el) => {
        gsap.set(el, getFrom(el));

        if (el.dataset.animateOnload !== undefined) {
          gsap.to(el, { ...toVars, delay: 0.3 });
          return;
        }

        const delay = el.dataset.animateDelay ? parseFloat(el.dataset.animateDelay) : 0;
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            scroller: mainRef.current,
            start: "top 100%",
            toggleActions: "play reverse play reverse",
          },
        }).to(el, { ...toVars, delay });
      });

      // ── Photo blinds dissolve ──
      const photoSection = mainRef.current.querySelector<HTMLElement>(".photo-section");
      const photoTileGrid = mainRef.current.querySelector<HTMLElement>(".photo-tile-grid");
      const photoText = mainRef.current.querySelector<HTMLElement>(".photo-text");

      if (photoSection && photoTileGrid && photoText) {
        const SLATS = 10;
        const center = (SLATS - 1) / 2;
        const slatEls: HTMLElement[] = [];
        const containerW = photoSection.offsetWidth;
        const containerH = photoSection.offsetHeight;
        const slatW = containerW / SLATS;

        gsap.set(photoText, { opacity: 0, y: 40 });

        const buildSlats = (imgW: number, imgH: number) => {
          const scale = Math.max(containerW / imgW, containerH / imgH);
          const coveredW = imgW * scale;
          const coveredH = imgH * scale;
          const offsetX = (containerW - coveredW) / 2;
          const offsetY = (containerH - coveredH) / 2;

          for (let i = 0; i < SLATS; i++) {
            const slat = document.createElement("div");
            slat.style.cssText = `
              position:absolute;height:100%;width:${100/SLATS}%;
              top:0;left:${i*(100/SLATS)}%;
              background-image:url('/wedding-photo.jpeg');
              background-size:${coveredW}px ${coveredH}px;
              background-position:${offsetX - i * slatW}px ${offsetY}px;
              background-repeat:no-repeat;
              transform-origin:center center;transform:scaleX(0);`;
            photoTileGrid.appendChild(slat);
            slatEls.push(slat);
          }

          const slatsFromCenter = [...slatEls].sort(
            (a, b) => Math.abs(slatEls.indexOf(a) - center) - Math.abs(slatEls.indexOf(b) - center)
          );

          const reveal = () => {
            gsap.set(slatEls, { scaleX: 0 });
            gsap.to(slatsFromCenter, {
              scaleX: 1, duration: 0.5, stagger: 0.07, ease: "power2.out",
              onComplete: () => gsap.to(photoText, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }),
            });
          };
          const reset = () => {
            gsap.killTweensOf([...slatEls, photoText]);
            gsap.set(slatEls, { scaleX: 0 });
            gsap.set(photoText, { opacity: 0, y: 40 });
          };

          ScrollTrigger.create({
            trigger: photoSection,
            scroller: mainRef.current,
            start: "top 100%",
            onEnter: reveal, onLeaveBack: reset,
            onEnterBack: reveal, onLeave: reset,
          });
        };

        const img = new window.Image();
        img.src = "/wedding-photo.jpeg";
        if (img.complete) buildSlats(img.naturalWidth, img.naturalHeight);
        else img.onload = () => buildSlats(img.naturalWidth, img.naturalHeight);
      }
    },
    { scope: mainRef }
  );

  const handleSubmitRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishContent.trim()) return;

    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      name: wishName,
      relation: wishRelation,
      content: wishContent,
      timestamp: "ទើបតែឥឡូវនេះ",
    };
    const updated = [newWish, ...wishesList];
    setWishesList(updated);
    localStorage.setItem("wedding_wishes_lavender", JSON.stringify(updated));
    setHasSubmittedRSVP(true);
    setWishContent("");
  };

  return (
    <div className="relative flex flex-col flex-1 items-center justify-center bg-[#f5f0ff] font-kantumruy no-scrollbar">
      {/* Lottie lavender sparkle overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 max-w-md mx-auto left-0 right-0 overflow-hidden">
        <Lottie
          animationData={lavenderSparkle}
          loop
          autoplay
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        />
      </div>

      {/* ── Butterfly field (fixed overlay) ── */}
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden max-w-md mx-auto left-0 right-0">
        {BUTTERFLIES.map((b) => (
          <Butterfly key={b.id} {...b} />
        ))}
      </div>

      <main
        ref={mainRef}
        className="relative flex flex-col w-full max-w-md overflow-y-auto overflow-x-hidden min-h-screen h-screen snap-y snap-mandatory no-scrollbar"
      >
        {/* ═══════════════ SECTION 1 — HERO ═══════════════ */}
        <section className="relative flex flex-1 w-full flex-col items-center justify-center bg-gradient-to-b from-[#ede9fe] to-[#f5f0ff] overflow-hidden shadow-xl min-h-screen h-screen snap-start">
          {/* Lavender floral top-left */}
          <div className="scroll-reveal absolute top-0 left-0 w-44 h-44 opacity-70" data-animate="down" data-animate-onload="">
            <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
              <circle cx="40" cy="30" r="18" fill="#c4b5fd" fillOpacity="0.6" />
              <circle cx="70" cy="15" r="12" fill="#a78bfa" fillOpacity="0.5" />
              <circle cx="25" cy="60" r="14" fill="#ddd6fe" fillOpacity="0.7" />
              <circle cx="55" cy="55" r="10" fill="#c4b5fd" fillOpacity="0.5" />
              <circle cx="80" cy="40" r="9" fill="#ede9fe" fillOpacity="0.8" />
              {/* Stems */}
              <line x1="40" y1="48" x2="30" y2="100" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
              <line x1="70" y1="27" x2="60" y2="100" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
              <line x1="25" y1="74" x2="20" y2="120" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Lavender floral top-right */}
          <div className="scroll-reveal absolute top-0 right-0 w-44 h-44 opacity-70 -scale-x-100" data-animate="down" data-animate-onload="">
            <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
              <circle cx="40" cy="30" r="18" fill="#c4b5fd" fillOpacity="0.6" />
              <circle cx="70" cy="15" r="12" fill="#a78bfa" fillOpacity="0.5" />
              <circle cx="25" cy="60" r="14" fill="#ddd6fe" fillOpacity="0.7" />
              <circle cx="55" cy="55" r="10" fill="#c4b5fd" fillOpacity="0.5" />
              <circle cx="80" cy="40" r="9" fill="#ede9fe" fillOpacity="0.8" />
              <line x1="40" y1="48" x2="30" y2="100" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
              <line x1="70" y1="27" x2="60" y2="100" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
              <line x1="25" y1="74" x2="20" y2="120" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="w-full h-full flex flex-col items-center justify-between text-center pt-16 pb-10 px-6">
            {/* Title */}
            <h1
              className="scroll-reveal text-2xl font-moul text-violet-800 leading-relaxed"
              data-animate="down"
              data-animate-onload=""
            >
              សិរីសួស្ដី
              <br />
              អាពាហ៍ពិពាហ៍
            </h1>

            {/* Couple initials inside ornament circle */}
            <div
              className="scroll-reveal relative flex flex-col items-center"
              data-animate="scale"
              data-animate-onload=""
            >
              {/* Decorative ring */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full" fill="none">
                  <circle cx="80" cy="80" r="72" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.6" />
                  <circle cx="80" cy="80" r="64" stroke="#c4b5fd" strokeWidth="0.8" strokeOpacity="0.4" />
                  {/* Small flowers on ring */}
                  {[0,60,120,180,240,300].map((deg, i) => {
                    const rad = (deg * Math.PI) / 180;
                    const x = 80 + 72 * Math.cos(rad);
                    const y = 80 + 72 * Math.sin(rad);
                    return <circle key={i} cx={x} cy={y} r="4" fill="#a78bfa" fillOpacity="0.7" />;
                  })}
                </svg>
                <h2 className="relative z-10 text-6xl font-moul text-violet-700 leading-none">
                  បស
                </h2>
              </div>

              <p className="text-sm tracking-[0.3em] text-violet-500 font-playfair uppercase mt-1">
                ០៩ · ០៦ · ២០២៦
              </p>
            </div>

            {/* Guest invite */}
            <div
              className="scroll-reveal w-full flex flex-col items-center gap-3"
              data-animate="up"
              data-animate-onload=""
            >
              <p className="text-base font-kantumruy text-violet-700 font-medium">
                សូមគោរពអញ្ជើញ
              </p>

              <Link
                href="#lavender-details"
                className="relative flex items-center justify-center w-2/3 min-h-14 cursor-pointer active:scale-95 transition-transform duration-150"
              >
                {/* Decorative name banner */}
                <svg viewBox="0 0 200 56" className="absolute inset-0 w-full h-full" fill="none">
                  <rect x="2" y="2" width="196" height="52" rx="26" fill="#ede9fe" stroke="#a78bfa" strokeWidth="1.5"/>
                  <circle cx="2" cy="28" r="5" fill="#c4b5fd"/>
                  <circle cx="198" cy="28" r="5" fill="#c4b5fd"/>
                  <circle cx="100" cy="2" r="4" fill="#a78bfa" fillOpacity="0.5"/>
                  <circle cx="100" cy="54" r="4" fill="#a78bfa" fillOpacity="0.5"/>
                </svg>
                <span className="relative z-10 text-base font-bold font-moul text-violet-800 px-6">
                  លោក ស្រី សុខា
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 2 — PHOTO ═══════════════ */}
        <section className="photo-section relative w-full h-screen min-h-screen snap-start flex items-end overflow-hidden">
          <Image
            src="/wedding-photo.jpeg"
            alt="Wedding Photography"
            width={1000}
            height={600}
            className="absolute w-full h-full object-cover"
          />
          <div className="photo-tile-grid absolute inset-0 z-10" />
          <div className="photo-text relative z-20 w-full bg-gradient-to-t from-[#2e1065cc] to-transparent p-6 text-center">
            <h2 className="text-5xl text-violet-100 mb-2 font-parisienne">
              Save the Date
            </h2>
            <p className="text-violet-200 text-base font-kantumruy tracking-widest">
              TUESDAY, JUNE 9TH, 2026
            </p>
          </div>
        </section>

        {/* ═══════════════ SECTION 3 — DETAILS ═══════════════ */}
        <section
          id="lavender-details"
          className="relative z-10 flex w-full flex-col items-center bg-gradient-to-b from-[#ede9fe] to-[#f5f0ff] snap-start"
        >
          {/* Floral side accents */}
          <div className="pointer-events-none absolute top-0 left-0 w-24 h-64 opacity-30">
            <svg viewBox="0 0 80 200" className="w-full h-full" fill="none">
              {[30,60,90,120,150].map((y,i) => (
                <circle key={i} cx="20" cy={y} r="12" fill="#a78bfa"/>
              ))}
              <line x1="20" y1="0" x2="20" y2="200" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.4"/>
            </svg>
          </div>
          <div className="pointer-events-none absolute top-0 right-0 w-24 h-64 opacity-30">
            <svg viewBox="0 0 80 200" className="w-full h-full" fill="none">
              {[30,60,90,120,150].map((y,i) => (
                <circle key={i} cx="60" cy={y} r="12" fill="#a78bfa"/>
              ))}
              <line x1="60" y1="0" x2="60" y2="200" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.4"/>
            </svg>
          </div>

          {/* Header */}
          <div className="scroll-reveal text-center px-6 pt-14 pb-6 flex flex-col items-center" data-animate="up">
            <span className="text-[#7c3aed] text-xs font-playfair tracking-[0.3em] uppercase font-bold mb-2">
              Wedding Invitation
            </span>
            <h2 className="font-moul text-xl leading-relaxed text-violet-800 mb-3">
              សេចក្ដីជូនដំណឹង
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-12 h-px bg-[#a78bfa] opacity-50" />
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="#a78bfa" fillOpacity="0.7">
                <path d="M10 2 L11.8 7.4 L17.6 7.4 L12.9 10.6 L14.7 16 L10 12.8 L5.3 16 L7.1 10.6 L2.4 7.4 L8.2 7.4 Z"/>
              </svg>
              <div className="w-12 h-px bg-[#a78bfa] opacity-50" />
            </div>
          </div>

          {/* Parents */}
          <section className="scroll-reveal w-full px-6 flex flex-col gap-4 text-center" data-animate="left">
            <div className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-violet-200/50 shadow-sm flex flex-col items-center">
              <span className="text-xs text-violet-600 font-bold uppercase tracking-wider mb-2">
                មាតាបិតាខាងកូនកំលោះ
              </span>
              <div className="flex flex-col gap-1 text-sm font-bold text-violet-900">
                <p>លោក ចាន់ នាក់</p>
                <p>លោកស្រី ចាន់ ណារុំ</p>
              </div>
              <div className="w-8 h-px bg-violet-200 my-3" />
              <span className="text-xs text-violet-500 font-medium mb-1">
                មានកិត្តិយសរៀបចំអាពាហ៍ពិពាហ៍កូនប្រុស
              </span>
              <p className="font-moul text-base text-violet-800 leading-relaxed">
                គូរតតម្លែ
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-violet-200/50 shadow-sm flex flex-col items-center">
              <span className="text-xs text-violet-600 font-bold uppercase tracking-wider mb-2">
                មាតាបិតាខាងកូនស្រី
              </span>
              <div className="flex flex-col gap-1 text-sm font-bold text-violet-900">
                <p>លោក សុខ ចន្ទ</p>
                <p>លោកស្រី សុខ ម៉ារ</p>
              </div>
              <div className="w-8 h-px bg-violet-200 my-3" />
              <span className="text-xs text-violet-500 font-medium mb-1">
                មានកិត្តិយសរៀបចំអាពាហ៍ពិពាហ៍កូនស្រី
              </span>
              <p className="font-moul text-base text-violet-800 leading-relaxed">
                គូរសសតំ
              </p>
            </div>
          </section>

          {/* Couple circle accent */}
          <section className="scroll-reveal relative w-full my-10 flex flex-col items-center" data-animate="scale">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg z-10 ring-2 ring-violet-300/50">
              <Image src="/heart-to-heart-thumbnail.png" alt="Love" fill className="object-cover" />
            </div>
            <div className="absolute w-3/5 h-px bg-violet-300/30 top-1/2" />
          </section>

          {/* Program */}
          <section className="w-full px-6 flex flex-col items-center">
            <h3 className="scroll-reveal font-moul text-xl text-violet-800 mb-8 leading-relaxed text-center" data-animate="up">
              កម្មវិធីអាពាហ៍ពិពាហ៍
            </h3>

            <div className="scroll-reveal relative w-full pl-8 border-l-2 border-violet-300/40 flex flex-col gap-8 text-left pb-4" data-animate="left">
              {[
                { time: "07:00 AM", title: "ពិធីហែជំនូន", desc: "ជួបជុំសាច់ញាតិ និងភ្ញៀវកិត្តិយស ដើម្បីហែរជំនូន និងផ្លែឈើបង្ការចូលភូមិដ្ឋានខាងស្រី។" },
                { time: "08:30 AM", title: "ពិធីកិច្ចសែនព្រេន និង កាត់សក់បង្កក់សិរី", desc: "បង្កក់សិរីមង្គលជ័យជូនដល់គូស្វាមីភរិយាថ្មី ដោយមានការចូលរួមពីចាស់ទុំសងខាង។" },
                { time: "16:00 PM", title: "ពិធីសែនចងដៃបង្កក់សិរី", desc: "ពិធីចងអំបោះក្រហមនៅលើកដៃជូនពរជ័យ និងបំពាក់ចិញ្ចៀនអាពាហ៍ពិពាហ៍។" },
                { time: "17:30 PM", title: "ពិធីពិសាភោជនាហារ", desc: "សូមអញ្ជើញភ្ញៀវកិត្តិយសទាំងអស់ចូលរួមពិសាភោជនាហារ និងរាំលេងកម្សាន្ត។" },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-9.75 top-1 w-4 h-4 rounded-full bg-gradient-to-tr from-violet-500 to-purple-300 border-4 border-[#ede9fe] shadow" />
                  <span className="font-kantumruy text-violet-600 text-sm font-bold bg-violet-100/60 px-2.5 py-0.5 rounded-full border border-violet-200/40">
                    {item.time}
                  </span>
                  <h4 className="text-sm font-bold text-violet-900 mt-2 font-moul leading-relaxed">
                    {item.title}
                  </h4>
                  <p className="text-xs text-violet-500 mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Venue */}
          <section className="scroll-reveal w-full px-6 py-10 flex flex-col items-center border-t border-violet-100 mt-8" data-animate="right">
            <h3 className="font-moul text-xl text-violet-800 mb-6 leading-relaxed text-center">
              ទីតាំងប្រារព្ធពិធី
            </h3>
            <div className="w-full bg-white/70 backdrop-blur-sm rounded-2xl border border-violet-200/40 p-6 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-3">📍</span>
              <h4 className="text-sm font-semibold text-violet-900 mb-1 leading-relaxed">
                មជ្ឈមណ្ឌលរៀបចំពិធីមង្គលការ សែនសុខ
              </h4>
              <p className="text-xs text-violet-500 px-4 leading-relaxed">
                អគារ A1, ផ្លូវ 1986, សង្កាត់ភ្នំពេញថ្មី, ខណ្ឌសែនសុខ, រាជធានីភ្នំពេញ។
              </p>
              <a
                href="https://maps.app.goo.gl/oaZHDYx28tCHKTcs6"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold py-2.5 px-6 rounded-xl shadow-md transition-colors duration-300"
              >
                បើកមើលផែនទី Google Maps
              </a>
            </div>
          </section>

          {/* RSVP */}
          <section className="scroll-reveal w-full px-6 py-10 flex flex-col items-center bg-white/30" data-animate="up">
            <h3 className="font-moul text-xl text-violet-800 mb-6 leading-relaxed text-center">
              បញ្ជាក់ការចូលរួម និងពាក្យជូនពរ
            </h3>

            <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-violet-200/40 p-6 shadow-md">
              {hasSubmittedRSVP ? (
                <div className="text-center py-6 flex flex-col items-center gap-3">
                  <span className="text-4xl animate-bounce">🙏✨</span>
                  <h4 className="text-base font-bold text-violet-800 leading-relaxed">
                    សូមអរគុណយ៉ាងជ្រាលជ្រៅ!
                  </h4>
                  <p className="text-sm text-violet-500 px-4 leading-relaxed">
                    ការឆ្លើយតប និងពាក្យជូនពរដ៏មានតម្លៃរបស់អ្នកត្រូវបានរក្សាទុកដោយជោគជ័យ។
                    យើងទន្ទឹងរង់ចាំជួបអ្នកក្នុងថ្ងៃមង្គលការ!
                  </p>
                  <button
                    onClick={() => setHasSubmittedRSVP(false)}
                    className="mt-4 text-violet-600 text-sm font-bold border-b border-violet-400 hover:text-violet-800 transition-colors"
                  >
                    ផ្ញើសារជូនពរម្ដងទៀត
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitRSVP} className="flex flex-col gap-4 text-left">
                  <div className="flex flex-col">
                    <label htmlFor="lv-name" className="text-xs text-violet-700 font-bold mb-1">ឈ្មោះរបស់អ្នក</label>
                    <input
                      id="lv-name" type="text" required
                      placeholder="សូមបញ្ចូលឈ្មោះ..."
                      value={wishName} onChange={(e) => setWishName(e.target.value)}
                      className="w-full text-sm p-3 rounded-xl border border-violet-200 bg-[#f5f0ff] focus:outline-none focus:ring-2 focus:ring-violet-400/40 text-violet-900"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="lv-relation" className="text-xs text-violet-700 font-bold mb-1">ត្រូវជាអ្វីនឹងម្ចាស់ដើមការ</label>
                    <select
                      id="lv-relation" value={wishRelation}
                      onChange={(e) => setWishRelation(e.target.value)}
                      className="w-full text-sm p-3 rounded-xl border border-violet-200 bg-[#f5f0ff] focus:outline-none focus:ring-2 focus:ring-violet-400/40 text-violet-900"
                    >
                      <option value="មិត្តភក្តិ">មិត្តភក្តិ</option>
                      <option value="សាច់ញាតិខាងកូនកំលោះ">សាច់ញាតិខាងកូនកំលោះ</option>
                      <option value="សាច់ញាតិខាងកូនស្រី">សាច់ញាតិខាងកូនស្រី</option>
                      <option value="មិត្តរួមការងារ">មិត្តរួមការងារ</option>
                      <option value="ភ្ញៀវកិត្តិយស">ភ្ញៀវកិត្តិយស</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs text-violet-700 font-bold mb-1">តើអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ?</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button type="button" onClick={() => setRsvpStatus("attending")}
                        className={`p-3 rounded-xl border text-sm font-bold text-center transition-all ${
                          rsvpStatus === "attending"
                            ? "bg-violet-100 border-violet-500 text-violet-800 shadow-inner"
                            : "border-violet-200 text-violet-500 hover:bg-violet-50"
                        }`}>
                        រីករាយនឹងចូលរួម 🎉
                      </button>
                      <button type="button" onClick={() => setRsvpStatus("declined")}
                        className={`p-3 rounded-xl border text-sm font-bold text-center transition-all ${
                          rsvpStatus === "declined"
                            ? "bg-red-50 border-red-300 text-red-700 shadow-inner"
                            : "border-violet-200 text-violet-500 hover:bg-violet-50"
                        }`}>
                        សូមអភ័យទោស 🙏
                      </button>
                    </div>
                  </div>

                  {rsvpStatus === "attending" && (
                    <div className="flex flex-col">
                      <label htmlFor="lv-count" className="text-xs text-violet-700 font-bold mb-1">ចំនួនអ្នកចូលរួម</label>
                      <select
                        id="lv-count" value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full text-sm p-3 rounded-xl border border-violet-200 bg-[#f5f0ff] focus:outline-none focus:ring-2 focus:ring-violet-400/40 text-violet-900"
                      >
                        <option value={1}>1 នាក់</option>
                        <option value={2}>2 នាក់</option>
                        <option value={3}>3 នាក់</option>
                        <option value={4}>4 នាក់</option>
                        <option value={5}>ច្រើនជាង 4 នាក់</option>
                      </select>
                    </div>
                  )}

                  <div className="flex flex-col">
                    <label htmlFor="lv-content" className="text-xs text-violet-700 font-bold mb-1">ពាក្យជូនពរ / សារជូនពរ</label>
                    <textarea
                      id="lv-content" required rows={3}
                      placeholder="សូមសរសេរពាក្យជូនពររបស់លោកអ្នកទីនេះ..."
                      value={wishContent} onChange={(e) => setWishContent(e.target.value)}
                      className="w-full text-sm p-3 rounded-xl border border-violet-200 bg-[#f5f0ff] focus:outline-none focus:ring-2 focus:ring-violet-400/40 text-violet-900 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold py-3.5 rounded-xl shadow-md transition-colors duration-300 mt-2"
                  >
                    ផ្ញើការឆ្លើយតប និងពាក្យជូនពរ
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Wishes wall */}
          <section className="scroll-reveal w-full px-6 py-6 flex flex-col items-center" data-animate="up">
            <h3 className="font-moul text-xl text-violet-800 mb-6 leading-relaxed text-center">
              ពាក្យជូនពរពីភ្ញៀវកិត្តិយស
            </h3>
            <div className="w-full flex flex-col gap-4">
              {wishesList.map((wish) => (
                <div
                  key={wish.id}
                  className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-violet-200/20 shadow-sm flex flex-col text-left relative overflow-hidden"
                >
                  <span className="absolute right-4 top-4 text-violet-300/30 text-2xl">🦋</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-violet-900 font-moul leading-relaxed">{wish.name}</span>
                    <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">{wish.relation}</span>
                  </div>
                  <p className="text-sm text-violet-600 mt-2 leading-relaxed italic">"{wish.content}"</p>
                  <span className="text-xs text-violet-400 mt-2">{wish.timestamp}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="w-full py-8 px-6 text-center border-t border-violet-200/30 bg-violet-100/40 mt-6 flex flex-col items-center">
            {/* Small lavender ornament */}
            <svg viewBox="0 0 80 40" className="w-20 h-10 mb-3" fill="none">
              <circle cx="20" cy="20" r="8" fill="#c4b5fd" fillOpacity="0.7"/>
              <circle cx="40" cy="12" r="6" fill="#a78bfa" fillOpacity="0.6"/>
              <circle cx="60" cy="20" r="8" fill="#c4b5fd" fillOpacity="0.7"/>
              <line x1="20" y1="28" x2="20" y2="40" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.3"/>
              <line x1="40" y1="18" x2="40" y2="40" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.3"/>
              <line x1="60" y1="28" x2="60" y2="40" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.3"/>
            </svg>
            <p className="font-moul text-base text-violet-700 leading-relaxed">
              សូមអរគុណយ៉ាងជ្រាលជ្រៅ
            </p>
            <span className="text-sm text-violet-400 font-playfair tracking-widest uppercase mt-1">
              Thank You
            </span>
          </footer>
        </section>
      </main>
    </div>
  );
};
