import { Player, PlayerMoveType } from "./player";

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
