// pages/perfil/[id].tsx

import { User } from "@/types/user";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import PerfilCard from "@/components/perfil/PerfilCard";
import Header from "@/components/ui/header";
import PublicacaoCard from "@/components/perfil/PublicacaoCard";
import { useEffect, useState } from "react";
import { Avaliacao } from "@/types/avaliacao";
import { getUser } from "@/services/ApiUsuario";

interface FormattedAvaliacao {
  id: number;
  conteudo: string;
  data: string;
  autorNome: string;
  comentarios: number;
}

export default function PerfilPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoggedIn, loading, user: loggedInUser } = useAuth();
  const usuarioID = parseInt(id as string);
  const isEditable =
    isLoggedIn && loggedInUser && loggedInUser?.id === usuarioID;
  const [usuario, setUsuario] = useState<User | undefined>(undefined);
  const [avaliacoesDoUsuario, setAvaliacoesDoUsuario] = useState<any[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!id || isNaN(usuarioID)) {
      setPageLoading(false);
      return;
    }

    const procuraPerfil = async () => {
      setPageLoading(true);
      try {
        const user: User = await getUser(usuarioID);

        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        setUsuario(user);

        // Pega as duas listas separadamente
        const avaliacoesDoBackend = user.avaliacoes || [];
        const formattedAvaliacoes: FormattedAvaliacao[] = avaliacoesDoBackend
          .filter((avaliacao: Avaliacao) => typeof avaliacao.id === "number")
          .map((avaliacao: Avaliacao) => {
            return {
              id: avaliacao.id as number,
              conteudo: avaliacao.conteudo,
              data: new Date(avaliacao.createdAt ?? "").toLocaleString("pt-BR"),
              autorNome: user.nome,
              comentarios: avaliacao.comentarios.length,
            };
          });

        setAvaliacoesDoUsuario(formattedAvaliacoes);
      } catch (error: any) {
        console.error("Erro ao carregar perfil:", error.message);
        setUsuario(undefined);
      } finally {
        setPageLoading(false);
      }
    };
    procuraPerfil();
  }, [id, usuarioID]);

  if (pageLoading || loading) {
    return <p className="text-center mt-8">Carregando perfil...</p>;
  }

  if (!usuario) {
    return (
      <p className="text-center mt-8 text-red-600">Usuário não encontrado.</p>
    );
  }

  console.log({
    logado: isLoggedIn,
    idUsuarioLogado: loggedInUser?.id,
    tipoIdUsuarioLogado: typeof loggedInUser?.id,
    idDoPerfil: usuarioID,
    tipoIdDoPerfil: typeof usuarioID,
    IDsSaoIguais: loggedInUser?.id === usuarioID,
    ehEditavel: isEditable,
  });

  return (
    <main className="container mx-auto px-4 py-6">
      <Header isAuthenticated={isLoggedIn} />

      <PerfilCard
        usuarioID={usuarioID}
        isAuthenticated={isLoggedIn}
        isEditable={!!isEditable} // Passe esta prop para o PerfilCard
        usuario={usuario} // Passe o objeto usuario para PerfilCard
      />

      <PublicacaoCard
        publicacoes={avaliacoesDoUsuario}
        imgUser={
          usuario.fotoPerfil
            ? `${process.env.NEXT_PUBLIC_API_URL}${usuario.fotoPerfil}`
            : "/profile.svg"
        }
        isEditable={!!isEditable}
        isProfessor={false}
      />
    </main>
  );
}
