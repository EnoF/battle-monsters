import { getPermutations } from "./permutations";
import battle, { PlayerMoveType, BattleConfig, BattleResult } from "./battle";

const getPowerDescription = (move) => {
  if (!move.power) return "";
  return `with ${move.power} power`;
};
const testBattleRound = (battleConfig: BattleConfig) => {
  describe(`when player 1: ${battleConfig.p1.move.type} ${getPowerDescription(
    battleConfig.p1.move
  )}`, () => {
    describe(`and player 2: : ${
      battleConfig.p2.move.type
    } ${getPowerDescription(battleConfig.p2.move)}`, () => {
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
    { type: PlayerMoveType.BLOCK },
    { type: PlayerMoveType.DODGE },
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
});
