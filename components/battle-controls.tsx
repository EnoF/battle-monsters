import { useCallback } from "react";
import { PlayerMove, PlayerMoveType } from "../core/player";

interface BattleControlsProps {
  moves: Array<PlayerMove>;
  onSubmit: (move: PlayerMove) => void;
}

const getMoves = (move, moves, onSubmitWrapper) => {
  if (move?.type === PlayerMoveType.STAGGER && move?.turns > 0)
    return (
      <button type="submit" onClick={onSubmitWrapper(move)}>
        pass (staggered)
      </button>
    );
  return moves.map((entry, index) => {
    switch (entry.type) {
      case PlayerMoveType.ATTACK:
        return (
          <button key={index} type="submit" onClick={onSubmitWrapper(entry)}>
            {entry.type}, power:{entry.power}, shifts: {entry.shift} aoe:{" "}
            {entry.aoe}
          </button>
        );
      default:
        return (
          <button
            key={index}
            type="submit"
            onClick={onSubmitWrapper(entry)}
            disabled={entry.cooldown}
          >
            {entry.type}
          </button>
        );
    }
  });
};
export function BattleControls({ move, moves, onSubmit }: BattleControlsProps) {
  const onSubmitWrapper = (move) => (event) => {
    onSubmit(move);
    event.preventDefault();
  };
  const items = getMoves(move, moves, onSubmitWrapper);
  return (
    <form className="battle-controls">
      {items}
      <style jsx>{`
        .battle-controls {
          display: flex;
          flex-direction: column;
          max-width: 20em;
        }

        button {
          flex: 1;
        }
      `}</style>
    </form>
  );
}
