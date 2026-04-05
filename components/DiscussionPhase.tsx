"use client";

import { useState, useEffect, useCallback } from "react";
import { Player } from "@/lib/gameState";
import { Topic } from "@/lib/topics";

interface DiscussionPhaseProps {
  players: Player[];
  topic: Topic;
  round: number;
  onStartVoting: () => void;
}

export default function DiscussionPhase({
  players,
  topic,
  round,
  onStartVoting,
}: DiscussionPhaseProps) {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const activePlayers = players.filter((p) => !p.eliminated);

  const nextTurn = useCallback(() => {
    if (currentTurn < activePlayers.length - 1) {
      setCurrentTurn(currentTurn + 1);
      setTimerSeconds(30);
      setTimerRunning(false);
    }
  }, [currentTurn, activePlayers.length]);

  useEffect(() => {
    if (!timerRunning || timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((s) => {
        if (s <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const isLastTurn = currentTurn === activePlayers.length - 1;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto text-center">
      <div className="text-[#6B7280] text-sm">Round {round}</div>

      <h2 className="text-xl font-bold text-[#1A1A2E]">
        {topic.emoji} Topic: {topic.name}
      </h2>

      <p className="text-[#6B7280] text-sm">
        Each player gives a <span className="text-[#1A1A2E] font-semibold">one-word clue</span>{" "}
        about the secret word. The impostor must bluff!
      </p>

      {/* Current speaker */}
      <div className="w-full py-6 px-6 rounded-2xl border-2 border-[#E5E7EB] bg-[#F7F7F8] space-y-3">
        <div className="text-[#6B7280] text-sm">
          Turn {currentTurn + 1} of {activePlayers.length}
        </div>
        <div className="text-2xl font-bold text-[#1A1A2E]">
          {activePlayers[currentTurn].name}
        </div>
        <div className="text-[#6B7280]">Give your clue!</div>

        {/* Timer */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`text-5xl font-mono font-bold ${
              timerSeconds <= 5 && timerRunning
                ? "text-red-500 animate-pulse"
                : timerSeconds === 0
                ? "text-red-500"
                : "text-[#1A1A2E]"
            }`}
          >
            {timerSeconds}s
          </div>
          <div className="flex gap-2">
            {!timerRunning && timerSeconds > 0 && (
              <button
                onClick={() => setTimerRunning(true)}
                className="px-4 py-1.5 bg-[#10B981] hover:bg-[#059669] rounded-lg text-sm text-white transition-colors"
              >
                ▶ Start Timer
              </button>
            )}
            {timerRunning && (
              <button
                onClick={() => setTimerRunning(false)}
                className="px-4 py-1.5 bg-[#6B7280] hover:bg-[#4B5563] rounded-lg text-sm text-white transition-colors"
              >
                ⏸ Pause
              </button>
            )}
            <button
              onClick={() => {
                setTimerSeconds(30);
                setTimerRunning(false);
              }}
              className="px-4 py-1.5 bg-[#F7F7F8] border border-[#E5E7EB] hover:bg-[#E5E7EB] rounded-lg text-sm text-[#6B7280] transition-colors"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </div>

      {/* Player order */}
      <div className="w-full space-y-1">
        <div className="text-[#9CA3AF] text-xs text-left">Turn order:</div>
        <div className="flex flex-wrap gap-2">
          {activePlayers.map((p, i) => (
            <span
              key={p.id}
              className={`px-3 py-1 rounded-full text-sm ${
                i < currentTurn
                  ? "bg-[#F7F7F8] text-[#9CA3AF] line-through"
                  : i === currentTurn
                  ? "bg-gold/20 text-gold border border-gold"
                  : "bg-[#F7F7F8] text-[#6B7280]"
              }`}
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      {!isLastTurn ? (
        <button
          onClick={nextTurn}
          className="w-full py-3 bg-[#F7F7F8] border border-[#E5E7EB] hover:bg-[#E5E7EB] text-[#1A1A2E] font-semibold rounded-xl transition-colors"
        >
          Next Player →
        </button>
      ) : null}

      <button
        onClick={onStartVoting}
        className="w-full py-4 bg-gold hover:bg-gold-dark text-white font-bold rounded-xl transition-colors shadow-lg shadow-gold-dark/30"
      >
        🗳️ Start Voting
      </button>
    </div>
  );
}
