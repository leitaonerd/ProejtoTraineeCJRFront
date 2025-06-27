import Image from "next/image";
import { User } from "@/types/user";
import { mockUsuarios } from "@/mock/dataPerfil";

interface PerfilInfoProps {
  usuarioID: number;
}

const PerfilInfo: React.FC<PerfilInfoProps> = ({ usuarioID }) => {
  const usuario: User | undefined = mockUsuarios.find(
    (u) => u.id === usuarioID
  );

  if (!usuario) return <p>Usuário não encontrado</p>;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-6 w-full max-w-4xl mx-auto">
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow">
        <Image
          src={usuario.fotoPerfil}
          alt="Foto de usuário"
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 w-full">
        <h2 className="text-2xl font-bold text-gray-800">{usuario?.nome}</h2>
        <p className="text-sm text-gray-600 mt-1">{usuario?.departamento}</p>
        <p className="text-sm text-gray-600 mt-1">{usuario?.curso}</p>
        <p className="text-sm text-gray-600 mt-1">{usuario?.email}</p>
      </div>
    </div>
  );
};

export default PerfilInfo;
