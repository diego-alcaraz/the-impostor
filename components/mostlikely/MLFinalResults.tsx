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

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto text-center">
      <div className="text-5xl">🏆</div>
      <h2 className="text-3xl font-bold text-gold-dark">Final Results!</h2>

      {/* Winner banner */}
      <div className="w-full py-6 px-6 rounded-2xl border-2 border-gold/40 bg-gold/10 space-y-2">
        <div className="text-lg text-[#6B7280]">The group decided...</div>
        <div className="text-3xl font-bold text-[#1A1A2E]">{winner.name}</div>
        <div className="text-gold-dark">
          is the Most Likely To everything! ({maxScore} points)
        </div>
      </div>

      {/* Scoreboard */}
      <div className="w-full space-y-2">
        <h3 className="text-[#6B7280] text-sm font-semibold">Scoreboard</h3>
        {sorted.map((p, i) => (
          <div
            key={p.id}
            className={`flex items-center justify-between px-4 py-3 rounded-xl ${
              i === 0
                ? "bg-gold/15 border-2 border-gold/40"
                : i === 1
                ? "bg-[#F7F7F8] border border-[#D1D5DB]"
                : i === 2
                ? "bg-[#F7F7F8] border border-[#E5E7EB]"
                : "bg-white border border-[#E5E7EB]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl w-8">
                {i < 3 ? medals[i] : <span className="text-[#9CA3AF] text-sm font-mono">{i + 1}.</span>}
              </span>
              <span className={`font-semibold ${i === 0 ? "text-gold-dark" : "text-[#1A1A2E]"}`}>
                {p.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-lg ${i === 0 ? "text-gold-dark" : "text-[#1A1A2E]"}`}>
                {p.score}
              </span>
              <span className="text-[#9CA3AF] text-sm">pts</span>
            </div>
          </div>
        ))}
      </div>

      {/* Round recap */}
      <details className="w-full text-left">
        <summary className="text-[#9CA3AF] text-sm cursor-pointer hover:text-[#6B7280] transition-colors">
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
                className="flex items-start justify-between px-3 py-2 rounded-lg bg-[#F7F7F8] text-sm"
              >
                <span className="text-[#6B7280] flex-1">
                  R{i + 1}: {r.prompt}
                </span>
                <span className="text-gold-dark ml-3 whitespace-nowrap">
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
        className="w-full py-4 bg-gold hover:bg-gold-dark text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-gold-dark/30"
      >
        🔄 Play Again
      </button>
    </div>
  );
}
