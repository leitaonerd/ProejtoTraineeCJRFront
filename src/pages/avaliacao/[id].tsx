// pages/avaliacoes/[id].tsx

import Header from "@/components/ui/header";
import { useAuth } from "@/context/AuthContext";
import { delAvaliacao, getAvaliacao } from "@/services/ApiAvaliacoes";
import { Avaliacao} from "../../types/avaliacao";
import { Comentario} from "../../types/comentario";
import { User} from "../../types/user"; // Supondo um arquivo de index para os tipos
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import ComentarioCard from "@/components/ui/ComentarioCard";
import ModalConfirmar from "@/components/ui/modalConfirmar";
import EditarComentario from "@/components/perfil/EditarAvaliacao";
import EditarAvaliacao from "@/components/perfil/EditarAvaliacao";
import CriarComentario from "@/components/ui/modalComentario";

export default function AvaliacaoIdPage() {
  const router = useRouter();
  const { isLoggedIn, loading: authLoading,user: loggedInUser } = useAuth();
  
  const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenComent, setIsModalOpenComent] = useState(false);
  const [isModalOpenCreateComent, setIsModalOpenCreateComent] = useState(false);
  const isEditable = isLoggedIn && loggedInUser && loggedInUser?.id === avaliacao?.usuario?.id;
  const fotoUrl = avaliacao?.usuario?.fotoPerfil 
    ? `${process.env.NEXT_PUBLIC_API_URL}${avaliacao?.usuario?.fotoPerfil}` 
    : '/default-avatar.png'; // Imagem padrão
  
  const { id } = router.query;

  const deletarAvaliacao = async (id : number) => { 
        if(isLoggedIn){
          try{
            const response = await delAvaliacao(id);
            if(response.status == 200){
              window.alert("Deletado com Sucesso");
            }else{
              throw window.alert("Não foi possível apagar a avalição")
            }
          }catch(error: any){
            throw new Error("Não foi possível apagar a avalição")
          }finally{
            setIsModalOpen(false)
            router.push("/");
          }
        }else{
          window.alert("Você não tem permissão")
        }
      }

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const avaliacaoID = parseInt(id as string);
    if (isNaN(avaliacaoID)) {
      setError("ID da avaliação inválido.");
      setLoading(false);
      return;
    }

    const fetchAvaliacao = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: Avaliacao = await getAvaliacao(avaliacaoID);
        if (!data) {
          throw new Error("Avaliação não encontrada");
        }
        setAvaliacao(data);
      } catch (err: any) {
        setError(err.message || "Falha ao carregar a avaliação.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAvaliacao();
  }, [id, router.isReady]);

  if (authLoading || loading) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!avaliacao) {
    return <p className="text-center mt-10">Nenhuma avaliação para exibir.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen"> 
      <Header isAuthenticated={isLoggedIn} />
      
      <div className="flex justify-center p-4 ">
        <div className="w-full max-w-2xl lg:relative"> 

          <button onClick={() => router.push(`/perfil/${avaliacao.usuario?.id}`)} className="mb-4 lg:absolute lg:top-3 left-[-90px] lg:mr-4 lg:mb-0"> 
            <Image src={"/voltar.svg"} alt="" width={50} height={50}/>
          </button>

          <div className="bg-[#E0F8EC] w-full max-w-2xl border-2 border-green-300 rounded-xl p-4 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <Image 
                  src={fotoUrl} 
                  alt={`Foto de ${avaliacao.usuario?.nome}`}
                  width={32}
                  height={32}
                  className="rounded-full object-cover cursor-pointer"
                  onClick={() => router.push(`/perfil/${avaliacao.usuario?.id}`)}
                  />
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center space-x-2" >
                    <p className="font-bold text-sm">{avaliacao.usuario?.nome}</p>
                      <p className="text-xs text-gray-700">
                        {avaliacao.updatedAt ? new Date(avaliacao.updatedAt).toLocaleDateString() : ""}, às {avaliacao.updatedAt ? new Date(avaliacao.updatedAt).toLocaleTimeString('pt-BR', { hour:'2-digit', minute : '2-digit'}) : ""}, sobre {avaliacao.professor?.nome}({avaliacao.professor?.departamento})
                      </p>
                  </div>
                  {isEditable && (
                  <div className="flex space-x-2">
                      <button onClick={() => setIsModalOpenComent(true)}>✏️</button>
                        <EditarAvaliacao isOpen={isModalOpenComent} onClose={() => setIsModalOpenComent(false)} conteudoAvaliacao={avaliacao.conteudo} id={parseInt(id as string)}></EditarAvaliacao>
                      <button
                        onClick={() => setIsModalOpen(true)}
                      >
                        🗑️
                      </button>

                      <ModalConfirmar
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)} 
                          onConfirm={() => {deletarAvaliacao(parseInt(id as string))}}     
                          title="Confirmar Exclusão da Avaliação"
                        >
                      <p>Você tem certeza que deseja excluir sua Avaliação? Esta ação não pode ser desfeita.</p>
                    </ModalConfirmar>
                  </div>
                  )}
                </div>
                <p className="mt-2 text-gray-800">{avaliacao.conteudo}</p>
              </div>
            </div>
            
            <div className="border-t border-green-300 my-4"></div>

            <div>
              <div className="flex flex-row items-center space-x-1">
                <button className="cursor-pointer text-xl" onClick={() => setIsModalOpenCreateComent(true)}>💬</button>
                <CriarComentario isOpen={isModalOpenCreateComent} onClose={() => setIsModalOpenCreateComent(false)} avaliacao={avaliacao}></CriarComentario>
                <p className="text-sm font-semibold">{avaliacao.comentarios.length} comentários</p>
              </div>
              <div className="mt-2 flex flex-col items-start">
                {avaliacao.comentarios.map((comentario, index) => (
                  <ComentarioCard key={index} comentario={comentario} />
                ))}
              </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}