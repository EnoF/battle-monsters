interface Player {
  hp: number;
  move?: PlayerMove;
}
export enum PlayerMoveType {
  ATTACK = "ATTACK",
  DODGE = "DODGE",
  BLOCK = "BLOCK",
}
interface PlayerMove {
  type: PlayerMoveType;
  power: number;
}
interface BattleResult {
  p1: Player;
  p2: Player;
}
interface BattleConfig {
  p1: Player;
  p2: Player;
}
const calculateBattle = (player: Player, opponent: Player) => {
  switch (opponent.move.type) {
    case PlayerMoveType.ATTACK:
      if (player.move.type === PlayerMoveType.DODGE) return player;
      if (player.move.type === PlayerMoveType.BLOCK) return player;
      return { ...player, hp: player.hp - 1 };
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