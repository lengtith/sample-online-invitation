"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FallingPetals from "@/components/FallingPetals";
import BackgroundMusic from "@/components/BackgroundMusic";

gsap.registerPlugin(ScrollTrigger);

export default function LavenderPage() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLHeadingElement>(null);
  const mainWelcomeRef = useRef<HTMLHeadingElement>(null);
  const namesGroupRef = useRef<HTMLDivElement>(null);
  const topFlowerRef = useRef<HTMLImageElement>(null);
  const bottomFlowerRef = useRef<HTMLImageElement>(null);
  const brideFrameRef = useRef<HTMLImageElement>(null);
  const inviteTextRef = useRef<HTMLParagraphElement>(null);
  const recFrameRef = useRef<HTMLImageElement>(null);
  const guestNameTextRef = useRef<HTMLSpanElement>(null);
  const groomParentsRef = useRef<HTMLDivElement>(null);
  const brideParentsRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const namesPanelRef = useRef<HTMLElement>(null);
  const inviteMessageRef = useRef<HTMLDivElement>(null);
  const dateTimeRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const locationRef = useRef<HTMLDivElement>(null);
  const giftRef = useRef<HTMLDivElement>(null);
  const rsvpFormRef = useRef<HTMLDivElement>(null);
  const thankYouRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const revealOnScroll = (
      target: gsap.TweenTarget,
      fromVars: gsap.TweenVars,
      trigger: Element | null = target as Element,
    ) => {
      gsap.set(target, fromVars);
      ScrollTrigger.create({
        trigger,
        scroller: scrollerRef.current,
        start: "top 85%",
        onEnter: () =>
          gsap.to(target, {
            ...fromVars,
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          }),
        onLeaveBack: () =>
          gsap.to(target, {
            ...fromVars,
            duration: 0.6,
            ease: "power2.inOut",
          }),
      });
    };

    gsap.set(topFlowerRef.current, { opacity: 0, y: -100 });
    gsap.set(bottomFlowerRef.current, { opacity: 0, x: 100 });
    gsap.set(brideFrameRef.current, { opacity: 0, scale: 0 });
    gsap.set([welcomeRef.current, inviteTextRef.current], {
      opacity: 0,
      y: 40,
    });
    gsap.set(namesGroupRef.current, { opacity: 0, y: 40, scale: 0.8 });
    gsap.set([recFrameRef.current, guestNameTextRef.current], {
      opacity: 0,
      scale: 0,
    });

    const heroTl = gsap.timeline();

    heroTl
      .to(
        [topFlowerRef.current, bottomFlowerRef.current, brideFrameRef.current],
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
      )
      .to(
        welcomeRef.current,
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=0.2",
      )
      .to(
        namesGroupRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" },
        "-=0.2",
      )
      .to(
        inviteTextRef.current,
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.2",
      )
      .to(
        recFrameRef.current,
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.2",
      )
      .to(
        guestNameTextRef.current,
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3",
      );

    gsap.set(mainWelcomeRef.current, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: mainWelcomeRef.current,
      scroller: scrollerRef.current,
      start: "top 85%",
      onEnter: () =>
        gsap.to(mainWelcomeRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        }),
      onLeaveBack: () =>
        gsap.to(mainWelcomeRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power2.inOut",
        }),
    });

    gsap.set(groomParentsRef.current, { opacity: 0, x: -60 });
    gsap.set(brideParentsRef.current, { opacity: 0, x: 60 });
    ScrollTrigger.create({
      trigger: groomParentsRef.current,
      scroller: scrollerRef.current,
      start: "top 85%",
      onEnter: () =>
        gsap.to([groomParentsRef.current, brideParentsRef.current], {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.15,
        }),
      onLeaveBack: () => {
        gsap.to(groomParentsRef.current, {
          opacity: 0,
          x: -60,
          duration: 0.6,
          ease: "power2.inOut",
        });
        gsap.to(brideParentsRef.current, {
          opacity: 0,
          x: 60,
          duration: 0.6,
          ease: "power2.inOut",
        });
      },
    });

    revealOnScroll(monogramRef.current, { opacity: 0, scale: 0 });
    revealOnScroll(namesPanelRef.current, { opacity: 0, y: 40 });
    revealOnScroll(inviteMessageRef.current, { opacity: 0, y: 40 });
    revealOnScroll(dateTimeRef.current, { opacity: 0, y: 40 });
    revealOnScroll(scheduleRef.current, { opacity: 0, y: 40 });
    galleryImageRefs.current.forEach((img) =>
      revealOnScroll(img, { opacity: 0, y: 40, scale: 0.85 }),
    );
    revealOnScroll(locationRef.current, { opacity: 0, y: 40 });
    revealOnScroll(giftRef.current, { opacity: 0, y: 40 });
    revealOnScroll(rsvpFormRef.current, { opacity: 0, y: 40 });
    revealOnScroll(thankYouRef.current, { opacity: 0, y: 40 });
  });

  return (
    <div className="relative h-screen w-full">
      <BackgroundMusic src="/music/beauty-in-white.m4a" />
      <div
        ref={scrollerRef}
        className="relative h-screen max-w-md mx-auto bg-[url('/lavender-2/background.jpg')] bg-cover bg-center overflow-y-auto overflow-x-hidden no-scrollbar snap-y snap-mandatory"
      >
        {/* Fixed on scroll */}
        <div className="pointer-events-none sticky top-0 h-0 z-20">
          <div className="absolute top-0 left-0 w-full h-screen">
            <FallingPetals />
            {/* Top flower frame */}
            <Image
              ref={topFlowerRef}
              style={{ opacity: 0 }}
              src="/lavender-2/lovely-purple-floral.png"
              alt=""
              width={200}
              height={200}
              className="absolute inset-x-0 top-0 w-full h-auto"
              unoptimized
            />

            {/* Bottom flower frame */}
            <Image
              ref={bottomFlowerRef}
              style={{ opacity: 0 }}
              src="/lavender-2/bottom-flower-frame.png"
              alt=""
              width={200}
              height={200}
              className="absolute -bottom-14 -right-14 w-72 h-auto"
              unoptimized
            />
            <Image
              ref={brideFrameRef}
              style={{ opacity: 0 }}
              src="/lavender-2/groom-bride.png"
              alt=""
              width={200}
              height={200}
              className="absolute -bottom-14 -left-6 w-64 h-auto"
              unoptimized
            />
          </div>
        </div>

        {/*Front Content Section */}
        <section className="relative w-full h-screen flex flex-col justify-center items-center px-6 snap-start">
          {/* Welcome Message */}
          <h5
            ref={welcomeRef}
            style={{ opacity: 0 }}
            className="text-2xl text-center leading-relaxed mb-12 text-[#613A90] font-viravuth"
          >
            សិរីសួស្ដីអាពាហ៍ពិពាហ៍
          </h5>

          {/* Bride and Groom Names */}
          <div
            ref={namesGroupRef}
            style={{ opacity: 0 }}
            className="flex flex-col items-center text-[#613A90] mb-12 font-pen-surin"
          >
            <h1 className="text-5xl leading-normal text-center">ចៅ ចិត្រ</h1>
            <h3 className="text-2xl leading-loose text-center">&</h3>
            <h1 className="text-5xl leading-normal text-center">ឃុន នារី</h1>
          </div>
          {/* <p className="text-xl text-[#613A90] mb-10">07 • 07 • 2026</p> */}

          {/* Guest Name */}
          <div className="flex flex-col items-center gap-2 w-full">
            <p
              ref={inviteTextRef}
              style={{ opacity: 0 }}
              className="text-lg text-[#613A90]"
            >
              សូមគោរពអញ្ចើញ
            </p>
            <div className="relative w-full max-w-[320px] h-14">
              <Image
                ref={recFrameRef}
                style={{ opacity: 0 }}
                src="/frame/gold-rectangle-frame.png"
                alt=""
                width={320}
                height={56}
                className="object-contain h-full w-full"
              />
              <span
                ref={guestNameTextRef}
                style={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center text-[#613A90] font-moul text-lg text-center px-10"
              >
                លោក ស្រី សុខា
              </span>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="min-h-screen w-full flex flex-col items-center px-6 pb-16 pt-36 snap-start">
          {/* Welcome Message */}
          <h5
            ref={mainWelcomeRef}
            style={{ opacity: 0 }}
            className="text-3xl text-center leading-relaxed mb-12 text-[#613A90] font-viravuth"
          >
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </h5>

          <section className="w-full flex flex-row gap-6 text-center">
            {/* Groom Parents Panel */}
            <div
              ref={groomParentsRef}
              className="rounded-2xl w-full flex flex-col items-center font-viravuth"
            >
              <span className="text-base tracking-wider mb-4 font-kantumruy">
                មាតាបិតាកូនប្រុស
              </span>
              <div className="flex flex-col gap-4 text-xl text-[#613A90]">
                <p>លោក សុខ សារិន</p>
                <p>លោកស្រី ម៉ៅ សុភី</p>
              </div>
            </div>

            {/* Bride Parents Panel */}
            <div
              ref={brideParentsRef}
              className="rounded-2xl w-full flex flex-col items-center font-viravuth"
            >
              <span className="text-base tracking-wider mb-4 font-kantumruy">
                មាតាបិតាខាងកូនស្រី
              </span>
              <div className="flex flex-col gap-4 text-xl font-bold text-[#613A90]">
                <p>លោក ចាន់ សុជាតិ</p>
                <p>លោកស្រី ហ៊ឹម ស្រីមុំ</p>
              </div>
            </div>
          </section>

          {/* Wedding monogram */}
          <div
            ref={monogramRef}
            className="relative flex items-center justify-center text-[#613A90] font-pen-surin h-64 w-auto"
          >
            <p className="absolute text-8xl -translate-x-6 opacity-80">ច</p>
            <p className="absolute text-8xl translate-x-10 translate-y-10 opacity-80">
              ន
            </p>
          </div>

          <section
            ref={namesPanelRef}
            className="w-full px-6 flex flex-row gap-6 text-center mb-10"
          >
            {/* Groom Panel */}
            <div className="rounded-2xl w-full flex flex-col items-center font-viravuth">
              <span className="text-base uppercase tracking-wider mb-4 font-kantumruy">
                កូនប្រុសនាម
              </span>
              <div className="flex flex-col gap-4 text-xl text-[#613A90]">
                <p>ចៅ ចិត្រ</p>
              </div>
            </div>

            {/* Bride Panel */}
            <div className="rounded-2xl w-full flex flex-col items-center font-viravuth">
              <span className="text-base uppercase tracking-wider mb-4 font-kantumruy">
                កូនស្រីនាម
              </span>
              <div className="flex flex-col gap-4 text-xl font-bold text-[#613A90]">
                <p>ឃុន នារី</p>
              </div>
            </div>
          </section>

          {/* Invite Message */}
          <div ref={inviteMessageRef}>
            <h5 className="text-xl text-center leading-relaxed mb-2 text-[#613A90] font-viravuth">
              សូមគោរពអញ្ចើញ
            </h5>
            <p className="text-center text-[#613A90] leading-relaxed font-kantumruy">
              ឯកឧត្ដម លោកជំទាវ អ្នកឧកញ៉ា លោក លោកស្រី អ្នកនាង កញ្ញា
              ចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្ដិយស ដើម្បីប្រសិទ្ធិពរជ័យ
              សិរីសួស្ដីជ័យមង្គល ក្នុងពិធីមង្គលអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ
            </p>
          </div>

          {/* Date and Time */}
          <div
            ref={dateTimeRef}
            className="size- inline-flex flex-col justify-start items-start text-[#613A90] mt-6"
          >
            <div className="self-stretch h-7 text-center justify-start text-base font-normal font-kantumruy">
              កក្ដដា
            </div>
            <div className="w-72 h-11 inline-flex justify-center items-center gap-3">
              <div className="w-24 px-2 py-1 border-t border-b border-[#613A90] flex justify-center items-center gap-2.5">
                <div className="text-center justify-start text-base font-normal font-kantumruy">
                  ថ្ងៃអង្គារ
                </div>
              </div>
              <div className="text-center justify-start text-3xl font-bold font-kantumruy">
                ០៧
              </div>
              <div className="w-24 px-2 py-1 border-t border-b border-[#613A90] flex justify-center items-center gap-2.5">
                <div className="text-center justify-start text-base font-normal font-kantumruy">
                  ១១:០០ព្រឹក
                </div>
              </div>
            </div>
            <div className="self-stretch h-7 text-center justify-start text-base font-normal font-kantumruy">
              ២០២៦
            </div>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center my-8">
            <div className="flex-1 w-full h-[1px] bg-[#613A90]"></div>
            <Image
              width={40}
              height={20}
              src="/kbach-divider.svg"
              alt="Divider"
              className="mx-4"
            />
            <div className="flex-1 w-full h-[1px] bg-[#613A90]"></div>
          </div>

          {/* Program schedules */}
          <div
            ref={scheduleRef}
            className="self-stretch mb-12 inline-flex flex-col justify-start items-center gap-4"
          >
            <p className="text-center justify-start text-[#613A90] text-xl font-normal font-viravuth leading-9">
              របៀបវារៈកម្មវិធី
            </p>
            <div className="w-96 px-6 relative inline-flex justify-start items-start gap-6">
              <div className="w-px h-full left-[23px] top-0 absolute bg-[#613A90]" />
              <div className="w-0 self-stretch py-1.5 inline-flex flex-col justify-between items-center">
                <div className="size-2 bg-[#613A90] rounded-full" />
                <div className="size-2 bg-[#613A90] rounded-full" />
                <div className="size-2 bg-[#613A90] rounded-full" />
                <div className="size-2 bg-[#613A90] rounded-full" />
                <div className="size-2 bg-[#613A90] rounded-full" />
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                <div className="self-stretch inline-flex justify-start items-center gap-4">
                  <div className="text-center justify-start text-[#613A90] text-base font-normal font-kantumruy">
                    ០៧:០០ ព្រឹក
                  </div>
                  <div className="text-center justify-start text-[#613A90] text-base font-semibold font-kantumruy">
                    ជួបជុំភ្ញៀវរៀបចំហែជំនួន
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-4">
                  <div className="text-center justify-start text-[#613A90] text-base font-normal font-kantumruy">
                    ០៨:០០ ព្រឹក
                  </div>
                  <div className="text-center justify-start text-[#613A90] text-base font-semibold font-kantumruy">
                    ពិធីហែជំនួនចូលរោងជ័យ
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-4">
                  <div className="text-center justify-start text-[#613A90] text-base font-normal font-kantumruy">
                    ០៩:០០ ព្រឹក
                  </div>
                  <div className="text-center justify-start text-[#613A90] text-base font-semibold font-kantumruy">
                    ពិធីកាត់សក់បង្កក់សិរី
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-4">
                  <div className="text-center justify-start text-[#613A90] text-base font-normal font-kantumruy">
                    ១០:០០ ព្រឹក
                  </div>
                  <div className="text-center justify-start text-[#613A90] text-base font-semibold font-kantumruy">
                    ពិធីសែនចងដៃ
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-4">
                  <div className="text-center justify-start text-[#613A90] text-base font-normal font-kantumruy">
                    ០៥:០០ ល្ងាច
                  </div>
                  <div className="text-center justify-start text-[#613A90] text-base font-semibold font-kantumruy">
                    អញ្ចើញភ្ញៀវពិសាភោជនាហារ
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div
            ref={galleryRef}
            className="self-stretch mb-12 inline-flex flex-col justify-start items-center gap-4"
          >
            <div className="text-center justify-start text-[#613A90] text-xl font-normal font-viravuth leading-9">
              រូបភាពអនុស្សាវរីយ៍
            </div>
            <div className="self-stretch grid grid-cols-1 gap-3">
              <div
                ref={(el) => {
                  galleryImageRefs.current[0] = el;
                }}
                className="relative h-56 rounded-xl overflow-hidden outline outline-offset-[-1.12px] outline-[#613A90]/20"
              >
                <Image
                  src="/wedding/1.webp"
                  alt="រូបភាពអនុស្សាវរីយ៍ ១"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                ref={(el) => {
                  galleryImageRefs.current[1] = el;
                }}
                className="relative h-56 rounded-xl overflow-hidden outline outline-offset-[-1.12px] outline-[#613A90]/20"
              >
                <Image
                  src="/wedding/2.jpg"
                  alt="រូបភាពអនុស្សាវរីយ៍ ២"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                ref={(el) => {
                  galleryImageRefs.current[2] = el;
                }}
                className="relative h-56 rounded-xl overflow-hidden outline outline-offset-[-1.12px] outline-[#613A90]/20"
              >
                <Image
                  src="/wedding/3.jpg"
                  alt="រូបភាពអនុស្សាវរីយ៍ ៣"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div
            ref={locationRef}
            className="self-stretch mb-12 inline-flex flex-col justify-start items-center gap-4"
          >
            <div className="text-center justify-start text-[#613A90] text-xl font-normal font-viravuth leading-9">
              ទីតាំងប្រារព្ធពិធី
            </div>
            <div className="self-stretch p-4 bg-black/5 backdrop-blur-sm rounded-2xl outline outline-offset-[-1.12px] outline-[#613A90]/40 flex flex-col items-center text-center gap-3">
              <div className="text-[#613A90] text-base font-semibold font-kantumruy leading-relaxed">
                មជ្ឈមណ្ឌលរៀបចំពិធីមង្គលការ សែនសុខ
              </div>
              <p className="text-[#613A90]/70 text-sm font-kantumruy leading-relaxed px-4">
                អគារ A1, ផ្លូវ 1986, សង្កាត់ភ្នំពេញថ្មី, ខណ្ឌសែនសុខ,
                រាជធានីភ្នំពេញ។
              </p>
              <div className="self-stretch h-48 rounded-xl overflow-hidden outline outline-offset-[-1.12px] outline-[#613A90]/20">
                <iframe
                  title="ទីតាំងប្រារព្ធពិធី"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.2085177406743!2d104.9219370761445!3d11.608478443293553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109532931ed88a1%3A0xa1094f5df89be45d!2sOCIC%20Wedding%20Hall!5e0!3m2!1sen!2skh!4v1783073576795!5m2!1sen!2skh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <a
                href="https://maps.app.goo.gl/oaZHDYx28tCHKTcs6"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 bg-[#613A90] hover:bg-[#4f2f77] active:bg-[#432869] text-white text-sm font-semibold font-kantumruy py-2.5 px-6 rounded-xl shadow-md transition-colors duration-300"
              >
                បើកមើលផែនទី Google Maps
              </a>
            </div>
          </div>

          {/* Gift QR code */}
          <div
            ref={giftRef}
            className="self-stretch mb-12 inline-flex flex-col justify-start items-center gap-4"
          >
            <p className="text-center justify-start text-[#613A90] text-xl font-normal font-viravuth">
              ចំណងដៃអាពាហ៍ពិពាហ៍
            </p>
            <div className="self-stretch flex flex-col items-center text-center gap-3">
              <div className="relative w-40 h-40 bg-white rounded-xl p-4 outline outline-offset-[-1.12px] outline-[#613A90]/20">
                <Image
                  src="/qr-code.png"
                  alt="QR Code សម្រាប់ជូនអំណោយ"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain rounded-sm"
                />
              </div>
              <p className="text-[#613A90]/70 text-sm font-kantumruy leading-relaxed px-4">
                ស្ដេនដើម្បីផ្ញើចំណងដៃ
              </p>
            </div>
          </div>

          {/* Form guest and gift */}
          <div
            ref={rsvpFormRef}
            className="w-full mb-12 inline-flex flex-col justify-start items-center gap-4"
          >
            <p className="self-stretch text-center justify-start text-[#613A90] text-xl font-normal font-viravuth">
              ការចូលរួម និងពាក្យជូនពរ
            </p>
            <div className="self-stretch flex flex-col justify-start items-center gap-7">
              <div className="self-stretch p-4  rounded-2xl outline outline-offset-[-1.12px] outline-[#613A90]/40 bg-black/5 backdrop-blur-sm flex flex-col justify-start items-start gap-4">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-end text-[#613A90] text-base font-normal font-kantumruy leading-7">
                    ឈ្មោះរបស់អ្នក
                  </div>
                  <div className="self-stretch h-9 px-4 rounded-lg outline outline-offset-[-1.12px] outline-[#613A90]/20 has-focus:outline-2 has-focus:outline-[#613A90] transition-[outline-color,outline-width] inline-flex justify-start items-center gap-3">
                    <input
                      type="text"
                      placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                      className="flex-1 min-w-0 h-full bg-transparent text-[#613A90] placeholder:text-[#613A90]/40 text-base font-normal font-kantumruy outline-none"
                    />
                  </div>
                </div>
                {/* <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-end text-[#613A90] text-base font-normal font-kantumruy leading-7">
                    ត្រូវជាអ្វីនឹងម្ចាស់ដើមការ
                  </div>
                  <div className="self-stretch h-9 px-4 rounded-lg outline outline-offset-[-1.12px] outline-[#613A90]/20 has-focus:outline-2 has-focus:outline-[#613A90] transition-[outline-color,outline-width] inline-flex justify-start items-center gap-3">
                    <input
                      type="text"
                      placeholder="មិត្ដភក្ដិ"
                      className="flex-1 min-w-0 h-full bg-transparent text-[#613A90] placeholder:text-[#613A90]/40 text-base font-normal font-kantumruy outline-none"
                    />
                  </div>
                </div> */}
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-end text-[#613A90] text-base font-normal font-kantumruy leading-7">
                    តើអ្នកនឹងចូលរួមឬទេ?
                  </div>
                  <div className="self-stretch inline-flex justify-start items-stretch gap-3.5">
                    <label
                      htmlFor="rsvp-attending"
                      className="flex-1 h-9 px-3 rounded-lg outline outline-offset-[-1.12px] outline-[#613A90]/20 has-focus-visible:outline-2 has-focus-visible:outline-[#613A90] transition-[outline-color,outline-width] flex justify-between items-center cursor-pointer"
                    >
                      <span className="justify-start text-[#613A90] font-normal font-kantumruy leading-6">
                        ចូលរួម
                      </span>
                      <input
                        type="radio"
                        name="rsvp"
                        id="rsvp-attending"
                        className="size-5 accent-[#613A90]"
                      />
                    </label>
                    <label
                      htmlFor="rsvp-not-attending"
                      className="flex-1 h-9 px-3 rounded-lg outline outline-offset-[-1.12px] outline-[#613A90]/20 has-focus-visible:outline-2 has-focus-visible:outline-[#613A90] transition-[outline-color,outline-width] flex justify-between items-center cursor-pointer"
                    >
                      <span className="justify-start text-[#613A90] font-normal font-kantumruy leading-6">
                        មិនបានចូលរួម
                      </span>
                      <input
                        type="radio"
                        name="rsvp"
                        id="rsvp-not-attending"
                        className="size-5 accent-[#613A90]"
                      />
                    </label>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-end text-[#613A90] text-base font-normal font-kantumruy leading-7">
                    ចំនួននាក់នឹងទៅចូលរួម
                  </div>
                  <div className="self-stretch h-9 px-4 rounded-lg outline outline-offset-[-1.12px] outline-[#613A90]/20 has-focus:outline-2 has-focus:outline-[#613A90] transition-[outline-color,outline-width] inline-flex justify-start items-center gap-4">
                    <input
                      type="number"
                      min={1}
                      defaultValue={1}
                      className="w-full min-w-0 h-full bg-transparent text-[#613A90] text-lg font-normal font-kantumruy leading-6 outline-none"
                    />
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-end text-[#613A90] text-base font-normal font-kantumruy leading-7">
                    សារជូនពរ
                  </div>
                  <div className="self-stretch h-24 px-4 py-3.5 rounded-lg outline outline-offset-[-1.12px] outline-[#613A90]/20 has-focus:outline-2 has-focus:outline-[#613A90] transition-[outline-color,outline-width] inline-flex justify-start items-start gap-3">
                    <textarea
                      rows={4}
                      placeholder="សរសេរពាក្យជូនពរនៅទីនេះ..."
                      className="flex-1 min-w-0 h-full bg-transparent text-[#613A90] placeholder:text-[#613A90]/40 text-base font-normal font-kantumruy outline-none resize-none"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full mt-2 bg-[#613A90] hover:bg-[#4f2f77] active:bg-[#432869] text-white text-sm font-semibold font-kantumruy py-2.5 px-6 rounded-xl shadow-md transition-colors duration-300"
                >
                  <span className="text-center justify-start text-white text-base font-normal font-kantumruy">
                    ផ្ញើការឆ្លើយតប និងពាក្យជូនពរ
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Thank you */}
          <div
            ref={thankYouRef}
            className="self-stretch mb-48 inline-flex flex-col justify-center items-center gap-4"
          >
            <p className="text-center justify-start text-[#613A90] text-xl font-normal font-viravuth">
              សេចក្តីថ្លែងអំណរ​គុណ​
            </p>
            <div className="self-stretch text-center justify-start text-[#613A90]/80 text-lg font-normal font-kantumruy leading-7">
              យើង​ខ្ញុំ​ សូម​គោរព​ថ្លែង​អំណរ​គុណ​យ៉ាង​ជ្រាល​ជ្រៅ​
              ចំពោះ​វត្តមាន​ដ៏​ឧត្តុង្គ​ឧត្តម​របស់​ ​​សម្តេច​​ ​ឯកឧត្តម
              ​​លោកជំទាវ​ ​លោកអ្នកឧកញ្ញា​ ​អ្នកឧកញ្ញា​ ​ឧកញ្ញា​ ​លោក ​លោកស្រី​
              ​អ្នកនាង​ ​កញ្ញា​ ​ក្នុងពិធីអាពាហ៍ពិពាហ៍​កូន​ប្រុស​ ​កូនស្រី​
              ​របស់​យើងខ្ញុំ​នា​ពេល​ខាង​មុខ​នេះ​​។
              យើង​ខ្ញុំ​សុំ​ការ​ខន្តី​អភ័យទោស​ផង​ចំពោះ​
              ​ករណី​ដែល​យើង​ខ្ញុំ​ពុំ​បាន​ជូន​លិខិត​ អញ្ជើញនេះដោយផ្ទាល់ ឬ
              ចំពោះកំហុសអក្ខរាវិរុទ្ធ ក្នុងការសរសេរឈ្មោះ។
              សូមមេត្តា​ទទួល​នូវ​សេចក្ដី​គោរព​ដ៏​ខ្ពង់ខ្ពស់​ពី​យើង​ខ្ញុំ​។
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
