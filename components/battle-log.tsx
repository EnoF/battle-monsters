import { getAoe, getPower, getShift, PlayerMove } from "../core/player";

interface BattleLogProps {
  name: string;
  logs: Array<PlayerMove>;
}

export function BattleLog({ name, logs }: BattleLogProps) {
  const items = logs.map((entry, index) => (
    <li key={index}>
      {name} used: {entry.type}, power: {getPower(entry)}, shift: {getShift(entry)}, aoe: {getAoe(entry)}
    </li>
  ));
  return <ol reversed>{items}</ol>;
}
