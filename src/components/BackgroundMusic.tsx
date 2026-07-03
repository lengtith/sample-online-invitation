"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic({ src }: { src: string }) {
  const audioRef = useRef<HTMLVideoElement>(null);
  const hasUnmutedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      if (hasUnmutedRef.current) return;
      hasUnmutedRef.current = true;
      audio.muted = false;
      setIsMuted(false);
      audio.play().catch(() => {});
    };

    const events: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "keydown",
      "scroll",
    ];
    events.forEach((event) =>
      document.addEventListener(event, tryPlay, { once: true }),
    );

    return () => {
      events.forEach((event) => document.removeEventListener(event, tryPlay));
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    hasUnmutedRef.current = true;
    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) audio.play().catch(() => {});
  };

  return (
    <>
      <video
        ref={audioRef}
        src={src}
        loop
        muted
        playsInline
        autoPlay
        className="fixed w-px h-px opacity-0 pointer-events-none"
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "បើកសំឡេង" : "បិទសំឡេង"}
        className="fixed top-4 right-4 z-40 size-10 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-sm text-[#613A90] shadow-md hover:bg-white/90 transition-colors"
      >
        {isMuted ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="w-5 h-5"
          >
            <path
              d="M3 9v6h4l5 5V4L7 9H3z"
              strokeLinejoin="round"
              fill="currentColor"
            />
            <path d="M17 9l4 6M21 9l-4 6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="w-5 h-5"
          >
            <path
              d="M3 9v6h4l5 5V4L7 9H3z"
              strokeLinejoin="round"
              fill="currentColor"
            />
            <path
              d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </>
  );
}
