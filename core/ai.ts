import { Player, PlayerMove } from "./battle";
export interface Condition {
  minHp?: number;
  maxHp?: number;
}
export interface Combo {
  moves: Array<PlayerMove>;
  activationConditions: Array<Condition>;
}
export interface AI extends Player {
  maxHp: number;
  combos: Array<Combo>;
  selectCombo: Combo;
}
export const selectSkill = () => null;

export const createAI = () => ({
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
        { type: PlayerMoveType.ATTACK, power: 2, aoe: 1 },
        { type: PlayerMoveType.ATTACK, power: 1, shift: 2 },
        { type: PlayerMoveType.ATTACK, power: 3, aoe: 1 },
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
});

export const filterAvailableCombos = (ai: AI) => {
  const hp = ai.hp / ai.maxHp;
  return ai.combos.filter(({ activationConditions }) =>
    activationConditions.some(
      (condition) => condition.minHp <= hp && condition.maxHp >= hp
    )
  );
};

export const selectCombo = (ai: AI) => {
  const availableCombos = filterAvailableCombos(ai);
  return availableCombos[Math.floor(Math.random() * availableCombos.length)];
};

export const executeCombo = (ai: AI) => {
  if (ai.selectedCombo?.length) {
    const [move, ...selectedCombo] = ai.selectedCombo;
    return {
      ...ai,
      move,
      selectedCombo,
    };
  }
  const [move, ...selectedCombo] = selectCombo(ai).moves;
  return {
    ...ai,
    move,
    selectedCombo,
  };
};
