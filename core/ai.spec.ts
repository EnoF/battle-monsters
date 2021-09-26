import { PlayerMoveType } from "./battle";
import { selectCombo, executeCombo, AI } from "./ai";

describe("ai combos", () => {
  const ai: AI = {
    hp: 30,
    maxHp: 30,
    combos: [
      {
        moves: [
          { type: PlayerMoveType.ATTACK, power: 2, aoe: 1 },
          { type: PlayerMoveType.ATTACK, power: 1, shift: 2 },
          { type: PlayerMoveType.ATTACK, power: 3, aoe: 1 },
        ],
        activationConditions: [{ minHp: 0.5, maxHp: 1 }],
      },
      {
        moves: [
          { type: PlayerMoveType.ATTACK, power: 1, aoe: 1 },
          { type: PlayerMoveType.ATTACK, power: 3, shift: 2 },
          { type: PlayerMoveType.ATTACK, power: 1, aoe: 1 },
        ],
        activationConditions: [{ minHp: 0.5, maxHp: 1 }],
      },
      {
        moves: [
          { type: PlayerMoveType.DODGE },
          { type: PlayerMoveType.ATTACK, power: 3 },
        ],
        activationConditions: [{ minHp: 0, maxHp: 0.5 }],
      },
      {
        moves: [
          { type: PlayerMoveType.ATTACK, power: 1 },
          { type: PlayerMoveType.ATTACK, power: 3 },
        ],
        activationConditions: [{ minHp: 0, maxHp: 0.7 }],
      },
    ],
  };
  describe("when filtering available combos", () => {
    describe("when the ai has 30/30 hp", () => {
      it("should select a combo", () => {
        jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
        const combo = selectCombo(ai);
        expect(combo).toMatchObject(ai.combos[0]);
      });
    });
    describe("when the ai has 20/30 hp", () => {
      it("should filter only combo 1, 2 and 4", () => {
        jest.spyOn(global.Math, "random").mockReturnValue(0.5423456789);
        const combo = selectCombo({ ...ai, hp: 20 });
        expect(combo).toMatchObject(ai.combos[1]);
      });
    });
  });
  describe("when executing a combo", () => {
    describe("and the ai has selected combo 1", () => {
      describe("and the player only attacks", () => {
        it("should execute the combo", () => {
          jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
          const aiFirstMove = executeCombo(ai);
          expect(aiFirstMove.move).toMatchObject({
            type: PlayerMoveType.ATTACK,
            power: 2,
            aoe: 1,
          });
          const aiSecondMove = executeCombo(aiFirstMove);
          expect(aiSecondMove.move).toMatchObject({
            type: PlayerMoveType.ATTACK,
            power: 1,
            shift: 2,
          });
          const aiThirdMove = executeCombo(aiSecondMove);
          expect(aiThirdMove.move).toMatchObject({
            type: PlayerMoveType.ATTACK,
            power: 3,
            aoe: 1,
          });
        });
      });
    });
  });
});
