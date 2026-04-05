import { getShuffledPrompts } from "./mostLikelyData";

export type MLPhase = "setup" | "voting" | "round-results" | "final-results";

export interface MLPlayer {
  id: number;
  name: string;
  score: number;
}

export interface MLRoundVote {
  voterId: number;
  targetId: number;
}

export interface MLRoundResult {
  prompt: string;
  votes: MLRoundVote[];
  winnerId: number | null;
  winnerVotes: number;
  isTie: boolean;
}

export interface MLGameState {
  phase: MLPhase;
  players: MLPlayer[];
  prompts: string[];
  currentRound: number;
  totalRounds: number;
  currentVoterIndex: number;
  currentRoundVotes: MLRoundVote[];
  roundResults: MLRoundResult[];
}

export function createMLInitialState(): MLGameState {
  return {
    phase: "setup",
    players: [],
    prompts: [],
    currentRound: 0,
    totalRounds: 10,
    currentVoterIndex: 0,
    currentRoundVotes: [],
    roundResults: [],
  };
}

export function startMLGame(
  playerNames: string[],
  totalRounds: number
): MLGameState {
  const players: MLPlayer[] = playerNames.map((name, i) => ({
    id: i,
    name,
    score: 0,
  }));

  return {
    phase: "voting",
    players,
    prompts: getShuffledPrompts(totalRounds),
    currentRound: 0,
    totalRounds,
    currentVoterIndex: 0,
    currentRoundVotes: [],
    roundResults: [],
  };
}

export function addVote(
  state: MLGameState,
  voterId: number,
  targetId: number
): MLGameState {
  const newVotes = [...state.currentRoundVotes, { voterId, targetId }];
  return {
    ...state,
    currentRoundVotes: newVotes,
    currentVoterIndex: state.currentVoterIndex + 1,
  };
}

export function tallyRound(state: MLGameState): MLGameState {
  const voteCounts = new Map<number, number>();
  state.currentRoundVotes.forEach(({ targetId }) => {
    voteCounts.set(targetId, (voteCounts.get(targetId) || 0) + 1);
  });

  let maxVotes = 0;
  let winnerId: number | null = null;
  let isTie = false;

  voteCounts.forEach((count, playerId) => {
    if (count > maxVotes) {
      maxVotes = count;
      winnerId = playerId;
      isTie = false;
    } else if (count === maxVotes && maxVotes > 0) {
      isTie = true;
    }
  });

  // Award points: winner gets 1 point per vote received (unless tie)
  const players = state.players.map((p) => {
    const votesForPlayer = voteCounts.get(p.id) || 0;
    return {
      ...p,
      score: p.score + votesForPlayer,
    };
  });

  const result: MLRoundResult = {
    prompt: state.prompts[state.currentRound],
    votes: state.currentRoundVotes,
    winnerId: isTie ? null : winnerId,
    winnerVotes: maxVotes,
    isTie,
  };

  return {
    ...state,
    phase: "round-results",
    players,
    roundResults: [...state.roundResults, result],
  };
}

export function nextRound(state: MLGameState): MLGameState {
  const nextRoundIndex = state.currentRound + 1;
  if (nextRoundIndex >= state.totalRounds) {
    return { ...state, phase: "final-results" };
  }
  return {
    ...state,
    phase: "voting",
    currentRound: nextRoundIndex,
    currentVoterIndex: 0,
    currentRoundVotes: [],
  };
}
