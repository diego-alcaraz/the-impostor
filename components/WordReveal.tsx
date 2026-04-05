"use client";

import { useState } from "react";
import { Player } from "@/lib/gameState";
import { Topic } from "@/lib/topics";

interface WordRevealProps {
  players: Player[];
  topic: Topic;
  currentPlayerIndex: number;
  onNext: () => void;
  onAllRevealed: () => void;
}

export default function WordReveal({
  players,
  topic,
  currentPlayerIndex,
  onNext,
  onAllRevealed,
}: WordRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const player = players[currentPlayerIndex];
  const isLast = currentPlayerIndex === players.length - 1;

  const handleReveal = () => setRevealed(true);

  const handleNext = () => {
    setRevealed(false);
    if (isLast) {
      onAllRevealed();
    } else {
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto text-center">
      <div className="text-[#6B7280] text-sm">
        Player {currentPlayerIndex + 1} of {players.length}
      </div>

      <h2 className="text-2xl font-bold text-[#1A1A2E]">{player.name}</h2>

      {!revealed ? (
        <>
          <p className="text-[#6B7280]">
            Make sure only <span className="text-[#1A1A2E] font-semibold">{player.name}</span> can see the screen.
          </p>
          <button
            onClick={handleReveal}
            className="w-full py-6 bg-[#F7F7F8] border-2 border-[#E5E7EB] hover:border-gold rounded-2xl text-[#6B7280] hover:text-[#1A1A2E] text-lg transition-colors"
          >
            👁️ Tap to reveal your word
          </button>
        </>
      ) : (
        <>
          <div className="w-full py-8 px-6 rounded-2xl space-y-4 border-2 border-[#E5E7EB] bg-[#F7F7F8]">
            <div className="text-[#6B7280] text-sm">
              Topic: <span className="text-[#1A1A2E]">{topic.emoji} {topic.name}</span>
            </div>
            {player.isImpostor ? (
              <div className="space-y-2">
                <div className="text-5xl">🕵️</div>
                <div className="text-gold text-2xl font-bold">
                  YOU ARE THE IMPOSTOR
                </div>
                <p className="text-[#6B7280] text-sm">
                  You don&apos;t know the word. Blend in!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-[#6B7280] text-sm">Your word is:</div>
                <div className="text-3xl font-bold text-[#10B981]">
                  {player.word}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-4 bg-gold hover:bg-gold-dark text-white font-bold rounded-xl transition-colors"
          >
            {isLast ? "🚀 Start Discussion" : "✓ Got it — Next Player"}
          </button>
        </>
      )}

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-2">
        {players.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < currentPlayerIndex
                ? "bg-[#10B981]"
                : i === currentPlayerIndex
                ? "bg-gold"
                : "bg-[#E5E7EB]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
