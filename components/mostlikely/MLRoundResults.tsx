"use client";

import { MLPlayer, MLRoundResult } from "@/lib/mostLikelyState";

interface MLRoundResultsProps {
  players: MLPlayer[];
  result: MLRoundResult;
  currentRound: number;
  totalRounds: number;
  onNextRound: () => void;
}

export default function MLRoundResults({
  players,
  result,
  currentRound,
  totalRounds,
  onNextRound,
}: MLRoundResultsProps) {
  // Count votes per player for this round
  const voteCounts = new Map<number, number>();
  result.votes.forEach(({ targetId }) => {
    voteCounts.set(targetId, (voteCounts.get(targetId) || 0) + 1);
  });

  const sortedPlayers = [...players]
    .map((p) => ({ ...p, roundVotes: voteCounts.get(p.id) || 0 }))
    .sort((a, b) => b.roundVotes - a.roundVotes);

  const winner = result.winnerId !== null
    ? players.find((p) => p.id === result.winnerId)
    : null;

  const isLastRound = currentRound + 1 >= totalRounds;

  // Who voted for whom
  const voteDetails = result.votes.map((v) => ({
    voter: players.find((p) => p.id === v.voterId)!.name,
    target: players.find((p) => p.id === v.targetId)!.name,
  }));

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto text-center">
      <div className="text-gray-500 text-sm">
        Round {currentRound + 1} of {totalRounds}
      </div>

      {/* Prompt */}
      <div className="w-full py-4 px-6 rounded-xl border border-gold/30 bg-gold/5">
        <p className="text-lg font-bold text-gold">{result.prompt}</p>
      </div>

      {/* Winner */}
      {result.isTie ? (
        <div className="space-y-1">
          <div className="text-4xl">🤝</div>
          <p className="text-xl font-bold text-gray-300">It&apos;s a tie!</p>
        </div>
      ) : winner ? (
        <div className="space-y-1">
          <div className="text-4xl">👑</div>
          <p className="text-2xl font-bold text-gold">{winner.name}</p>
          <p className="text-gray-500 text-sm">
            {result.winnerVotes} vote{result.winnerVotes !== 1 ? "s" : ""}
          </p>
        </div>
      ) : null}

      {/* Vote breakdown */}
      <div className="w-full space-y-2">
        {sortedPlayers
          .filter((p) => p.roundVotes > 0)
          .map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700"
            >
              <span className="text-white font-semibold">{p.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">
                  {p.roundVotes} vote{p.roundVotes !== 1 ? "s" : ""}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: p.roundVotes }).map((_, i) => (
                    <span key={i} className="text-gold text-sm">●</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Vote details */}
      <details className="w-full text-left">
        <summary className="text-gray-600 text-sm cursor-pointer hover:text-gray-400 transition-colors">
          Show who voted for whom
        </summary>
        <div className="mt-2 space-y-1 pl-2">
          {voteDetails.map((v, i) => (
            <p key={i} className="text-gray-500 text-sm">
              <span className="text-gray-400">{v.voter}</span>
              {" → "}
              <span className="text-gold">{v.target}</span>
            </p>
          ))}
        </div>
      </details>

      {/* Current standings */}
      <div className="w-full pt-2 border-t border-gray-800">
        <div className="text-gray-500 text-xs mb-2">Current Standings</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {[...players]
            .sort((a, b) => b.score - a.score)
            .map((p, i) => (
              <span
                key={p.id}
                className={`px-3 py-1 rounded-full text-sm ${
                  i === 0
                    ? "bg-amber-500/20 text-gold border border-amber-500/40"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {p.name}: {p.score}
              </span>
            ))}
        </div>
      </div>

      <button
        onClick={onNextRound}
        className="w-full py-4 bg-gold hover:bg-gold-dark text-black font-bold rounded-xl transition-colors shadow-lg shadow-gold-dark/30"
      >
        {isLastRound ? "🏆 Final Results" : "Next Round →"}
      </button>
    </div>
  );
}
