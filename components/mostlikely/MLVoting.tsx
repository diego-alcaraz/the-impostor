"use client";

import { useState } from "react";
import { MLPlayer } from "@/lib/mostLikelyState";

interface MLVotingProps {
  players: MLPlayer[];
  prompt: string;
  currentRound: number;
  totalRounds: number;
  currentVoterIndex: number;
  onVote: (voterId: number, targetId: number) => void;
  onAllVoted: () => void;
}

export default function MLVoting({
  players,
  prompt,
  currentRound,
  totalRounds,
  currentVoterIndex,
  onVote,
  onAllVoted,
}: MLVotingProps) {
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const currentVoter = players[currentVoterIndex];
  const isLast = currentVoterIndex === players.length - 1;

  const handleConfirm = () => {
    if (selectedTarget === null) return;
    onVote(currentVoter.id, selectedTarget);
    setConfirmed(true);
  };

  const handleNext = () => {
    setSelectedTarget(null);
    setConfirmed(false);
    if (isLast) {
      onAllVoted();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto text-center">
      <div className="text-gray-500 text-sm">
        Round {currentRound + 1} of {totalRounds}
      </div>

      {/* Prompt */}
      <div className="w-full py-6 px-6 rounded-2xl border-2 border-gold/30 bg-gold/5">
        <p className="text-2xl font-bold text-gold">{prompt}</p>
      </div>

      {!confirmed ? (
        <>
          <div className="text-gray-400">
            <span className="text-white font-semibold">{currentVoter.name}</span>,
            who do you pick?
          </div>

          <div className="w-full space-y-2">
            {players.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedTarget(p.id)}
                className={`w-full py-3 px-4 rounded-xl text-left transition-colors ${
                  selectedTarget === p.id
                    ? "bg-gold/20 border-2 border-gold text-white"
                    : "bg-gray-800 border-2 border-gray-700 text-gray-300 hover:border-gray-500"
                }`}
              >
                {p.name}
                {p.id === currentVoter.id && (
                  <span className="text-gray-600 text-sm ml-2">(you)</span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleConfirm}
            disabled={selectedTarget === null}
            className={`w-full py-4 font-bold rounded-xl transition-colors ${
              selectedTarget !== null
                ? "bg-gold hover:bg-gold-dark text-black"
                : "bg-gray-800 text-gray-600 cursor-not-allowed"
            }`}
          >
            Confirm Vote
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-400">
            <span className="text-white font-semibold">{currentVoter.name}</span>{" "}
            voted for{" "}
            <span className="text-gold font-semibold">
              {players.find((p) => p.id === selectedTarget)?.name}
            </span>
          </p>
          <p className="text-gray-600 text-sm">
            Pass the device to the next player.
          </p>
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gold hover:bg-gold-dark text-black font-bold rounded-xl transition-colors"
          >
            {isLast ? "📊 See Results" : "Next Voter →"}
          </button>
        </>
      )}

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-2">
        {players.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < currentVoterIndex
                ? "bg-gold"
                : i === currentVoterIndex
                ? "bg-white"
                : "bg-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
