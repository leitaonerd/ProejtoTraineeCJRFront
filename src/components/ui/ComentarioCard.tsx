import { useAuth } from "@/context/AuthContext";
import { delComentario } from "@/services/ApiComentario";
import { Comentario } from "@/types/comentario";
import { User } from "@/types/user";
import Image from "next/image";
import router from "next/router";
import { useState } from "react";

const ComentarioCard = ({ comentario }: { comentario: Comentario }) => {
  const defaultAvatar = '/default-avatar.png';
  const { isLoggedIn,user: loggedInUser } = useAuth();
  const isOwner = isLoggedIn && loggedInUser?.id === comentario.usuario?.id;
  const fotoUrl = comentario.usuario?.fotoPerfil 
    ? `${process.env.NEXT_PUBLIC_API_URL}${comentario.usuario.fotoPerfil}` 
    : defaultAvatar; 

  const handleDeleteComentario = async (comentarioIdParaDeletar: number) =>{
        try{
          const response = await delComentario(comentarioIdParaDeletar)
          if(response.status == 200){
              window.alert("Deletado com Sucesso");
               router.reload();
            }else{
              throw window.alert("Não foi possível apagar a avalição")
            }
          }catch(error: any){
            console.error("Não foi possível apagar a avalição")
            window.alert("Não foi possível apagar o comentário.");
        }
}

  console.log(loggedInUser,isOwner,isLoggedIn)
  return (
    <div className="flex items-start space-x-3 mt-4 w-full pl-4">
      <Image 
        src={fotoUrl} 
        alt={`Foto de ${comentario.usuario?.nome}`}
        width={32}
        height={32}
        className="rounded-full object-cover cursor-pointer"
        onClick={() => router.push(`/perfil/${comentario.usuario?.id}`)}
      />
      <div className="flex-1">
        <div className="flex flex-row items-center space-x-2">
                   <p className="font-bold text-sm">{comentario.usuario?.nome}</p>
                    <p className="text-xs text-gray-700">
                      {comentario.updatedAt ? new Date(comentario.updatedAt).toLocaleDateString() : ""}, às {comentario.updatedAt ? new Date(comentario.updatedAt).toLocaleTimeString('pt-BR', { hour:'2-digit', minute : '2-digit'}) : ""} 
                    </p>
                    {isOwner && (
                    <button onClick={() => {
                      if (typeof comentario.id === 'number') {
                        handleDeleteComentario(comentario.id);
                      } else {
                        console.error("Não é possível deletar: o ID do comentário é inválido.");
                      }}}
                      >🗑️</button>)}
                </div>
        <p className="text-sm text-black">{comentario.conteudo}</p>
      </div>
    </div>
  );
};

export default ComentarioCard