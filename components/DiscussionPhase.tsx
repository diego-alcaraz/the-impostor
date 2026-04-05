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
      <div className="text-gray-500 text-sm">Round {round}</div>

      <h2 className="text-xl font-bold text-gray-200">
        {topic.emoji} Topic: {topic.name}
      </h2>

      <p className="text-gray-400 text-sm">
        Each player gives a <span className="text-white">one-word clue</span>{" "}
        about the secret word. The impostor must bluff!
      </p>

      {/* Current speaker */}
      <div className="w-full py-6 px-6 rounded-2xl border-2 border-gray-700 bg-gray-800/50 space-y-3">
        <div className="text-gray-500 text-sm">
          Turn {currentTurn + 1} of {activePlayers.length}
        </div>
        <div className="text-2xl font-bold text-white">
          {activePlayers[currentTurn].name}
        </div>
        <div className="text-gray-400">Give your clue!</div>

        {/* Timer */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`text-5xl font-mono font-bold ${
              timerSeconds <= 5 && timerRunning
                ? "text-red-500 animate-pulse"
                : timerSeconds === 0
                ? "text-red-500"
                : "text-white"
            }`}
          >
            {timerSeconds}s
          </div>
          <div className="flex gap-2">
            {!timerRunning && timerSeconds > 0 && (
              <button
                onClick={() => setTimerRunning(true)}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm text-white transition-colors"
              >
                ▶ Start Timer
              </button>
            )}
            {timerRunning && (
              <button
                onClick={() => setTimerRunning(false)}
                className="px-4 py-1.5 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm text-white transition-colors"
              >
                ⏸ Pause
              </button>
            )}
            <button
              onClick={() => {
                setTimerSeconds(30);
                setTimerRunning(false);
              }}
              className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </div>

      {/* Player order */}
      <div className="w-full space-y-1">
        <div className="text-gray-500 text-xs text-left">Turn order:</div>
        <div className="flex flex-wrap gap-2">
          {activePlayers.map((p, i) => (
            <span
              key={p.id}
              className={`px-3 py-1 rounded-full text-sm ${
                i < currentTurn
                  ? "bg-gray-800 text-gray-600 line-through"
                  : i === currentTurn
                  ? "bg-red-600/20 text-red-400 border border-red-600"
                  : "bg-gray-800 text-gray-400"
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
          className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors"
        >
          Next Player →
        </button>
      ) : null}

      <button
        onClick={onStartVoting}
        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-900/30"
      >
        🗳️ Start Voting
      </button>
    </div>
  );
}
