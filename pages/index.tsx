import Head from "next/head";

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
    </main>
  );
}
