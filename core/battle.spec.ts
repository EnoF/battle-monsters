import { expect } from 'chai'

import battle, {PlayerMoveType} from "./battle";

describe("Battle system", () => {
  describe("when player 1 attacks", () => {
    const p1 = { hp: 10, stamina: 5 };
    const p2 = { hp: 10, stamina: 5 };
    describe("and player 2 attacks", () => {
      const p1Move = { type: PlayerMoveType.ATTACK, power: 1 };
      const p2Move = { type: PlayerMoveType.ATTACK, power: 1 };
      let p1AfterAttack = null;
      let p2AfterAttack = null;
      beforeAll(() => {
        const result = battle({
          p1: { ...p1, move: p1Move },
          p2: { ...p2, move: p2Move },
        });
        p1AfterAttack = result.p1
        p2AfterAttack = result.p2
      });
      it("should reduce the hp of player 1", () => {
        expect(p1AfterAttack.hp).to.equal(9);
      });
    });
  });
});
