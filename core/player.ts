export interface Player {
  hp: number;
  maxHp: number;
  move?: PlayerMove;
  moves: Array<PlayerMove>;
}
export enum PlayerMoveType {
  ATTACK = "ATTACK",
  PARRY = "PARRY",
  DODGE = "DODGE",
  STAGGER = "STAGGER",
}
export interface PlayerMove {
  type: PlayerMoveType;
  power?: number;
  aoe?: number;
  shift?: number;
  turns?: number;
  cooldown?: number;
}
export const createCharacter = (): Player => ({
  hp: 10,
  maxHp: 10,
  moves: [
    {
      type: PlayerMoveType.ATTACK,
      power: 1,
    },
    {
      type: PlayerMoveType.ATTACK,
      power: 1,
      shift: 1,
    },
    {
      type: PlayerMoveType.ATTACK,
      power: 3,
    },
    {
      type: PlayerMoveType.ATTACK,
      power: 3,
      shift: 1,
    },
    {
      type: PlayerMoveType.PARRY,
    },
    {
      type: PlayerMoveType.DODGE,
    },
  ],
});

export const getAoe = (move: PlayerMove) => move.aoe || 0;
export const getShift = (move: PlayerMove) => move.shift || 0;
export const getPower = (move: PlayerMove) => move.power || 0;
export const getCooldown = (move: PlayerMove) => move.cooldown || 0;
export const isStaggered = (player: Player) =>
  player.move?.type === PlayerMoveType.STAGGER && player.move?.turns > 0;
