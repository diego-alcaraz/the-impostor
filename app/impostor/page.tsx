"use client";

import { useState, useCallback } from "react";
import {
  GameState,
  createInitialState,
  startGame,
  castVote,
  tallyVotes,
  checkImpostorGuess,
} from "@/lib/gameState";
import { Topic } from "@/lib/topics";
import SetupScreen from "@/components/SetupScreen";
import WordReveal from "@/components/WordReveal";
import DiscussionPhase from "@/components/DiscussionPhase";
import VotingPhase from "@/components/VotingPhase";
import Results from "@/components/Results";
import Link from "next/link";

export default function ImpostorGame() {
  const [gameState, setGameState] = useState<GameState>(createInitialState());

  const handleStartGame = useCallback(
    (playerNames: string[], impostorCount: number, topic?: Topic) => {
      setGameState(startGame(playerNames, impostorCount, topic));
    },
    []
  );

  const handleNextPlayer = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentPlayerIndex: prev.currentPlayerIndex + 1,
    }));
  }, []);

  const handleAllRevealed = useCallback(() => {
    setGameState((prev) => ({ ...prev, phase: "discussion" }));
  }, []);

  const handleStartVoting = useCallback(() => {
    setGameState((prev) => ({ ...prev, phase: "voting" }));
  }, []);

  const handleSubmitVotes = useCallback(
    (votes: Map<number, number>) => {
      let updated = { ...gameState };
      votes.forEach((targetId, voterId) => {
        updated = castVote(updated, voterId, targetId);
      });
      updated = tallyVotes(updated);
      setGameState(updated);
    },
    [gameState]
  );

  const handleImpostorGuess = useCallback(
    (guess: string) => {
      setGameState(checkImpostorGuess(gameState, guess));
    },
    [gameState]
  );

  const handlePlayAgain = useCallback(() => {
    setGameState(createInitialState());
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">
      {gameState.phase === "setup" && (
        <Link
          href="/"
          className="mb-6 text-[#6B7280] hover:text-[#1A1A2E] text-sm transition-colors"
        >
          ← Back to Games
        </Link>
      )}

      <div className="w-full flex items-start justify-center">
        {gameState.phase === "setup" && (
          <SetupScreen onStartGame={handleStartGame} />
        )}

        {gameState.phase === "word-reveal" && gameState.topic && (
          <WordReveal
            players={gameState.players}
            topic={gameState.topic}
            currentPlayerIndex={gameState.currentPlayerIndex}
            onNext={handleNextPlayer}
            onAllRevealed={handleAllRevealed}
          />
        )}

        {gameState.phase === "discussion" && gameState.topic && (
          <DiscussionPhase
            players={gameState.players}
            topic={gameState.topic}
            round={gameState.round}
            onStartVoting={handleStartVoting}
          />
        )}

        {gameState.phase === "voting" && (
          <VotingPhase
            players={gameState.players}
            onSubmitVotes={handleSubmitVotes}
          />
        )}

        {gameState.phase === "results" &&
          gameState.topic &&
          gameState.secretWord && (
            <Results
              players={gameState.players}
              topic={gameState.topic}
              secretWord={gameState.secretWord}
              impostorGuess={gameState.impostorGuess}
              impostorGuessCorrect={gameState.impostorGuessCorrect}
              onImpostorGuess={handleImpostorGuess}
              onPlayAgain={handlePlayAgain}
            />
          )}
      </div>
    </main>
  );
}
