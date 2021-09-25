interface Player {
  hp: number;
  move?: PlayerMove;
}
export enum PlayerMoveType {
  ATTACK = "ATTACK",
  DODGE = "DODGE",
  BLOCK = "BLOCK",
  STAGGER = "STAGGER",
}
interface PlayerMove {
  type: PlayerMoveType;
  power: number;
}
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
    case PlayerMoveType.DODGE:
      if (move.type !== PlayerMoveType.ATTACK) return player;
      if (move.power <= 1) return player;
      return {
        ...player,
        move: {
          type: PlayerMoveType.STAGGER,
          turns: move.power - 1,
        },
      };
    case PlayerMoveType.ATTACK:
      if (move.type === PlayerMoveType.DODGE) return player;
      if (move.type === PlayerMoveType.BLOCK) return player;
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
