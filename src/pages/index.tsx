import Head from "next/head";
import { HeadMetaType } from "@/types/headMetaType";
import FeedDeslogado from "@/components/feed/FeedDeslogado";
import FeedLogado from "@/components/feed/FeedLogado";
import { useEffect, useState } from "react";

export const metadata: HeadMetaType = {
  title: "Avaliação de Professores",
  description: "Avaliação de professores da Universidade de Brasília",
};

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // 👇 Exemplo simples: verifica token no localStorage
    const token = localStorage.getItem("token"); 
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <main>
        {isAuthenticated ? <FeedLogado /> : <FeedDeslogado />}
      </main>
    </>
  );
}