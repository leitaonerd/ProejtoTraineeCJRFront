import {
  mockUsuarios,
  mockAvaliacoes,
  mockComentarios,
} from "@/mock/dataPerfil";
import { User } from "@/types/user";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import PerfilCard from "@/components/perfil/PerfilCard";
import Header from "@/components/ui/header";
import PublicacaoCard from "@/components/perfil/PublicacaoCard";

export default function PerfilPage() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoggedIn, loading } = useAuth();

  const usuarioID = parseInt(id as string);

  const usuario: User | undefined = mockUsuarios.find(
    (u) => u.id === usuarioID
  );

  if (!usuario) return <p>Usuário não encontrado</p>;

  const avaliacoesDoUsuario = mockAvaliacoes
    .filter((av) => av.usuarioID === usuarioID)
    .map((avaliacao) => {
      const comentarios = mockComentarios.filter(
        (c) => c.avaliacaoID === avaliacao.id
      );

      return {
        id: avaliacao.id,
        conteudo: avaliacao.conteudo,
        data: new Date(avaliacao.createdAt).toLocaleString("pt-BR"),
        autorNome: usuario?.nome,
        comentarios: comentarios.length,
      };
    });

  return (
    <main className="container mx-auto px-4 py-6">
      {isLoggedIn ? (
        <div>
          <Header isAuthenticated={true} />
          <PerfilCard usuarioID={usuarioID} isAuthenticated={true} />
        </div>
      ) : (
        <div>
          <Header isAuthenticated={false} />
          <PerfilCard usuarioID={usuarioID} isAuthenticated={false} />
        </div>
      )}
      <PublicacaoCard
        publicacoes={avaliacoesDoUsuario}
        imgUser={usuario.fotoPerfil}
      />
    </main>
  );
}
