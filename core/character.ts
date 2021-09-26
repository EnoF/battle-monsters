export interface Player {
  hp: number;
  maxHp: number;
  move?: PlayerMove;
  moves: Array<PlayerMove>;
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
      type: PlayerMoveType.DODGE,
    },
    {
      type: PlayerMoveType.BLOCK,
    },
  ],
});
