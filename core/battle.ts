import { Player, PlayerMoveType, getAoe, getShift } from "./player";

export interface BattleResult {
  p1: Player;
  p2: Player;
}
export interface BattleConfig {
  p1: Player;
  p2: Player;
}

const calculateBattle = ({ move, ...player }: Player, opponent: Player) => {
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
