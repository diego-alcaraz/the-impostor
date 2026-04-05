"use client";

import Link from "next/link";
import Image from "next/image";

const games = [
  {
    title: "The Impostor",
    emoji: "🕵️",
    description:
      "A secret word is given to everyone — except the impostor. Give clues, debate, and vote to find out who's faking it!",
    players: "3–20 players",
    href: "/impostor",
    gradient: "from-[#D4A017]/10 to-[#B8860B]/5",
    border: "border-[#B8860B]/30 hover:border-[#D4A017]",
    badge: "bg-[#D4A017]",
    btnBg: "bg-[#D4A017] hover:bg-[#B8860B]",
  },
  {
    title: "Most Likely To...",
    emoji: "👑",
    description:
      "Fun prompts, honest votes. Who's most likely to survive a zombie apocalypse? The group decides!",
    players: "3–20 players",
    href: "/most-likely",
    gradient: "from-[#F0C75E]/10 to-[#D4A017]/5",
    border: "border-[#D4A017]/30 hover:border-[#F0C75E]",
    badge: "bg-[#B8860B]",
    btnBg: "bg-[#B8860B] hover:bg-[#D4A017]",
  },
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12 sm:py-20">
      {/* Logo + Title */}
      <div className="text-center mb-12">
        <Image
          src="/the-impostor/logo.jpg"
          alt="La Montaña"
          width={120}
          height={120}
          className="mx-auto mb-6 rounded-full shadow-lg"
          priority
        />
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1A2E] mb-3 tracking-tight">
          Party Games
        </h1>
        <p className="text-[#6B7280] text-lg">
          Pass the device. Play with friends. No sign-up needed.
        </p>
      </div>

      <div className="w-full max-w-lg space-y-6">
        {games.map((game) => (
          <Link
            key={game.href}
            href={game.href}
            className={`block w-full p-6 rounded-2xl border-2 ${game.border} bg-gradient-to-br ${game.gradient} transition-all hover:scale-[1.02] active:scale-[0.98]`}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{game.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-[#1A1A2E]">
                    {game.title}
                  </h2>
                  <span
                    className={`text-xs ${game.badge} text-white px-2 py-0.5 rounded-full font-semibold`}
                  >
                    {game.players}
                  </span>
                </div>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {game.description}
                </p>
                <div
                  className={`inline-block mt-4 px-5 py-2 ${game.btnBg} text-white font-semibold rounded-lg transition-colors text-sm`}
                >
                  Play →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex items-center gap-3">
        <Image
          src="/the-impostor/logo.jpg"
          alt="La Montaña"
          width={28}
          height={28}
          className="rounded-full"
        />
        <p className="text-[#6B7280] text-sm">
          La Montaña Cerveza Artesanal
        </p>
      </div>
    </main>
  );
}
