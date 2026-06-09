"use client";

import { DEFAULT_WISHES, type Wish } from "@/constants/data";
import Image from "next/image";
import React from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import Link from "next/link";

// Main entry of invitation card in premium Khmer style
export const MainInvitation = () => {
  const mainRef = React.useRef<HTMLElement | null>(null);

  // State Management
  const [rsvpStatus, setRsvpStatus] = React.useState<string>(""); // 'attending' | 'declined'
  const [guestCount, setGuestCount] = React.useState<number>(1);
  const [wishName, setWishName] = React.useState<string>("");
  const [wishRelation, setWishRelation] = React.useState<string>("មិត្តភក្តិ");
  const [wishContent, setWishContent] = React.useState<string>("");
  const [wishesList, setWishesList] = React.useState<Wish[]>(() => {
    if (typeof window === "undefined") return DEFAULT_WISHES;

    try {
      const saved = localStorage.getItem("wedding_wishes_khmer");
      return saved ? JSON.parse(saved) : DEFAULT_WISHES;
    } catch (error) {
      console.error("Error reading saved wishes", error);
      return DEFAULT_WISHES;
    }
  });
  const [hasSubmittedRSVP, setHasSubmittedRSVP] =
    React.useState<boolean>(false);

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
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      };

      const targets =
        mainRef.current.querySelectorAll<HTMLElement>(".scroll-reveal");

      targets.forEach((el) => {
        gsap.set(el, getFrom(el));

        if (el.dataset.animateOnload !== undefined) {
          gsap.to(el, { ...toVars, delay: 0.3 });
          return;
        }

        const delay = el.dataset.animateDelay
          ? parseFloat(el.dataset.animateDelay)
          : 0;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              scroller: mainRef.current,
              start: "top 100%",
              toggleActions: "play reverse play reverse",
            },
          })
          .to(el, { ...toVars, delay });
      });

      // Photo section: trigger on the section, animate image scale-down + text fade-up
      const photoSection =
        mainRef.current.querySelector<HTMLElement>(".photo-section");
      const photoImg = mainRef.current.querySelector<HTMLElement>(".photo-img");
      const photoText =
        mainRef.current.querySelector<HTMLElement>(".photo-text");

      if (photoSection && photoImg && photoText) {
        gsap.set(photoImg, { opacity: 0, scale: 1.15 });
        gsap.set(photoText, { opacity: 0, y: 40 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: photoSection,
              scroller: mainRef.current,
              start: "top 100%",
              toggleActions: "play reverse play reverse",
            },
          })
          .to(photoImg, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          })
          .to(
            photoText,
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.6",
          );
      }
    },
    { scope: mainRef },
  );

  React.useEffect(() => {
    const initParticles = async () => {
      await loadSlim(tsParticles);

      await tsParticles.load({
        id: "tsparticles",
        options: {
          fullScreen: false,
          particles: {
            number: {
              value: 80,
            },

            shape: {
              type: "circle",
            },

            color: {
              value: ["#d4af37", "#eddca7"],
            },

            size: {
              value: {
                min: 1,
                max: 4,
              },
            },

            opacity: {
              value: {
                min: 0.1,
                max: 0.6,
              },
            },

            move: {
              enable: true,
              direction: "bottom",
              speed: 0.8,
              outModes: {
                default: "out",
              },
            },
          },
        },
      });

      const canvas = document.querySelector(
        "#tsparticles canvas",
      ) as HTMLCanvasElement;

      if (canvas) {
        canvas.style.zIndex = "0";
        canvas.style.pointerEvents = "none";
      }
    };

    initParticles();
  }, []);

  // Handle RSVP & wish submission
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

    const updatedWishes = [newWish, ...wishesList];
    setWishesList(updatedWishes);
    localStorage.setItem("wedding_wishes_khmer", JSON.stringify(updatedWishes));

    setHasSubmittedRSVP(true);
    setWishContent(""); // Reset only content so they can type another if they want
  };

  return (
    <div className="relative flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-[#1a1715] font-kantumruy no-scrollbar">
      <div
        id="tsparticles"
        className="max-w-md mx-auto overflow-x-hidden pointer-events-none absolute inset-0 z-20 overflow-hidden"
      />

      <main
        ref={mainRef}
        className="relative flex flex-col w-full max-w-md overflow-y-auto overflow-x-hidden min-h-screen h-screen snap-y snap-mandatory no-scrollbar"
      >
        {/* ================== INTRO INVITATION ================== */}
        <section className="relative flex flex-1 w-full max-w-md flex-col items-center justify-center bg-white dark:bg-[#2d261f] overflow-hidden shadow-xl min-h-screen h-screen snap-start">
          {/* Top ornament */}
          <Image
            src="/frame/ornament.png"
            alt=""
            width={1000}
            height={300}
            className="scroll-reveal absolute object-contain -top-48 left-0 max-h-64"
            priority
            data-animate="down"
          />

          <div className="w-full h-full flex flex-col items-center justify-between text-center pt-20 pb-10 px-6">
            <h1
              className="scroll-reveal text-3xl font-moul text-amber-800 dark:text-[#f3e5ab] leading-relaxed"
              data-animate="up"
            >
              សិរីសួស្ដីអាពាហ៍ពិពាហ៍
            </h1>

            <div
              className="scroll-reveal relative w-full flex items-center justify-center flex-col"
              data-animate="up"
            >
              <Image
                src="/heart-to-heart-thumbnail.png"
                alt=""
                width={1000}
                height={300}
                className="absolute object-contain w-2/4 h-auto opacity-95"
              />
              <h1 className="relative z-10 text-7xl font-moul text-amber-900 dark:text-[#eddca7] leading-[0.7] mt-44">
                វស
              </h1>
              {/* Date */}
              <p className="relative z-10 text-3xl font-kantumruy font-medium text-zinc-700 dark:text-zinc-300 mt-7">
                ០៩.០៦.២០២៦
              </p>
            </div>

            <div
              className="scroll-reveal w-full relative flex flex-col items-center"
              data-animate="up"
            >
              <p className="text-xl font-kantumruy font-medium text-zinc-600 dark:text-zinc-300">
                សូមគោរពអញ្ជើញ
              </p>

              <Link
                href="#invitation-details"
                className="relative w-full flex items-center justify-center flex-col mt-6 min-h-20 cursor-pointer active:scale-95 duration-150 ease-out transition-transform"
              >
                <Image
                  src="/frame/decoration-border-name.png"
                  alt=""
                  width={200}
                  height={100}
                  className="absolute object-center w-2/3 h-auto opacity-90"
                />
                <h4 className="relative z-10 text-xl font-bold font-moul text-amber-950 dark:text-[#f3e5ab] px-4 py-2">
                  លោក ស្រី សុខា
                </h4>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= WEDDING PHOTOGRAPHY ================= */}
        <section className="photo-section relative w-full h-screen min-h-screen snap-start flex items-end overflow-hidden">
          <Image
            src={"/wedding-photo.jpeg"}
            alt="Wedding Photography"
            width={1000}
            height={600}
            className="photo-img absolute w-full h-full object-cover"
          />
          <div className="photo-text relative z-10 w-full bg-gradient-to-t from-[#111] to-transparent p-6 text-center">
            <h2 className="text-5xl text-amber-100 mb-2 font-parisienne">
              Save the Date
            </h2>
            <p className="text-amber-100 text-base font-kantumruy">
              TUESDAY, JUNE 9TH, 2026
            </p>
          </div>
        </section>

        {/* ================= INVITATION DETAILS & PROGRAM ================= */}
        <section
          id="invitation-details"
          className="relative z-10 flex w-full flex-col items-center bg-[#faf8f5] dark:bg-[#2d261f] snap-start"
        >
          {/* Left ornament decoration */}
          <Image
            src="/frame/ornament.png"
            alt=""
            width={300}
            height={1000}
            className="object-contain fixed -left-65 bottom-0 h-125 w-auto -rotate-90 opacity-20"
          />

          {/* Right ornament decoration */}
          <Image
            src="/frame/ornament.png"
            alt=""
            width={300}
            height={1000}
            className="object-contain fixed -right-65 bottom-0 h-125 w-auto rotate-90 opacity-20"
          />

          {/* Top Ornament */}
          <div
            className="scroll-reveal relative w-20 h-20 mt-12 mb-4"
            data-animate="scale"
          >
            <Image
              src="/frame/ornament.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Top Left Flower */}
          <div
            className="scroll-reveal absolute top-0 left-0 w-40 h-40"
            data-animate="down"
            data-animate-delay="1"
          >
            <Image
              src="/frame/flower.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Top Right Flower */}
          <div
            className="scroll-reveal absolute top-0 right-0 w-40 h-40"
            data-animate="down"
            data-animate-delay="1"
          >
            <Image
              src="/frame/flower.png"
              alt=""
              fill
              className="object-contain -scale-x-100"
            />
          </div>

          {/* ================= HEADER SECTION ================= */}
          <div
            className="scroll-reveal text-center px-6 pt-2 pb-8 flex flex-col items-center"
            data-animate="up"
          >
            <span className="text-[#aa7c11] text-base font-playfair tracking-[0.25em] uppercase font-bold mb-1">
              Wedding Invitation
            </span>
            <h2 className="font-moul text-xl leading-relaxed text-amber-800 dark:text-[#f3e5ab] mb-4">
              សេចក្ដីជូនដំណឹង
            </h2>
            <div className="w-16 h-[1.5px] bg-[#d4af37] opacity-60"></div>
          </div>

          {/* ================= PARENTS DETAILS ================= */}
          <section
            className="scroll-reveal w-full px-6 flex flex-col gap-6 text-center"
            data-animate="left"
          >
            {/* Groom Parents Panel */}
            <div className="bg-[#fdfcf9] dark:bg-[#1a1715]/40 p-5 rounded-2xl border border-amber-200/20 shadow-sm flex flex-col items-center">
              <span className="text-sm text-amber-700 dark:text-[#d4af37] font-bold uppercase tracking-wider mb-2">
                មាតាបិតាខាងកូនកំលោះ
              </span>
              <div className="flex flex-col gap-1 text-base font-bold text-zinc-800 dark:text-zinc-200">
                <p>លោក សុខ សារិន</p>
                <p>លោកស្រី ម៉ៅ សុភី</p>
              </div>
              <div className="w-8 h-px bg-amber-200/50 my-3"></div>
              <span className="text-sm text-zinc-500 font-medium mb-1">
                មានកិត្តិយសរៀបចំអាពាហ៍ពិពាហ៍កូនប្រុស
              </span>
              <p className="font-moul text-base text-amber-900 dark:text-[#eddca7] leading-relaxed">
                សុខ វឌ្ឍនា
              </p>
            </div>

            {/* Bride Parents Panel */}
            <div className="bg-[#fdfcf9] dark:bg-[#1a1715]/40 p-5 rounded-2xl border border-amber-200/20 shadow-sm flex flex-col items-center">
              <span className="text-sm text-amber-700 dark:text-[#d4af37] font-bold uppercase tracking-wider mb-2">
                មាតាបិតាខាងកូនស្រី
              </span>
              <div className="flex flex-col gap-1 text-base font-bold text-zinc-800 dark:text-zinc-200">
                <p>លោក ចាន់ សុជាតិ</p>
                <p>លោកស្រី ហ៊ឹម ស្រីមុំ</p>
              </div>
              <div className="w-8 h-px bg-amber-200/50 my-3"></div>
              <span className="text-sm text-zinc-500 font-medium mb-1">
                មានកិត្តិយសរៀបចំអាពាហ៍ពិពាហ៍កូនស្រី
              </span>
              <p className="font-moul text-base text-amber-900 dark:text-[#eddca7] leading-relaxed">
                ចាន់ ស្រីនាថ
              </p>
            </div>
          </section>

          {/* ================= HEART IMAGE ACCENT ================= */}
          <section
            className="scroll-reveal relative w-full my-12 flex flex-col items-center justify-center"
            data-animate="scale"
          >
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-[#1a1715] shadow-lg z-10">
              <Image
                src="/heart-to-heart-thumbnail.png"
                alt="Love"
                fill
                className="object-cover"
              />
            </div>
            {/* Subtle connecting lines */}
            <div className="absolute w-2/3 h-px bg-amber-300/30 top-1/2"></div>
          </section>

          {/* ================= PROGRAM SCHEDULING ================= */}
          <section className="translate-y-8 w-full px-6 flex flex-col items-center">
            <h3
              className="scroll-reveal font-moul text-xl text-amber-800 dark:text-[#f3e5ab] mb-8 leading-relaxed text-center"
              data-animate="up"
            >
              កម្មវិធីអាពាហ៍ពិពាហ៍
            </h3>

            <div
              className="scroll-reveal relative w-full pl-8 border-l-2 border-[#eddca7]/40 flex flex-col gap-8 text-left pb-4"
              data-animate="left"
            >
              {/* Ceremony 1 */}
              <div className="relative">
                {/* Timeline pin */}
                <span className="absolute -left-9.75 top-1 w-4 h-4 rounded-full bg-gradient-to-tr from-amber-600 to-[#d4af37] border-4 border-[#faf8f5] dark:border-[#2d261f] shadow"></span>

                <span className="font-kantumruy text-[#aa7c11] dark:text-[#f3e5ab] text-sm font-bold bg-[#f5efe5] dark:bg-[#1a1715] px-2.5 py-0.5 rounded-full border border-amber-200/30">
                  07:00 AM
                </span>
                <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mt-2 font-moul leading-relaxed">
                  ពិធីហែជំនូន
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  ជួបជុំសាច់ញាតិ និងភ្ញៀវកិត្តិយស ដើម្បីហែរជំនូន
                  និងផ្លែឈើបង្ការចូលភូមិដ្ឋានខាងស្រី។
                </p>
              </div>

              {/* Ceremony 2 */}
              <div className="relative">
                <span className="absolute -left-9.75 top-1 w-4 h-4 rounded-full bg-gradient-to-tr from-amber-600 to-[#d4af37] border-4 border-[#faf8f5] dark:border-[#2d261f] shadow"></span>

                <span className="font-kantumruy text-[#aa7c11] dark:text-[#f3e5ab] text-sm font-bold bg-[#f5efe5] dark:bg-[#1a1715] px-2.5 py-0.5 rounded-full border border-amber-200/30">
                  08:30 AM
                </span>
                <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mt-2 font-moul leading-relaxed">
                  ពិធីកិច្ចសែនព្រេន និង កាត់សក់បង្កក់សិរី
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  បង្កក់សិរីមង្គលជ័យជូនដល់គូស្វាមីភរិយាថ្មី
                  ដោយមានការចូលរួមពីចាស់ទុំសងខាង។
                </p>
              </div>

              {/* Ceremony 3 */}
              <div className="relative">
                <span className="absolute -left-9.75 top-1 w-4 h-4 rounded-full bg-gradient-to-tr from-amber-600 to-[#d4af37] border-4 border-[#faf8f5] dark:border-[#2d261f] shadow"></span>

                <span className="font-kantumruy text-[#aa7c11] dark:text-[#f3e5ab] text-sm font-bold bg-[#f5efe5] dark:bg-[#1a1715] px-2.5 py-0.5 rounded-full border border-amber-200/30">
                  16:00 PM
                </span>
                <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mt-2 font-moul leading-relaxed">
                  ពិធីសែនចងដៃបង្កក់សិរី
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  ពិធីចងអំបោះក្រហមនៅលើកដៃជូនពរជ័យ និងបំពាក់ចិញ្ចៀនអាពាហ៍ពិពាហ៍។
                </p>
              </div>

              {/* Ceremony 4 */}
              <div className="relative">
                <span className="absolute -left-9.75 top-1 w-4 h-4 rounded-full bg-gradient-to-tr from-amber-600 to-[#d4af37] border-4 border-[#faf8f5] dark:border-[#2d261f] shadow"></span>

                <span className="font-kantumruy text-[#aa7c11] dark:text-[#f3e5ab] text-sm font-bold bg-[#f5efe5] dark:bg-[#1a1715] px-2.5 py-0.5 rounded-full border border-amber-200/30">
                  17:30 PM
                </span>
                <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mt-2 font-moul leading-relaxed">
                  ពិធីពិសាភោជនាហារ
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed font-semibold text-amber-800 dark:text-[#f3e5ab]">
                  សូមអញ្ជើញភ្ញៀវកិត្តិយសទាំងអស់ចូលរួមពិសាភោជនាហារ
                  និងរាំលេងកម្សាន្ត។
                </p>
              </div>
            </div>
          </section>

          {/* ================= VENUE LOCATION ================= */}
          <section
            className="scroll-reveal w-full px-6 py-12 flex flex-col items-center border-t border-b border-zinc-100 dark:border-zinc-800 mt-8"
            data-animate="right"
          >
            <h3 className="font-moul text-xl text-amber-800 dark:text-[#f3e5ab] mb-6 leading-relaxed text-center">
              ទីតាំងប្រារព្ធពិធី
            </h3>

            <div className="w-full bg-[#fdfcf9] dark:bg-[#1a1715]/40 rounded-2xl border border-amber-200/30 p-6 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-3">📍</span>
              <h4 className="text-base font-semibold text-zinc-800 dark:text-zinc-100 mb-1 leading-relaxed">
                មជ្ឈមណ្ឌលរៀបចំពិធីមង្គលការ សែនសុខ
              </h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 px-4 leading-relaxed">
                អគារ A1, ផ្លូវ 1986, សង្កាត់ភ្នំពេញថ្មី, ខណ្ឌសែនសុខ,
                រាជធានីភ្នំពេញ។
              </p>

              <a
                href="https://maps.app.goo.gl/oaZHDYx28tCHKTcs6"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-[#aa7c11] hover:bg-[#8e650c] text-white text-sm font-semibold py-2.5 px-6 rounded-xl shadow-md transition-colors duration-300 flex items-center gap-2"
              >
                <span>បើកមើលផែនទី Google Maps</span>
              </a>
            </div>
          </section>

          {/* ================= RSVP & WISHES FORM ================= */}
          <section
            className="scroll-reveal w-full px-6 py-12 flex flex-col items-center bg-[#fdfcf9]/50 dark:bg-black/10"
            data-animate="up"
          >
            <h3 className="font-moul text-xl text-amber-800 dark:text-[#f3e5ab] mb-6 leading-relaxed text-center">
              បញ្ជាក់ការចូលរួម និងពាក្យជូនពរ
            </h3>

            <div className="w-full bg-white dark:bg-[#1a1715] rounded-2xl border border-amber-200/30 p-6 shadow-md">
              {hasSubmittedRSVP ? (
                <div className="text-center py-6 flex flex-col items-center gap-3">
                  <span className="text-4xl animate-bounce">🙏✨</span>
                  <h4 className="text-base font-bold text-amber-800 dark:text-[#f3e5ab] leading-relaxed">
                    សូមអរគុណយ៉ាងជ្រាលជ្រៅ!
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 px-4 leading-relaxed">
                    ការឆ្លើយតប និងពាក្យជូនពរដ៏មានតម្លៃរបស់អ្នក
                    ត្រូវបានរក្សាទុកដោយជោគជ័យ។
                    យើងទន្ទឹងរង់ចាំជួបអ្នកក្នុងថ្ងៃមង្គលការ!
                  </p>
                  <button
                    onClick={() => setHasSubmittedRSVP(false)}
                    className="mt-4 text-[#aa7c11] text-sm font-bold border-b border-[#aa7c11] hover:text-[#8e650c] transition-colors"
                  >
                    ផ្ញើសារជូនពរម្ដងទៀត
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmitRSVP}
                  className="flex flex-col gap-4 text-left"
                >
                  {/* Guest Name input */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="w-name"
                      className="text-sm text-zinc-600 dark:text-zinc-400 font-bold mb-1"
                    >
                      ឈ្មោះរបស់អ្នក
                    </label>
                    <input
                      type="text"
                      id="w-name"
                      required
                      placeholder="សូមបញ្ចូលឈ្មោះ..."
                      value={wishName}
                      onChange={(e) => setWishName(e.target.value)}
                      className="w-full text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#faf8f5] dark:bg-[#2d261f] focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>

                  {/* Relation dropdown */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="w-relation"
                      className="text-sm text-zinc-600 dark:text-zinc-400 font-bold mb-1"
                    >
                      ត្រូវជាអ្វីនឹងម្ចាស់ដើមការ
                    </label>
                    <select
                      id="w-relation"
                      value={wishRelation}
                      onChange={(e) => setWishRelation(e.target.value)}
                      className="w-full text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#faf8f5] dark:bg-[#2d261f] focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-800 dark:text-zinc-100"
                    >
                      <option value="មិត្តភក្តិ">មិត្តភក្តិ</option>
                      <option value="សាច់ញាតិខាងកូនកំលោះ">
                        សាច់ញាតិខាងកូនកំលោះ
                      </option>
                      <option value="សាច់ញាតិខាងកូនស្រី">
                        សាច់ញាតិខាងកូនស្រី
                      </option>
                      <option value="មិត្តរួមការងារ">មិត្តរួមការងារ</option>
                      <option value="ភ្ញៀវកិត្តិយស">ភ្ញៀវកិត្តិយស</option>
                    </select>
                  </div>

                  {/* RSVP Attendance */}
                  <div className="flex flex-col">
                    <label className="text-sm text-zinc-600 dark:text-zinc-400 font-bold mb-1">
                      តើអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ?
                    </label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => setRsvpStatus("attending")}
                        className={`p-3 rounded-xl border text-sm font-bold text-center transition-all ${
                          rsvpStatus === "attending"
                            ? "bg-amber-100 dark:bg-amber-950/40 border-amber-500 text-amber-800 dark:text-[#f3e5ab] shadow-inner"
                            : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        }`}
                      >
                        រីករាយនឹងចូលរួម 🎉
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpStatus("declined")}
                        className={`p-3 rounded-xl border text-sm font-bold text-center transition-all ${
                          rsvpStatus === "declined"
                            ? "bg-red-50 dark:bg-red-950/20 border-red-300 text-red-700 dark:text-red-400 shadow-inner"
                            : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        }`}
                      >
                        សូមអភ័យទោស 🙏
                      </button>
                    </div>
                  </div>

                  {/* Attendee count if attending */}
                  {rsvpStatus === "attending" && (
                    <div className="flex flex-col">
                      <label
                        htmlFor="w-count"
                        className="text-sm text-zinc-600 dark:text-zinc-400 font-bold mb-1"
                      >
                        ចំនួនអ្នកចូលរួម
                      </label>
                      <select
                        id="w-count"
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#faf8f5] dark:bg-[#2d261f] focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-800 dark:text-zinc-100"
                      >
                        <option value={1}>1 នាក់</option>
                        <option value={2}>2 នាក់</option>
                        <option value={3}>3 នាក់</option>
                        <option value={4}>4 នាក់</option>
                        <option value={5}>ច្រើនជាង 4 នាក់</option>
                      </select>
                    </div>
                  )}

                  {/* Blessing message */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="w-content"
                      className="text-sm text-zinc-600 dark:text-zinc-400 font-bold mb-1"
                    >
                      ពាក្យជូនពរ / សារជូនពរ
                    </label>
                    <textarea
                      id="w-content"
                      required
                      rows={3}
                      placeholder="សូមសរសេរពាក្យជូនពររបស់លោកអ្នកទីនេះ..."
                      value={wishContent}
                      onChange={(e) => setWishContent(e.target.value)}
                      className="w-full text-sm p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#faf8f5] dark:bg-[#2d261f] focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-800 dark:text-zinc-100 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#aa7c11] hover:bg-[#8e650c] text-white text-sm font-semibold py-3.5 rounded-xl shadow-md transition-colors duration-300 mt-2"
                  >
                    ផ្ញើការឆ្លើយតប និងពាក្យជូនពរ
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* ================= BLESSINGS WALL ================= */}
          <section
            className="scroll-reveal w-full px-6 py-4 flex flex-col items-center"
            data-animate="up"
          >
            <h3 className="font-moul text-xl text-amber-800 dark:text-[#f3e5ab] mb-6 leading-relaxed text-center">
              ពាក្យជូនពរពីភ្ញៀវកិត្តិយស
            </h3>

            <div className="w-full flex flex-col gap-4 overflow-y-auto pr-1">
              {wishesList.map((wish) => (
                <div
                  key={wish.id}
                  className="bg-[#fdfcf9] dark:bg-[#1a1715]/40 p-4 rounded-2xl border border-amber-200/10 shadow-sm flex flex-col text-left relative overflow-hidden"
                >
                  {/* Background decorative heart seal */}
                  <span className="absolute right-4 top-4 text-red-500/10 text-2xl">
                    💝
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 font-moul leading-relaxed">
                      {wish.name}
                    </span>
                    <span className="text-sm bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-[#f3e5ab] px-2 py-0.5 rounded-full font-medium">
                      {wish.relation}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed italic">
                    “{wish.content}”
                  </p>
                  <span className="text-sm text-zinc-400 dark:text-zinc-500 mt-2">
                    {wish.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ================= FOOTER ================= */}
          <footer className="w-full py-8 px-6 text-center border-t border-amber-200/20 bg-amber-300/20 mt-8 flex flex-col items-center">
            <div className="relative w-24 h-16 mb-3">
              <Image
                src="/frame/ornament.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <p className="font-moul text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              សូមអរគុណយ៉ាងជ្រាលជ្រៅ
            </p>
            <span className="text-base text-zinc-400 font-playfair tracking-widest uppercase mt-1">
              Thank You
            </span>
          </footer>
        </section>
      </main>
    </div>
  );
};
