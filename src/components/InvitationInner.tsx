import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { animate, stagger } from "animejs";
import React from "react";

interface InvitationInnerProps {
  handleShowContent: (val: boolean) => void;
}

// Font of invitation card
export function InvitationInner({ handleShowContent }: InvitationInnerProps) {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "លោក សុខារិម្ម";
  const innerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const targets =
      innerRef.current?.querySelectorAll<HTMLElement>(".intro-reveal");
    if (!targets?.length) return;

    animate(targets, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      easing: "easeOutQuad",
      delay: stagger(100),
    });
  }, []);

  return (
    <React.Fragment>
      <div
        ref={innerRef}
        className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-[#1a1715]"
      >
        <main className="relative flex flex-1 w-full max-w-md flex-col items-center justify-center bg-white dark:bg-[#2d261f] overflow-hidden shadow-xl min-h-screen">
          {/* Left ornament */}
          <Image
            src="/frame/ornament.png"
            alt=""
            width={300}
            height={1000}
            className="absolute object-contain left-0 top-1/2 -translate-y-1/2 -translate-x-2/3 h-full w-auto -rotate-90"
            priority
          />

          {/* Right ornament */}
          <Image
            src="/frame/ornament.png"
            alt=""
            width={300}
            height={1000}
            className="absolute object-contain right-0 top-1/2 -translate-y-1/2 translate-x-2/3 h-full w-auto rotate-90"
            priority
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col w-2/3 h-screen items-center justify-center py-28">
            {/* Top ornament */}
            <Image
              src="/frame/ornament.png"
              alt=""
              width={1000}
              height={300}
              className="absolute object-contain -top-48 left-0 w-full h-auto"
              priority
            />

            {/* Check here: Why it doesn't full height */}
            <div className="w-full h-full flex flex-col items-center justify-between text-center">
              <h1 className="intro-reveal opacity-0 text-2xl font-moul text-amber-800 dark:text-[#f3e5ab] leading-relaxed">
                សិរីសួស្ដីអាពាហ៍ពិពាហ៍
              </h1>

              <div className="intro-reveal opacity-0 relative w-full flex items-center justify-center flex-col">
                <Image
                  src="/heart-to-heart-thumbnail.png"
                  alt=""
                  width={1000}
                  height={300}
                  className="absolute object-contain w-2/3 h-auto opacity-95"
                  priority
                />
                <h1 className="relative z-10 text-7xl font-moul text-amber-900 dark:text-[#eddca7] leading-[0.7] mt-24 p-0">
                  វស
                </h1>
                {/* Date */}
                <p className="relative z-10 text-2xl font-playfair font-semibold text-zinc-700 dark:text-zinc-300 mt-7 p-0">
                  01.06.2026
                </p>
              </div>

              <div className="intro-reveal opacity-0 w-full relative flex flex-col items-center">
                <p className="text-xl font-kantumruy font-medium text-zinc-600 dark:text-zinc-300">
                  សូមគោរពអញ្ជើញ
                </p>

                <div
                  className="relative w-full flex items-center justify-center flex-col mt-6 min-h-20 cursor-pointer active:scale-95 duration-150 ease-out transition-transform"
                  onClick={() => handleShowContent(true)}
                >
                  <Image
                    src="/frame/decoration-border-name.png"
                    alt=""
                    width={300}
                    height={1000}
                    className="absolute object-center w-full h-auto opacity-90"
                    priority
                  />
                  <h4 className="relative z-10 text-xl font-bold font-kantumruy text-amber-950 dark:text-[#f3e5ab] px-4 py-2">
                    {guestName}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}
