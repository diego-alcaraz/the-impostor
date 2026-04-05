"use client";

import { useState, useCallback } from "react";
import {
  MLGameState,
  createMLInitialState,
  startMLGame,
  addVote,
  tallyRound,
  nextRound,
} from "@/lib/mostLikelyState";
import MLSetupScreen from "@/components/mostlikely/MLSetupScreen";
import MLVoting from "@/components/mostlikely/MLVoting";
import MLRoundResults from "@/components/mostlikely/MLRoundResults";
import MLFinalResults from "@/components/mostlikely/MLFinalResults";
import Link from "next/link";

export default function MostLikelyGame() {
  const [state, setState] = useState<MLGameState>(createMLInitialState());

  const handleStartGame = useCallback(
    (playerNames: string[], totalRounds: number) => {
      setState(startMLGame(playerNames, totalRounds));
    },
    []
  );

  const handleVote = useCallback(
    (voterId: number, targetId: number) => {
      setState((prev) => addVote(prev, voterId, targetId));
    },
    []
  );

  const handleAllVoted = useCallback(() => {
    setState((prev) => tallyRound(prev));
  }, []);

  const handleNextRound = useCallback(() => {
    setState((prev) => nextRound(prev));
  }, []);

  const handlePlayAgain = useCallback(() => {
    setState(createMLInitialState());
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">
      {state.phase === "setup" && (
        <Link
          href="/"
          className="mb-6 text-[#6B7280] hover:text-[#1A1A2E] text-sm transition-colors"
        >
          ← Back to Games
        </Link>
      )}

      <div className="w-full flex items-start justify-center">
        {state.phase === "setup" && (
          <MLSetupScreen onStartGame={handleStartGame} />
        )}

        {state.phase === "voting" && (
          <MLVoting
            players={state.players}
            prompt={state.prompts[state.currentRound]}
            currentRound={state.currentRound}
            totalRounds={state.totalRounds}
            currentVoterIndex={state.currentVoterIndex}
            onVote={handleVote}
            onAllVoted={handleAllVoted}
          />
        )}

        {state.phase === "round-results" && (
          <MLRoundResults
            players={state.players}
            result={state.roundResults[state.roundResults.length - 1]}
            currentRound={state.currentRound}
            totalRounds={state.totalRounds}
            onNextRound={handleNextRound}
          />
        )}

        {state.phase === "final-results" && (
          <MLFinalResults
            players={state.players}
            roundResults={state.roundResults}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </main>
  );
}
