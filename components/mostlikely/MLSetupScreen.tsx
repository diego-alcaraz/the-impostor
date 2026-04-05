"use client";

import { useState } from "react";

interface MLSetupScreenProps {
  onStartGame: (playerNames: string[], totalRounds: number) => void;
}

export default function MLSetupScreen({ onStartGame }: MLSetupScreenProps) {
  const [playerNames, setPlayerNames] = useState<string[]>(
    Array(10).fill("")
  );
  const [totalRounds, setTotalRounds] = useState(10);
  const [error, setError] = useState("");

  const addPlayer = () => {
    if (playerNames.length < 20) {
      setPlayerNames([...playerNames, ""]);
    }
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 3) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
    }
  };

  const updateName = (index: number, name: string) => {
    const updated = [...playerNames];
    updated[index] = name;
    setPlayerNames(updated);
  };

  const handleStart = () => {
    const trimmed = playerNames.map((n) => n.trim());
    if (trimmed.some((n) => n === "")) {
      setError("All players must have a name.");
      return;
    }
    if (new Set(trimmed).size !== trimmed.length) {
      setError("Player names must be unique.");
      return;
    }
    setError("");
    onStartGame(trimmed, totalRounds);
  };

  const roundOptions = [5, 10, 15, 20];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gold mb-2 tracking-wider">
          MOST LIKELY TO...
        </h1>
        <p className="text-[#6B7280] text-sm">
          Vote for who fits each prompt best. The most voted player scores!
        </p>
      </div>

      {/* Players */}
      <div className="w-full space-y-3">
        <h2 className="text-lg font-semibold text-[#1A1A2E]">Players</h2>
        {playerNames.map((name, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-[#6B7280] text-sm w-6 text-right">
              {i + 1}.
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              placeholder={`Player ${i + 1}`}
              maxLength={20}
              className="flex-1 bg-[#F7F7F8] border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1A1A2E] placeholder-[#9CA3AF] focus:outline-none focus:border-gold transition-colors"
            />
            {playerNames.length > 3 && (
              <button
                onClick={() => removePlayer(i)}
                className="text-[#9CA3AF] hover:text-red-500 transition-colors text-xl leading-none"
              >
                ×
              </button>
            )}
          </div>
        ))}
        {playerNames.length < 20 && (
          <button
            onClick={addPlayer}
            className="w-full py-2 border border-dashed border-[#E5E7EB] rounded-lg text-[#6B7280] hover:border-[#B8860B] hover:text-[#B8860B] transition-colors"
          >
            + Add Player
          </button>
        )}
      </div>

      {/* Rounds */}
      <div className="w-full space-y-2">
        <h2 className="text-lg font-semibold text-[#1A1A2E]">Rounds</h2>
        <div className="flex gap-2">
          {roundOptions.map((n) => (
            <button
              key={n}
              onClick={() => setTotalRounds(n)}
              className={`flex-1 py-3 rounded-lg font-bold transition-colors ${
                totalRounds === n
                  ? "bg-gold text-white"
                  : "bg-[#F7F7F8] text-[#6B7280] border border-[#E5E7EB] hover:border-[#B8860B]"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        onClick={handleStart}
        className="w-full py-4 bg-gold hover:bg-gold-dark text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-gold-dark/30"
      >
        START GAME
      </button>
    </div>
  );
}
