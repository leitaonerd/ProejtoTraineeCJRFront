import { Comentario } from "@/types/comentario";
import Image from "next/image";

const ComentarioCard = ({ comentario }: { comentario: Comentario }) => {
  const fotoUrl = comentario.usuario.fotoPerfil 
    ? `${process.env.NEXT_PUBLIC_API_URL}${comentario.usuario.fotoPerfil}` 
    : '/default-avatar.png'; 

  return (
    <div className="flex items-start space-x-3 mt-4 w-full pl-4">
      <Image 
        src={fotoUrl} 
        alt={`Foto de ${comentario.usuario.nome}`}
        width={32}
        height={32}
        className="rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex flex-row items-center space-x-2">
                   <p className="font-bold text-sm">{comentario.usuario?.nome}</p>
                    <p className="text-xs text-gray-700">
                      {comentario.updatedAt ? new Date(comentario.updatedAt).toLocaleDateString() : ""}, às {comentario.updatedAt ? new Date(comentario.updatedAt).toLocaleTimeString('pt-BR', { hour:'2-digit', minute : '2-digit'}) : ""} 
                    </p>
                </div>
        <p className="text-sm text-black">{comentario.conteudo}</p>
      </div>
    </div>
  );
};

export default ComentarioCard