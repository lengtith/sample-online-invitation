"use client";

import React, { Suspense, useRef, useState } from "react";

import { MainInvitation } from "@/components/MainInvitation";

export default function Home() {
  "use no memo";
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;

  //   audio.muted = true;

  //   audio
  //     .play()
  //     .then(() => {
  //       audio.muted = false;
  //       setIsMusicPlaying(true);
  //     })
  //     .catch(() => {
  //       audio.muted = false;
  //       setIsMusicPlaying(false);
  //     });
  // }, []);

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
        <div className="min-h-screen bg-zinc-50 dark:bg-[#1a1715] flex items-center justify-center font-kantumruy text-zinc-500 dark:text-zinc-300 text-sm">
          កំពុងរៀបចំសំបុត្រអញ្ជើញ...
        </div>
      }
    >
      <div className="fixed right-0 top-0 z-30 flex items-center justify-end px-6 py-4 bg-transparent">
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
