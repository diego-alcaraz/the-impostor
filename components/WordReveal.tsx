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
      <div className="text-gray-500 text-sm">
        Player {currentPlayerIndex + 1} of {players.length}
      </div>

      <h2 className="text-2xl font-bold text-white">{player.name}</h2>

      {!revealed ? (
        <>
          <p className="text-gray-400">
            Make sure only <span className="text-white font-semibold">{player.name}</span> can see the screen.
          </p>
          <button
            onClick={handleReveal}
            className="w-full py-6 bg-gray-800 border-2 border-gray-600 hover:border-red-500 rounded-2xl text-gray-300 hover:text-white text-lg transition-colors"
          >
            👁️ Tap to reveal your word
          </button>
        </>
      ) : (
        <>
          <div className="w-full py-8 px-6 rounded-2xl space-y-4 border-2 border-gray-700 bg-gray-800/50">
            <div className="text-gray-400 text-sm">
              Topic: <span className="text-gray-200">{topic.emoji} {topic.name}</span>
            </div>
            {player.isImpostor ? (
              <div className="space-y-2">
                <div className="text-5xl">🕵️</div>
                <div className="text-red-500 text-2xl font-bold">
                  YOU ARE THE IMPOSTOR
                </div>
                <p className="text-gray-500 text-sm">
                  You don&apos;t know the word. Blend in!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-gray-400 text-sm">Your word is:</div>
                <div className="text-3xl font-bold text-emerald-400">
                  {player.word}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
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
                ? "bg-emerald-500"
                : i === currentPlayerIndex
                ? "bg-red-500"
                : "bg-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
