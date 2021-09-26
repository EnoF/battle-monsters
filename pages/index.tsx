import Head from "next/head";
import { Stats } from "../components/stats";
import { createCharacter } from "../core/player";
import { createAI } from "../core/ai";
import battle from "../core/battle";
import {useState} from "react";

export default function Home() {
  const title = "Battle Monsters";
  const [player, setPlayer] = useState(createCharacter())
  const [ai, setAI] = useState(createAI())
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
        <Stats name="EnoF" hp={player.hp} maxHp={player.maxHp} />
        <Stats name="Balrog" hp={ai.hp} maxHp={ai.maxHp} />
      </section>
      <style jsx>{`
        h1 {
          margin: 0.5em;
        }
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
