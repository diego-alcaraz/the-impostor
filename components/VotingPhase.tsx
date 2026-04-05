"use client";

import { useState } from "react";
import { Player } from "@/lib/gameState";

interface VotingPhaseProps {
  players: Player[];
  onSubmitVotes: (votes: Map<number, number>) => void;
}

export default function VotingPhase({ players, onSubmitVotes }: VotingPhaseProps) {
  const activePlayers = players.filter((p) => !p.eliminated);
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [votes, setVotes] = useState<Map<number, number>>(new Map());
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const currentVoter = activePlayers[currentVoterIndex];
  const isLast = currentVoterIndex === activePlayers.length - 1;

  const handleConfirmVote = () => {
    if (selectedTarget === null) return;
    const newVotes = new Map(votes);
    newVotes.set(currentVoter.id, selectedTarget);
    setVotes(newVotes);
    setConfirmed(true);
  };

  const handleNext = () => {
    if (isLast) {
      onSubmitVotes(votes);
    } else {
      setCurrentVoterIndex(currentVoterIndex + 1);
      setSelectedTarget(null);
      setConfirmed(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-red-500">🗳️ Voting</h2>
      <div className="text-gray-500 text-sm">
        Voter {currentVoterIndex + 1} of {activePlayers.length}
      </div>

      {!confirmed ? (
        <>
          <p className="text-gray-400">
            <span className="text-white font-semibold">{currentVoter.name}</span>,
            who do you think is the impostor?
          </p>

          <div className="w-full space-y-2">
            {activePlayers
              .filter((p) => p.id !== currentVoter.id)
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedTarget(p.id)}
                  className={`w-full py-3 px-4 rounded-xl text-left transition-colors ${
                    selectedTarget === p.id
                      ? "bg-red-600/20 border-2 border-red-500 text-white"
                      : "bg-gray-800 border-2 border-gray-700 text-gray-300 hover:border-gray-500"
                  }`}
                >
                  {p.name}
                </button>
              ))}
          </div>

          <button
            onClick={handleConfirmVote}
            disabled={selectedTarget === null}
            className={`w-full py-4 font-bold rounded-xl transition-colors ${
              selectedTarget !== null
                ? "bg-red-600 hover:bg-red-700 text-white"
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
            <span className="text-red-400 font-semibold">
              {players.find((p) => p.id === selectedTarget)?.name}
            </span>
          </p>
          <p className="text-gray-600 text-sm">Pass the device to the next player.</p>
          <button
            onClick={handleNext}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
          >
            {isLast ? "📊 See Results" : "Next Voter →"}
          </button>
        </>
      )}

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-2">
        {activePlayers.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < currentVoterIndex
                ? "bg-red-500"
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
