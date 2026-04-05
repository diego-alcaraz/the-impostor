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

  const maxVotes = sortedByVotes[0]?.votesReceived || 0;
  const topVoted = sortedByVotes.filter((p) => p.votesReceived === maxVotes);
  const isTie = topVoted.length > 1;
  const eliminated = !isTie && topVoted.length === 1 ? topVoted[0] : null;
  const caughtImpostor = eliminated?.isImpostor || false;

  const showGuessPhase =
    caughtImpostor && impostorGuess === null && !showFinalResults;

  const allImpostorsCaught =
    eliminated && impostors.every((imp) => imp.id === eliminated.id);
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
        <h2 className="text-2xl font-bold text-gold">🎯 Last Chance!</h2>
        <p className="text-[#6B7280]">
          <span className="text-[#1A1A2E] font-semibold">{eliminated.name}</span>{" "}
          was voted out and is the impostor!
        </p>
        <p className="text-[#6B7280]">
          But the impostor gets one last chance — guess the secret word to steal the win!
        </p>

        <div className="w-full space-y-3">
          <div className="text-[#6B7280] text-sm">
            Topic: {topic.emoji} {topic.name}
          </div>
          <input
            type="text"
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            placeholder="Type your guess..."
            className="w-full bg-[#F7F7F8] border-2 border-[#E5E7EB] rounded-xl px-4 py-3 text-[#1A1A2E] text-center text-lg placeholder-[#9CA3AF] focus:outline-none focus:border-gold"
            onKeyDown={(e) => e.key === "Enter" && handleGuess()}
          />
          <button
            onClick={handleGuess}
            disabled={!guessInput.trim()}
            className={`w-full py-4 font-bold rounded-xl transition-colors ${
              guessInput.trim()
                ? "bg-gold hover:bg-gold-dark text-white"
                : "bg-[#F7F7F8] text-[#9CA3AF] cursor-not-allowed"
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
          <h2 className="text-3xl font-bold text-gold">IMPOSTOR WINS!</h2>
          <p className="text-[#6B7280]">
            {eliminated?.name} guessed the word correctly:{" "}
            <span className="text-[#10B981] font-bold">{secretWord}</span>
          </p>
        </div>
      ) : crewWins ? (
        <div className="space-y-2">
          <div className="text-5xl">🎉</div>
          <h2 className="text-3xl font-bold text-[#10B981]">CREW WINS!</h2>
          <p className="text-[#6B7280]">
            The impostor was caught and failed to guess the word!
          </p>
          {impostorGuess && (
            <p className="text-[#9CA3AF] text-sm">
              They guessed: &quot;{impostorGuess}&quot;
            </p>
          )}
        </div>
      ) : impostorWinsByEscape ? (
        <div className="space-y-2">
          <div className="text-5xl">🕵️</div>
          <h2 className="text-3xl font-bold text-gold">IMPOSTOR WINS!</h2>
          <p className="text-[#6B7280]">
            {isTie
              ? "The vote was tied — no one was eliminated!"
              : "The crew voted out an innocent player!"}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-5xl">📊</div>
          <h2 className="text-3xl font-bold text-[#1A1A2E]">Results</h2>
        </div>
      )}

      {/* Secret word reveal */}
      <div className="w-full py-4 px-6 rounded-xl bg-[#F7F7F8] border border-[#E5E7EB] space-y-1">
        <div className="text-[#6B7280] text-sm">The secret word was:</div>
        <div className="text-2xl font-bold text-[#10B981]">{secretWord}</div>
        <div className="text-[#6B7280] text-sm">
          {topic.emoji} {topic.name}
        </div>
      </div>

      {/* Vote breakdown */}
      <div className="w-full space-y-2">
        <h3 className="text-[#6B7280] text-sm font-semibold">Vote Results</h3>
        {sortedByVotes.map((p) => (
          <div
            key={p.id}
            className={`flex items-center justify-between px-4 py-3 rounded-xl ${
              p.isImpostor
                ? "bg-gold/10 border border-gold"
                : eliminated && p.id === eliminated.id
                ? "bg-amber-50 border border-amber-300"
                : "bg-[#F7F7F8] border border-[#E5E7EB]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-[#1A1A2E] font-semibold">{p.name}</span>
              {p.isImpostor && (
                <span className="text-xs bg-gold px-2 py-0.5 rounded-full text-white">
                  IMPOSTOR
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6B7280] text-sm">
                {p.votesReceived} vote{p.votesReceived !== 1 ? "s" : ""}
              </span>
              <div className="flex">
                {Array.from({ length: p.votesReceived }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">
                    ●
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Impostor reveal */}
      <div className="w-full py-3 px-4 rounded-xl bg-gold/10 border border-gold/30">
        <div className="text-[#6B7280] text-sm mb-1">
          {impostors.length === 1 ? "The impostor was:" : "The impostors were:"}
        </div>
        <div className="text-gold-dark font-bold text-lg">
          {impostors.map((p) => p.name).join(", ")}
        </div>
      </div>

      {/* Play Again */}
      <button
        onClick={onPlayAgain}
        className="w-full py-4 bg-gold hover:bg-gold-dark text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-gold-dark/30"
      >
        🔄 Play Again
      </button>
    </div>
  );
}
