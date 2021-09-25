import { expect } from "chai";

import battle, { PlayerMoveType } from "./battle";

describe("Battle system", () => {
  describe("when player 1 attacks", () => {
    const p1 = { hp: 10 };
    const p2 = { hp: 10 };
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
        p1AfterAttack = result.p1;
        p2AfterAttack = result.p2;
      });
      it("should reduce the hp of player 1", () => {
        expect(p1AfterAttack.hp).to.equal(9);
      });
      it("should reduce the hp of player 2", () => {
        expect(p2AfterAttack.hp).to.equal(9);
      });
    });
    describe("and player 2 blocks", () => {
      const p1Move = { type: PlayerMoveType.ATTACK, power: 1 };
      const p2Move = { type: PlayerMoveType.BLOCK };
      let p1AfterAttack = null;
      let p2AfterAttack = null;
      beforeAll(() => {
        const result = battle({
          p1: { ...p1, move: p1Move },
          p2: { ...p2, move: p2Move },
        });
        p1AfterAttack = result.p1;
        p2AfterAttack = result.p2;
      });
      it("should not reduce the hp of player 1", () => {
        expect(p1AfterAttack.hp).to.equal(10);
      });
      it("should not reduce the hp of player 2", () => {
        expect(p2AfterAttack.hp).to.equal(10);
      });
    });
    describe("and player 2 dodges", () => {
      const p1Move = { type: PlayerMoveType.ATTACK, power: 1 };
      const p2Move = { type: PlayerMoveType.DODGE };
      let p1AfterAttack = null;
      let p2AfterAttack = null;
      beforeAll(() => {
        const result = battle({
          p1: { ...p1, move: p1Move },
          p2: { ...p2, move: p2Move },
        });
        p1AfterAttack = result.p1;
        p2AfterAttack = result.p2;
      });
      it("should not reduce the hp of player 1", () => {
        expect(p1AfterAttack.hp).to.equal(10);
      });
      it("should not reduce the hp of player 2", () => {
        expect(p2AfterAttack.hp).to.equal(10);
      });
      it("should put player 1 in recovery for 2 turns", () => {
        expect(p1AfterAttack.move).to.be.undefined;
      });
    });
  });
  describe("when player 1 uses an attack with 3 power", () => {
    const p1 = { hp: 10 };
    const p2 = { hp: 10 };
    describe("and player 2 uses an attack with 1 power", () => {
      const p1Move = { type: PlayerMoveType.ATTACK, power: 3 };
      const p2Move = { type: PlayerMoveType.ATTACK, power: 1 };
      let p1AfterAttack = null;
      let p2AfterAttack = null;
      beforeAll(() => {
        const result = battle({
          p1: { ...p1, move: p1Move },
          p2: { ...p2, move: p2Move },
        });
        p1AfterAttack = result.p1;
        p2AfterAttack = result.p2;
      });
      it("should not reduce the hp of player 1", () => {
        expect(p1AfterAttack.hp).to.equal(9);
      });
      it("should not reduce the hp of player 2", () => {
        expect(p2AfterAttack.hp).to.equal(7);
      });
    });
    describe("and player 2 blocks", () => {
      const p1Move = { type: PlayerMoveType.ATTACK, power: 3 };
      const p2Move = { type: PlayerMoveType.BLOCK };
      let p1AfterAttack = null;
      let p2AfterAttack = null;
      beforeAll(() => {
        const result = battle({
          p1: { ...p1, move: p1Move },
          p2: { ...p2, move: p2Move },
        });
        p1AfterAttack = result.p1;
        p2AfterAttack = result.p2;
      });
      it("should not reduce the hp of player 1", () => {
        expect(p1AfterAttack.hp).to.equal(10);
      });
      it("should not reduce the hp of player 2", () => {
        expect(p2AfterAttack.hp).to.equal(10);
      });
    });
    describe("and player 2 dodges", () => {
      const p1Move = { type: PlayerMoveType.ATTACK, power: 3 };
      const p2Move = { type: PlayerMoveType.DODGE };
      let p1AfterAttack = null;
      let p2AfterAttack = null;
      beforeAll(() => {
        const result = battle({
          p1: { ...p1, move: p1Move },
          p2: { ...p2, move: p2Move },
        });
        p1AfterAttack = result.p1;
        p2AfterAttack = result.p2;
      });
      it("should not reduce the hp of player 1", () => {
        expect(p1AfterAttack.hp).to.equal(10);
      });
      it("should not reduce the hp of player 2", () => {
        expect(p2AfterAttack.hp).to.equal(10);
      });
      it("should put player 1 in recovery for 2 turns", () => {
        expect(p1AfterAttack.move).to.deep.equal({
          type: PlayerMoveType.STAGGER,
          turns: 2,
        });
      });
    });
  });
});
