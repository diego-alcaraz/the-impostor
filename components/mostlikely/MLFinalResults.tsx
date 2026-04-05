"use client";

import { MLPlayer, MLRoundResult } from "@/lib/mostLikelyState";

interface MLFinalResultsProps {
  players: MLPlayer[];
  roundResults: MLRoundResult[];
  onPlayAgain: () => void;
}

export default function MLFinalResults({
  players,
  roundResults,
  onPlayAgain,
}: MLFinalResultsProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const winner = sorted[0];
  const maxScore = winner.score;

  // Medals for top 3
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto text-center">
      <div className="text-5xl">🏆</div>
      <h2 className="text-3xl font-bold text-gold">Final Results!</h2>

      {/* Winner banner */}
      <div className="w-full py-6 px-6 rounded-2xl border-2 border-gold/40 bg-gold/10 space-y-2">
        <div className="text-lg text-gray-400">The group decided...</div>
        <div className="text-3xl font-bold text-white">{winner.name}</div>
        <div className="text-gold">
          is the Most Likely To everything! ({maxScore} points)
        </div>
      </div>

      {/* Scoreboard */}
      <div className="w-full space-y-2">
        <h3 className="text-gray-400 text-sm font-semibold">Scoreboard</h3>
        {sorted.map((p, i) => (
          <div
            key={p.id}
            className={`flex items-center justify-between px-4 py-3 rounded-xl ${
              i === 0
                ? "bg-gold/15 border-2 border-gold/40"
                : i === 1
                ? "bg-gray-800/80 border border-gray-600"
                : i === 2
                ? "bg-gray-800/60 border border-gray-700"
                : "bg-gray-800/40 border border-gray-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl w-8">
                {i < 3 ? medals[i] : <span className="text-gray-600 text-sm font-mono">{i + 1}.</span>}
              </span>
              <span className={`font-semibold ${i === 0 ? "text-gold" : "text-white"}`}>
                {p.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-lg ${i === 0 ? "text-gold" : "text-gray-300"}`}>
                {p.score}
              </span>
              <span className="text-gray-600 text-sm">pts</span>
            </div>
          </div>
        ))}
      </div>

      {/* Round recap */}
      <details className="w-full text-left">
        <summary className="text-gray-600 text-sm cursor-pointer hover:text-gray-400 transition-colors">
          Round-by-round recap
        </summary>
        <div className="mt-3 space-y-2">
          {roundResults.map((r, i) => {
            const winnerPlayer = r.winnerId !== null
              ? players.find((p) => p.id === r.winnerId)
              : null;
            return (
              <div
                key={i}
                className="flex items-start justify-between px-3 py-2 rounded-lg bg-gray-800/30 text-sm"
              >
                <span className="text-gray-500 flex-1">
                  R{i + 1}: {r.prompt}
                </span>
                <span className="text-gold ml-3 whitespace-nowrap">
                  {r.isTie ? "Tie" : winnerPlayer?.name || "—"}
                </span>
              </div>
            );
          })}
        </div>
      </details>

      {/* Play Again */}
      <button
        onClick={onPlayAgain}
        className="w-full py-4 bg-gold hover:bg-gold-dark text-black font-bold text-lg rounded-xl transition-colors shadow-lg shadow-gold-dark/30"
      >
        🔄 Play Again
      </button>
    </div>
  );
}
