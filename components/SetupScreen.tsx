"use client";

import { useState } from "react";
import { topics, Topic } from "@/lib/topics";

interface SetupScreenProps {
  onStartGame: (
    playerNames: string[],
    impostorCount: number,
    topic?: Topic
  ) => void;
}

export default function SetupScreen({ onStartGame }: SetupScreenProps) {
  const [playerNames, setPlayerNames] = useState<string[]>(["", "", ""]);
  const [impostorCount, setImpostorCount] = useState(1);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(-1);
  const [error, setError] = useState("");

  const addPlayer = () => {
    if (playerNames.length < 20) {
      setPlayerNames([...playerNames, ""]);
    }
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 3) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
      if (impostorCount >= playerNames.length - 1) {
        setImpostorCount(Math.max(1, playerNames.length - 2));
      }
    }
  };

  const updateName = (index: number, name: string) => {
    const updated = [...playerNames];
    updated[index] = name;
    setPlayerNames(updated);
  };

  const maxImpostors = Math.floor(playerNames.length / 2);

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
    if (impostorCount >= trimmed.length) {
      setError("There must be more regular players than impostors.");
      return;
    }
    setError("");
    const topic =
      selectedTopicIndex >= 0 ? topics[selectedTopicIndex] : undefined;
    onStartGame(trimmed, impostorCount, topic);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-2 tracking-wider">
          THE IMPOSTOR
        </h1>
        <p className="text-gray-400 text-sm">
          Find the impostor among you... or bluff your way out.
        </p>
      </div>

      {/* Players */}
      <div className="w-full space-y-3">
        <h2 className="text-lg font-semibold text-gray-200">Players</h2>
        {playerNames.map((name, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-gray-500 text-sm w-6 text-right">
              {i + 1}.
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              placeholder={`Player ${i + 1}`}
              maxLength={20}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
            />
            {playerNames.length > 3 && (
              <button
                onClick={() => removePlayer(i)}
                className="text-gray-600 hover:text-red-500 transition-colors text-xl leading-none"
              >
                ×
              </button>
            )}
          </div>
        ))}
        {playerNames.length < 20 && (
          <button
            onClick={addPlayer}
            className="w-full py-2 border border-dashed border-gray-700 rounded-lg text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-colors"
          >
            + Add Player
          </button>
        )}
      </div>

      {/* Impostor Count */}
      <div className="w-full space-y-2">
        <h2 className="text-lg font-semibold text-gray-200">
          Number of Impostors
        </h2>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: maxImpostors }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setImpostorCount(n)}
              className={`w-12 h-12 rounded-lg font-bold transition-colors ${
                impostorCount === n
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Topic Selection */}
      <div className="w-full space-y-2">
        <h2 className="text-lg font-semibold text-gray-200">Topic</h2>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedTopicIndex(-1)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedTopicIndex === -1
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500"
            }`}
          >
            🎲 Random
          </button>
          {topics.map((topic, i) => (
            <button
              key={i}
              onClick={() => setSelectedTopicIndex(i)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedTopicIndex === i
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500"
              }`}
            >
              {topic.emoji} {topic.name}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-red-900/30"
      >
        START GAME
      </button>
    </div>
  );
}
