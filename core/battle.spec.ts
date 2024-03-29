import { getPermutations } from "./permutations";
import battle, { BattleConfig, BattleResult } from "./battle";
import { PlayerMoveType, createCharacter } from "./player";

const getPowerDescription = (move) => {
  if (!move.power) return "";
  return `with ${move.power} power`;
};
const testBattleRound = (
  battleConfig: BattleConfig,
  expectedResult: BattleResult
) => {
  describe(`when player 1: ${battleConfig.p1.move.type} ${getPowerDescription(
    battleConfig.p1.move
  )}`, () => {
    describe(`and player 2: ${battleConfig.p2.move.type} ${getPowerDescription(
      battleConfig.p2.move
    )}`, () => {
      if (expectedResult)
        return it.skip("should verify new test case", () => {
          expect(battle(battleConfig)).toMatchObject(expectedResult);
        });
      it("calculates it correctly", () => {
        expect(battle(battleConfig)).toMatchSnapshot();
      });
    });
  });
};

describe("Battle system", () => {
  const availableMoves = [
    { type: PlayerMoveType.ATTACK, power: 1 },
    { type: PlayerMoveType.ATTACK, power: 2 },
    { type: PlayerMoveType.ATTACK, power: 3 },
    { type: PlayerMoveType.ATTACK, power: 1, shift: 1 },
    { type: PlayerMoveType.ATTACK, power: 1, aoe: 1 },
    { type: PlayerMoveType.ATTACK, power: 3, aoe: 2, shift: 2 },
    { type: PlayerMoveType.PARRY },
    { type: PlayerMoveType.DODGE },
    { type: PlayerMoveType.STAGGER, turns: 3 },
  ];
  getPermutations({
    p1Hp: [10],
    p2Hp: [10],
    p1Move: availableMoves,
    p2Move: availableMoves,
  }).forEach(({ p1Hp, p2Hp, p1Move, p2Move }) =>
    testBattleRound({
      p1: { hp: p1Hp, move: p1Move },
      p2: { hp: p2Hp, move: p2Move },
    })
  );
  testBattleRound(
    {
      p1: {
        hp: 10,
        move: { type: PlayerMoveType.ATTACK, power: 4 },
      },
      p2: {
        hp: 10,
        move: { type: PlayerMoveType.STAGGER, turns: 5 },
      },
    },
    {
      p1: { hp: 10 },
      p2: { hp: 6, move: { type: PlayerMoveType.STAGGER, turns: 1 } },
    }
  );
  describe("cooldown", () => {
    it("should set a cooldown after a skill with cooldown is used", () => {
      const { p1, p2 } = battle({
        p1: {
          ...createCharacter(),
          move: { type: PlayerMoveType.DODGE },
        },
        p2: {
          ...createCharacter(),
          move: { type: PlayerMoveType.DODGE },
        },
      });
      expect(p1.moves).toEqual(
        expect.arrayContaining([{ type: PlayerMoveType.DODGE, cooldown: 1 }])
      );
      expect(p2.moves).toEqual(
        expect.arrayContaining([{ type: PlayerMoveType.DODGE, cooldown: 1 }])
      );
    });
  });
});
