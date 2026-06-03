"use client";

import React, { Suspense, useRef } from "react";

import { InvitationInner } from "@/components/InvitationInner";
import { MainInvitation } from "@/components/MainInvitation";

export default function Home() {
  const [showContent, setShowContent] = React.useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = React.useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsMusicPlaying(true);
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
  };

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-kantumruy text-zinc-400 text-sm">
          កំពុងរៀបចំសំបុត្រអញ្ជើញ...
        </div>
      }
    >
      <div className="fixed w-full z-30 flex items-center justify-end px-6 py-4 bg-transparent">
        {/* <button
          className={`${showContent ? "block" : "opacity-0 pointer-events-none"}`}
          onClick={() => setShowContent(false)}
        >
          🔙
        </button> */}

        <audio ref={audioRef} autoPlay loop>
          <source src="/music/wedding.mp3" type="audio/mpeg" />
        </audio>
        {isMusicPlaying ? (
          <button onClick={pauseMusic}>🔊</button>
        ) : (
          <button onClick={playMusic}>🔇</button>
        )}
      </div>

      {/* <InvitationInner /> */}
      <MainInvitation />
    </Suspense>
  );
}
