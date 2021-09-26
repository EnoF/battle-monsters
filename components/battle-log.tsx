import { PlayerMove } from '../core/player'

interface BattleLogProps {
  name: string;
  logs: Array<PlayerMove>;
}

export function BattleLog({name, logs}:BattleLogProps) {
  const items = logs.map((entry, index) => 
    <li key={index}>{name} used: {entry.type}, cost:{
      (entry.power + entry.shift + entry.aoe) || 1
    }</li>)
  return (<ol>
    {items}
  </ol>)
}
