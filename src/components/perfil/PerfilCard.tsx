// components/perfil/PerfilCard.tsx
import Image from "next/image";
import { User } from "@/types/user";
import ExcluirPerfil from "./ExcluirPerfil";
import EditarPerfil from "./EditarPerfil";

interface PerfilCardProps {
  usuarioID: number;
  isAuthenticated: boolean;
  isEditable: boolean; // Adicione esta prop
  usuario: User; // Adicione esta prop para receber os dados do usuário
}

const PerfilCard: React.FC<PerfilCardProps> = ({
  usuarioID,
  isAuthenticated,
  isEditable, // Receba a prop isEditable
  usuario, // Receba o objeto usuario
}) => {

  console.log('Dados recebidos no PerfilCard:', usuario);

  if (!usuario) return <p>Usuário não encontrado</p>;

  const fotoUrl = usuario.fotoPerfil
      ? `${process.env.NEXT_PUBLIC_API_URL}${usuario.fotoPerfil}`
      : "/profile.svg";
      
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="overflow-hidden shadow-xl" style={{ height: "400px" }}>
        <div className="bg-green-300 h-[45%] w-full" />

        <div className="bg-white h-[55%] w-full px-6 pb-6 pt-16 relative">
          {isEditable && ( // Renderize condicionalmente os botões
            <div className="absolute top-3 right-12">
              <EditarPerfil />
              <div className="absolute top-12">
                <ExcluirPerfil usuarioID={usuarioID} />
              </div>
            </div>
          )}
          <div className="absolute -top-16 left-20 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={fotoUrl}
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
            <div className="flex items-center gap-2 flex-wrap mt-1">
              <span>
                <Image
                  src={"/building.png"}
                  alt="Foto de departamento"
                  width={24}
                  height={24}
                />
              </span>
              <span className="text-base text-gray-600">
                {usuario?.departamento}
              </span>
              <span> | </span>
              <span className="text-base text-gray-600">{usuario?.curso}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap mt-1">
              <Image
                src={"/email.png"}
                alt="Foto de departamento"
                width={24}
                height={24}
              />
              <p className="text-base text-gray-600 mt-1">{usuario?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilCard;