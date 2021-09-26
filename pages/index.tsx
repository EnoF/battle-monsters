import Head from "next/head";
import { Stats } from "../components/stats";

export default function Home() {
  const title = "Battle Monsters";
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
        <Stats name="EnoF" hp={10} maxHp={10} />
        <Stats name="Balrog" hp={30} maxHp={30} />
      </section>
      <style jsx>{`
        h1 {
          margin: .5em;
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
