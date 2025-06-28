import Image from "next/image";
import { User } from "@/types/user";
import { mockUsuarios } from "@/mock/dataPerfil";
import ExcluirPerfil from "./ExcluirPerfil";
import { isAuthenticated } from "@/services/auth";
import EditarPerfil from "./EditarPerfil";

interface PerfilCardProps {
  usuarioID: number;
  isAuthenticated: boolean;
}

const PerfilCard: React.FC<PerfilCardProps> = ({
  usuarioID,
  isAuthenticated,
}) => {
  const usuario: User | undefined = mockUsuarios.find(
    (u) => u.id === usuarioID
  );

  if (!usuario) return <p>Usuário não encontrado</p>;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="overflow-hidden shadow-xl" style={{ height: "400px" }}>
        <div className="bg-green-300 h-[45%] w-full" />

        <div className="bg-white h-[55%] w-full px-6 pb-6 pt-16 relative">
          {isAuthenticated && (
            <div className="absolute top-3 right-12">
              <EditarPerfil />
              <div className="absolute top-12">
                <ExcluirPerfil />
              </div>
            </div>
          )}
          <div className="absolute -top-16 left-20 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={usuario.fotoPerfil}
              alt="Foto de usuário"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-align: left ml-12">
            <h2 className="text-2xl font-bold text-gray-800">
              {usuario?.nome}
            </h2>
            <p className="text-base text-gray-600 mt-1">
              {usuario?.departamento}
            </p>
            <p className="text-base text-gray-600 mt-1">{usuario?.curso}</p>
            <p className="text-base text-gray-600 mt-1">{usuario?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilCard;
