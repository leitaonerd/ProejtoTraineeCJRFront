import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { Professor } from "@/types/professor";
import { getProfessor } from "@/services/ApiProfessor";
import { Avaliacao } from "@/types/avaliacao";
import Header from "@/components/ui/header";
import PerfilCardProfessor from "@/components/professorPerfil/PerfilCardProfessor";
import PublicacaoCard from "@/components/perfil/PublicacaoCard";

interface FormattedAvaliacao {
  id: number;
  conteudo: string;
  data: string;
  autorNome: string;
  comentarios: number;
}

export default function ProfessorPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoggedIn, loading, user: loggedInUser } = useAuth();
  const professorID = parseInt(id as string);
  const [professor, setProfessor] = useState<Professor | undefined>(undefined);
  const [avaliacoesProfessor, setAvaliacoesProfessor] = useState<any[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!id || isNaN(professorID)) {
      setPageLoading(false);
      return;
    }

    const procuraProfessor = async () => {
      setPageLoading(true);
      try {
        const professor: Professor = await getProfessor(professorID);
        if (!professor) {
          throw new Error("Professor não encontrado");
        }

        setProfessor(professor);

        const listaAvaliacoes = professor.avaliacoes || [];
        console.log(listaAvaliacoes);
        const formattedAvaliacoes: FormattedAvaliacao[] = listaAvaliacoes
          .filter(
            (avaliacao: Avaliacao) => typeof avaliacao.professorID === "number"
          )
          .map((avaliacao: Avaliacao) => {
            return {
              id: avaliacao.id as number,
              conteudo: avaliacao.conteudo,
              data: new Date(avaliacao.createdAt ?? "").toLocaleString("pt-BR"),
              autorNome: professor.nome,
              comentarios: avaliacao.comentarios.length,
            };
          });

        setAvaliacoesProfessor(formattedAvaliacoes);
        //console.log(formattedAvaliacoes);
      } catch (error: any) {
        console.error("Erro ao carregar perfil:", error.message);
        setProfessor(undefined);
      } finally {
        setPageLoading(false);
      }
    };
    procuraProfessor();
  }, [id, professorID]);

  if (pageLoading || loading) {
    return <p className="text-center mt-8">Carregando perfil...</p>;
  }

  if (!professor) {
    console.log(2);
    return (
      <p className="text-center mt-8 text-red-600">Professor não encontrado.</p>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <Header isAuthenticated={isLoggedIn} />

      <PerfilCardProfessor professor={professor} />

      <PublicacaoCard
        publicacoes={avaliacoesProfessor}
        imgUser={"/quagsire.png"}
        isEditable={false}
        isProfessor={true}
      />
    </main>
  );
}
