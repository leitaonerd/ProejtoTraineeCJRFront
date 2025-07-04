import { useAuth } from "@/context/AuthContext";
import { deletarUser } from "@/services/ApiUsuario";
import { useState } from "react";
import  ModalConfirmar from "../ui/modalConfirmar"

interface ExcluirPerfilProps {
  usuarioID: number;
}

export default function ExcluirPerfil({usuarioID} : ExcluirPerfilProps) {
  const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deletarPerfil = async (id:number) =>{
    try{
      const response = await deletarUser(id)
      if(response.status == 200){
        window.alert("Usuário deletado com sucesso")
        logout()
      }else{
        window.alert("Não foi possível apagar o perfil")
      }
    }catch(error:any){
      window.alert("Não foi possível deletar o perfil")
    }
    
  }
  return (
    <div className="align-content: center">
      <button onClick={() => setIsModalOpen(true)} className="bg-[#fea4a4] hover:bg-[#f28a8a] text-stone-950 font-bold py-2 px-4 border-b-4 border-[#c16f6f] hover:border-[#a65454] rounded w-32 h-11">
        Excluir Perfil
      </button>

      <ModalConfirmar
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        onConfirm={() => deletarPerfil(usuarioID)}      
        title="Confirmar Exclusão de Perfil"
      >
        <p>Você tem certeza que deseja excluir seu perfil? Esta ação não pode ser desfeita.</p>
      </ModalConfirmar>
      
    </div>
  );
}
