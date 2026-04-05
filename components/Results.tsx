"use client";

import { useState } from "react";
import { Player } from "@/lib/gameState";
import { Topic } from "@/lib/topics";

interface ResultsProps {
  players: Player[];
  topic: Topic;
  secretWord: string;
  impostorGuess: string | null;
  impostorGuessCorrect: boolean | null;
  onImpostorGuess: (guess: string) => void;
  onPlayAgain: () => void;
}

export default function Results({
  players,
  topic,
  secretWord,
  impostorGuess,
  impostorGuessCorrect,
  onImpostorGuess,
  onPlayAgain,
}: ResultsProps) {
  const [guessInput, setGuessInput] = useState("");
  const [showFinalResults, setShowFinalResults] = useState(false);

  const impostors = players.filter((p) => p.isImpostor);
  const sortedByVotes = [...players]
    .filter((p) => !p.eliminated)
    .sort((a, b) => b.votesReceived - a.votesReceived);

  // Find who got the most votes
  const maxVotes = sortedByVotes[0]?.votesReceived || 0;
  const topVoted = sortedByVotes.filter((p) => p.votesReceived === maxVotes);
  const isTie = topVoted.length > 1;
  const eliminated = !isTie && topVoted.length === 1 ? topVoted[0] : null;
  const caughtImpostor = eliminated?.isImpostor || false;

  // If an impostor was caught and hasn't guessed yet, show the guess phase
  const showGuessPhase =
    caughtImpostor && impostorGuess === null && !showFinalResults;

  // Determine final outcome
  const allImpostorsCaught =
    eliminated && impostors.every((imp) => imp.id === eliminated.id);
  // For multi-impostor: simplified — one round of voting
  const crewWins = caughtImpostor && !impostorGuessCorrect && impostorGuess !== null;
  const impostorWinsByGuess = impostorGuessCorrect === true;
  const impostorWinsByEscape = !caughtImpostor;

  const handleGuess = () => {
    if (guessInput.trim()) {
      onImpostorGuess(guessInput.trim());
    }
  };

  if (showGuessPhase && eliminated) {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-red-500">🎯 Last Chance!</h2>
        <p className="text-gray-400">
          <span className="text-white font-semibold">{eliminated.name}</span>{" "}
          was voted out and is the impostor!
        </p>
        <p className="text-gray-300">
          But the impostor gets one last chance — guess the secret word to steal the win!
        </p>

        <div className="w-full space-y-3">
          <div className="text-gray-500 text-sm">
            Topic: {topic.emoji} {topic.name}
          </div>
          <input
            type="text"
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            placeholder="Type your guess..."
            className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-4 py-3 text-white text-center text-lg placeholder-gray-600 focus:outline-none focus:border-red-500"
            onKeyDown={(e) => e.key === "Enter" && handleGuess()}
          />
          <button
            onClick={handleGuess}
            disabled={!guessInput.trim()}
            className={`w-full py-4 font-bold rounded-xl transition-colors ${
              guessInput.trim()
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-800 text-gray-600 cursor-not-allowed"
            }`}
          >
            Submit Guess
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto text-center">
      {/* Outcome header */}
      {impostorWinsByGuess ? (
        <div className="space-y-2">
          <div className="text-5xl">🕵️</div>
          <h2 className="text-3xl font-bold text-red-500">IMPOSTOR WINS!</h2>
          <p className="text-gray-400">
            {eliminated?.name} guessed the word correctly:{" "}
            <span className="text-emerald-400 font-bold">{secretWord}</span>
          </p>
        </div>
      ) : crewWins ? (
        <div className="space-y-2">
          <div className="text-5xl">🎉</div>
          <h2 className="text-3xl font-bold text-emerald-400">CREW WINS!</h2>
          <p className="text-gray-400">
            The impostor was caught and failed to guess the word!
          </p>
          {impostorGuess && (
            <p className="text-gray-500 text-sm">
              They guessed: &quot;{impostorGuess}&quot;
            </p>
          )}
        </div>
      ) : impostorWinsByEscape ? (
        <div className="space-y-2">
          <div className="text-5xl">🕵️</div>
          <h2 className="text-3xl font-bold text-red-500">IMPOSTOR WINS!</h2>
          <p className="text-gray-400">
            {isTie
              ? "The vote was tied — no one was eliminated!"
              : "The crew voted out an innocent player!"}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-5xl">📊</div>
          <h2 className="text-3xl font-bold text-white">Results</h2>
        </div>
      )}

      {/* Secret word reveal */}
      <div className="w-full py-4 px-6 rounded-xl bg-gray-800/50 border border-gray-700 space-y-1">
        <div className="text-gray-500 text-sm">The secret word was:</div>
        <div className="text-2xl font-bold text-emerald-400">{secretWord}</div>
        <div className="text-gray-500 text-sm">
          {topic.emoji} {topic.name}
        </div>
      </div>

      {/* Vote breakdown */}
      <div className="w-full space-y-2">
        <h3 className="text-gray-400 text-sm font-semibold">Vote Results</h3>
        {sortedByVotes.map((p) => (
          <div
            key={p.id}
            className={`flex items-center justify-between px-4 py-3 rounded-xl ${
              p.isImpostor
                ? "bg-red-900/20 border border-red-800"
                : eliminated && p.id === eliminated.id
                ? "bg-yellow-900/20 border border-yellow-800"
                : "bg-gray-800/50 border border-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold">{p.name}</span>
              {p.isImpostor && (
                <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full text-white">
                  IMPOSTOR
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">
                {p.votesReceived} vote{p.votesReceived !== 1 ? "s" : ""}
              </span>
              <div className="flex">
                {Array.from({ length: p.votesReceived }).map((_, i) => (
                  <span key={i} className="text-red-500 text-sm">
                    ●
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Impostor reveal */}
      <div className="w-full py-3 px-4 rounded-xl bg-red-900/10 border border-red-900/30">
        <div className="text-gray-500 text-sm mb-1">
          {impostors.length === 1 ? "The impostor was:" : "The impostors were:"}
        </div>
        <div className="text-red-400 font-bold text-lg">
          {impostors.map((p) => p.name).join(", ")}
        </div>
      </div>

      {/* Play Again */}
      <button
        onClick={onPlayAgain}
        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-red-900/30"
      >
        🔄 Play Again
      </button>
    </div>
  );
}
