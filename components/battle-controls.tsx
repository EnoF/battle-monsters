import { useCallback } from "react";
import { PlayerMove, PlayerMoveType } from "../core/player";

interface BattleControlsProps {
  moves: Array<PlayerMove>;
  onSubmit: (move: PlayerMove) => void;
}

export function BattleControls({ moves, onSubmit }: BattleControlsProps) {
  const onSubmitWrapper = (move) => (event) => {
    onSubmit(move);
    event.preventDefault();
  };
  const items = moves.map((entry, index) => {
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
          <button key={index} type="submit" onClick={onSubmitWrapper(entry)}>
            {entry.type}
          </button>
        );
    }
  });
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
