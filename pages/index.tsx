import React, { useCallback, useState } from "react";
import Head from "next/head";
import { Stats } from "../components/stats";
import { BattleLog } from "../components/battle-log";
import { BattleControls } from "../components/battle-controls";

import { createCharacter, isStaggered, PlayerMoveType } from "../core/player";
import { createAI, executeCombo } from "../core/ai";
import battle from "../core/battle";

export default function Home() {
  const title = "Battle Monsters";
  const [player, setPlayer] = useState(() => createCharacter());
  const [ai, setAI] = useState(() => createAI());
  const [playerLog, setPlayerLog] = useState([]);
  const [aiLog, setAILog] = useState([]);
  const submitMove = (move) => {
    const executingAI = executeCombo(ai)
    console.log('executingAI', executingAI)
    const { p1, p2 } = battle({
      p1: { ...player, move },
      p2: executingAI,
    });
    setPlayerLog([move, ...playerLog])
    setAILog([executingAI.move, ...aiLog])
    setPlayer(p1);
    setAI(p2);
  };
  return (
    <main>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Create your own monsters and battle others!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{title}</h1>
      <section className="stats-container">
        <Stats name="EnoF" hp={player.hp} maxHp={player.maxHp} isStaggered={isStaggered(player)} />
        <Stats name="Balrog" hp={ai.hp} maxHp={ai.maxHp} isStaggered={isStaggered(ai)}/>
      </section>
      <BattleControls moves={player.moves} onSubmit={submitMove} />
      <section className="log-container">
        <BattleLog name="EnoF" move={player.move} logs={playerLog} />
        <BattleLog name="Balrog" logs={aiLog} />
      </section>
      <style jsx>{`
        h1 {
          margin: 0.5em;
        }
        .controls-container,
        .log-container,
        .stats-container {
          display: flex;
          flex: 1;
          flex-direction: row;
        }
        .stats {
          flex: 1;
        }
      `}</style>
    </main>
  );
}
