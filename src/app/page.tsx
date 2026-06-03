"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";

import { MainInvitation } from "@/components/MainInvitation";

export default function Home() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const startAudio = async () => {
      const audio = audioRef.current;

      if (!audio) return;

      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch (error) {
        console.error("Audio autoplay blocked:", error);
        setIsMusicPlaying(false);
      }

      document.removeEventListener("click", startAudio);
      document.removeEventListener("touchstart", startAudio);
    };

    document.addEventListener("click", startAudio);
    document.addEventListener("touchstart", startAudio);

    return () => {
      document.removeEventListener("click", startAudio);
      document.removeEventListener("touchstart", startAudio);
    };
  }, []);

  const playMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      await audio.play();
      setIsMusicPlaying(true);
    } catch (error) {
      console.error("Unable to play audio:", error);
      setIsMusicPlaying(false);
    }
  };

  const pauseMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    setIsMusicPlaying(false);
  };

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-kantumruy text-zinc-400 text-sm">
          កំពុងរៀបចំសំបុត្រអញ្ជើញ...
        </div>
      }
    >
      <div className="fixed right-0 top-0 z-30 flex items-center justify-end px-6 py-4">
        <audio
          ref={audioRef}
          loop
          playsInline
          preload="auto"
          onPlay={() => setIsMusicPlaying(true)}
          onPause={() => setIsMusicPlaying(false)}
        >
          <source src="/music/wedding.mp3" type="audio/mpeg" />
        </audio>

        {isMusicPlaying ? (
          <button
            onClick={pauseMusic}
            className="text-xl"
            aria-label="Pause music"
          >
            🔊
          </button>
        ) : (
          <button
            onClick={playMusic}
            className="text-xl"
            aria-label="Play music"
          >
            🔇
          </button>
        )}
      </div>

      <MainInvitation />
    </Suspense>
  );
}
