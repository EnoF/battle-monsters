export interface Player {
  hp: number;
  move?: PlayerMove;
}
export enum PlayerMoveType {
  ATTACK = "ATTACK",
  DODGE = "DODGE",
  BLOCK = "BLOCK",
  STAGGER = "STAGGER",
}
export interface PlayerMove {
  type: PlayerMoveType;
  power: number;
  aoe?: number;
  shift?: number;
  turns?: number;
}
export interface BattleResult {
  p1: Player;
  p2: Player;
}
export interface BattleConfig {
  p1: Player;
  p2: Player;
}
const getAoe = (move: PlayerMove) => move.aoe || 0;
const getShift = (move: PlayerMove) => move.shift || 0;

const calculateBattle = ({ move, ...player }: Player, opponent: Player) => {
  switch (opponent.move.type) {
    case PlayerMoveType.DODGE:
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
      if (move.type === PlayerMoveType.BLOCK) return player;
      if (getShift(move) > getAoe(opponent.move)) return player;
      return { ...player, hp: player.hp - opponent.move.power };
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
