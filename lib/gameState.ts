import { Topic, getRandomTopic, getRandomWord } from "./topics";

export type GamePhase =
  | "setup"
  | "word-reveal"
  | "discussion"
  | "voting"
  | "results";

export interface Player {
  id: number;
  name: string;
  isImpostor: boolean;
  word: string | null;
  votedFor: number | null;
  votesReceived: number;
  eliminated: boolean;
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  impostorCount: number;
  topic: Topic | null;
  secretWord: string | null;
  currentPlayerIndex: number;
  round: number;
  impostorGuess: string | null;
  impostorGuessCorrect: boolean | null;
}

export function createInitialState(): GameState {
  return {
    phase: "setup",
    players: [],
    impostorCount: 1,
    topic: null,
    secretWord: null,
    currentPlayerIndex: 0,
    round: 1,
    impostorGuess: null,
    impostorGuessCorrect: null,
  };
}

export function startGame(
  playerNames: string[],
  impostorCount: number,
  selectedTopic?: Topic
): GameState {
  const topic = selectedTopic || getRandomTopic();
  const secretWord = getRandomWord(topic);

  // Randomly select impostors
  const impostorIndices = new Set<number>();
  while (impostorIndices.size < impostorCount) {
    impostorIndices.add(Math.floor(Math.random() * playerNames.length));
  }

  const players: Player[] = playerNames.map((name, i) => ({
    id: i,
    name,
    isImpostor: impostorIndices.has(i),
    word: impostorIndices.has(i) ? null : secretWord,
    votedFor: null,
    votesReceived: 0,
    eliminated: false,
  }));

  return {
    phase: "word-reveal",
    players,
    impostorCount,
    topic,
    secretWord,
    currentPlayerIndex: 0,
    round: 1,
    impostorGuess: null,
    impostorGuessCorrect: null,
  };
}

export function castVote(
  state: GameState,
  voterId: number,
  targetId: number
): GameState {
  const players = state.players.map((p) => {
    if (p.id === voterId) {
      return { ...p, votedFor: targetId };
    }
    return p;
  });

  return { ...state, players };
}

export function tallyVotes(state: GameState): GameState {
  const voteCounts = new Map<number, number>();

  state.players.forEach((p) => {
    if (p.votedFor !== null && !p.eliminated) {
      voteCounts.set(p.votedFor, (voteCounts.get(p.votedFor) || 0) + 1);
    }
  });

  const players = state.players.map((p) => ({
    ...p,
    votesReceived: voteCounts.get(p.id) || 0,
  }));

  return { ...state, players, phase: "results" };
}

export function getMostVotedPlayer(state: GameState): Player | null {
  const activePlayers = state.players.filter((p) => !p.eliminated);
  if (activePlayers.length === 0) return null;

  let maxVotes = 0;
  let mostVoted: Player | null = null;
  let tie = false;

  activePlayers.forEach((p) => {
    if (p.votesReceived > maxVotes) {
      maxVotes = p.votesReceived;
      mostVoted = p;
      tie = false;
    } else if (p.votesReceived === maxVotes && maxVotes > 0) {
      tie = true;
    }
  });

  return tie ? null : mostVoted;
}

export function checkImpostorGuess(
  state: GameState,
  guess: string
): GameState {
  const isCorrect =
    guess.trim().toLowerCase() === state.secretWord?.toLowerCase();
  return {
    ...state,
    impostorGuess: guess,
    impostorGuessCorrect: isCorrect,
  };
}
