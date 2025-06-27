import { mockUsuarios, mockAvaliacoes } from "@/mock/dataPerfil";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import PerfilAcoes from "@/components/perfil/PerfilAcoes";
import PerfilInfo from "@/components/perfil/PerfilInfo";
import Header from "@/components/ui/header";

export default function PerfilPage() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoggedIn, loading } = useAuth();

  const usuarioID = parseInt(id as string);
  return (
    <main className="container mx-auto px-4 py-6">
      {isLoggedIn ? (
        <div>
          <Header isAuthenticated={true} />
          <PerfilInfo usuarioID={usuarioID} />
        </div>
      ) : (
        <div>
          <Header isAuthenticated={false} />
          <PerfilInfo usuarioID={usuarioID} />
        </div>
      )}
    </main>
  );
}
