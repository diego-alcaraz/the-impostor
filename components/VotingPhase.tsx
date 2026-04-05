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
      <h2 className="text-2xl font-bold text-gold">🗳️ Voting</h2>
      <div className="text-[#6B7280] text-sm">
        Voter {currentVoterIndex + 1} of {activePlayers.length}
      </div>

      {!confirmed ? (
        <>
          <p className="text-[#6B7280]">
            <span className="text-[#1A1A2E] font-semibold">{currentVoter.name}</span>,
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
                      ? "bg-gold/20 border-2 border-gold text-[#1A1A2E]"
                      : "bg-[#F7F7F8] border-2 border-[#E5E7EB] text-[#1A1A2E] hover:border-[#B8860B]"
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
                ? "bg-gold hover:bg-gold-dark text-white"
                : "bg-[#F7F7F8] text-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            Confirm Vote
          </button>
        </>
      ) : (
        <>
          <p className="text-[#6B7280]">
            <span className="text-[#1A1A2E] font-semibold">{currentVoter.name}</span>{" "}
            voted for{" "}
            <span className="text-gold font-semibold">
              {players.find((p) => p.id === selectedTarget)?.name}
            </span>
          </p>
          <p className="text-[#9CA3AF] text-sm">Pass the device to the next player.</p>
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gold hover:bg-gold-dark text-white font-bold rounded-xl transition-colors"
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
                ? "bg-gold"
                : i === currentVoterIndex
                ? "bg-[#1A1A2E]"
                : "bg-[#E5E7EB]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
