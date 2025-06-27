import Head from "next/head";
import { HeadMetaType } from "@/types/headMetaType";
import FeedDeslogado from "@/components/feed/FeedDeslogado";
import FeedLogado from "@/components/feed/FeedLogado";
import { useAuth } from "@/context/AuthContext";

const metadata: HeadMetaType = {
  title: "Avaliação de Professores",
  description: "Avaliação de professores da Universidade de Brasília",
};

export default function Home() {
  const { isLoggedIn, loading } = useAuth();

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Carregando...</p>
          </div>
        ) : (
          isLoggedIn ? <FeedLogado /> : <FeedDeslogado />
        )}
      </main>
    </>
  );
}