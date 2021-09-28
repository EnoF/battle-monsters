import { Player, PlayerMoveType, getAoe, getShift, PlayerMove } from "./player";

export interface BattleResult {
  p1: Player;
  p2: Player;
}
export interface BattleConfig {
  p1: Player;
  p2: Player;
}
const isStaggeredAfterRound = (move: PlayerMove, power: number) => {
  if (move.type !== PlayerMoveType.STAGGER) return false;
  return move.turns - power > 1;
};
const calculateCooldown = (move, moves = []) =>
  moves.map((m) => {
    if (m.type !== PlayerMoveType.DODGE) return m;
    if (move.type === PlayerMoveType.DODGE)
      return {
        ...m,
        cooldown: 1,
      };
    return { ...m, cooldown: 0 };
  });

const calculateBattle = (
  { move, moves, ...playerStats }: Player,
  opponent: Player
) => {
  const player = {
    ...playerStats,
    moves: calculateCooldown(move, moves),
  };
  switch (opponent.move.type) {
    case PlayerMoveType.PARRY:
      if (move.type !== PlayerMoveType.ATTACK) return player;
      const stagnation = move.power + getShift(move) + getAoe(move) - 1;
      if (stagnation <= 0) return player;
      return {
        ...player,
        move: {
          type: PlayerMoveType.STAGGER,
          turns: stagnation,
        },
      };
    case PlayerMoveType.ATTACK:
      if (move.type === PlayerMoveType.DODGE) return player;
      if (move.type === PlayerMoveType.PARRY) return player;
      if (getShift(move) > getAoe(opponent.move)) return player;
      if (isStaggeredAfterRound(move, opponent.move.power))
        return {
          ...player,
          hp: player.hp - opponent.move.power,
          move: {
            type: PlayerMoveType.STAGGER,
            turns: move.turns - opponent.move.power - 1,
          },
        };
      return { ...player, hp: player.hp - opponent.move.power };
    case PlayerMoveType.DODGE:
      if (move.type !== PlayerMoveType.PARRY) return player;
      return {
        ...player,
        move: {
          type: PlayerMoveType.STAGGER,
          turns: 1,
        },
      };
    default:
      return player;
  }
};
function battle(battleConfig: BattleConfig): BattleResult {
  return {
    p1: calculateBattle(battleConfig.p1, battleConfig.p2),
    p2: calculateBattle(battleConfig.p2, battleConfig.p1),
  };
}
export default battle;
