import {
  getAoe,
  getPower,
  getShift,
  isStaggered,
  PlayerMove,
  PlayerMoveType,
} from "../core/player";

interface BattleSummaryProps {
  p1: string;
  p1Logs: Array<PlayerMove>;
  p2: string;
  p2Logs: Array<PlayerMove>;
}

export function BattleSummary({ p1, p2, p1Logs, p2Logs }: BattleSummaryProps) {
  const [p1LastMove] = p1Logs;
  const [p2LastMove] = p2Logs;
  if (!p1LastMove || !p2LastMove) return null;
  switch (p1LastMove.type) {
    case PlayerMoveType.ATTACK:
      if (p2LastMove.type === PlayerMoveType.DODGE)
        return (
          <p>
            {p1} used {p1LastMove.type} on {p2}, but {p2} dodged the attack.
          </p>
        );
      if (p2LastMove.type === PlayerMoveType.PARRY)
        return (
          <p>
            {p1} used {p1LastMove.type} on {p2}, but {p2} parried the attack.
          </p>
        );
      if (p2LastMove.type === PlayerMoveType.ATTACK)
        return (
          <>
            <p>
              {p1} used {p1LastMove.type} on {p2} and inflicted{" "}
              {p1LastMove.power} damage.
            </p>
            <p>
              {p2} used {p2LastMove.type} on {p1} and inflicted{" "}
              {p2LastMove.power} damage.
            </p>
          </>
        );
      if (p2LastMove.type === PlayerMoveType.STAGGER)
        return (
          <>
            <p>
              {p1} used {p1LastMove.type} on {p2} and inflicted{" "}
              {p1LastMove.power} damage.
            </p>
          </>
        );
    case PlayerMoveType.DODGE:
      if (p2LastMove.type === PlayerMoveType.ATTACK)
        return (
          <p>
            {p1} dodged the attack of {p2}.
          </p>
        );

    case PlayerMoveType.PARRY:
      if (p2LastMove.type === PlayerMoveType.ATTACK)
        return (
          <p>
            {p1} parried the attack of {p2}.
          </p>
        );
    default:
      return <p>Nothing happened</p>;
  }
}
