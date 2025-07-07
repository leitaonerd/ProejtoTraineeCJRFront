// components/perfil/PublicacaoCard.tsx
import { useAuth } from "@/context/AuthContext";
import { delAvaliacao } from "@/services/ApiAvaliacoes";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import router from "next/router";
import ModalConfirmar from "../ui/modalConfirmar";
import { useState } from "react";
import EditarAvaliacao from "./EditarAvaliacao";

interface Publicacao {
  id: number;
  conteudo: string;
  data: string;
  autorNome: string;
  comentarios: number;
}

interface PublicacaoCardProps {
  publicacoes: Publicacao[];
  imgUser: string;
  isEditable: boolean; // Adicione esta prop
  isProfessor: boolean;
}

const PublicacaoCard: React.FC<PublicacaoCardProps> = ({
  publicacoes,
  imgUser,
  isEditable, // Receba a prop isEditable
  isProfessor,
}) => {
  const { isLoggedIn, loading, user: loggedInUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenComent, setIsModalOpenComent] = useState(false);
  const [idParaDeletar, setIdParaDeletar] = useState<number | null>(null);
  const [idParaEditar, setIdParaEditar] = useState<number | null>(null);

  const deletarAvaliacao = async (id : number) => { 
        if (!isLoggedIn || idParaDeletar === null) return;
        try{
          const response = await delAvaliacao(id);
          if(response.status == 200){
            window.alert("Deletado com Sucesso");
          }
        }catch(error: any){
          throw new Error("Não foi possível apagar a avalição")
        }finally{
          setIsModalOpen(false)
          router.reload();
        }
    }
    
  const handleCardClick = (avaliacaoId : number) => {
    router.push(`/avaliacao/${avaliacaoId}`);
  };
  if (publicacoes.length === 0) {
    return <div></div>;
  }
  return (
    <section>
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="shadow-xl">
          <div className="bg-white w-full px-6 pb-6 pt-16 relative border-t border-gray-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Publicações
            </h3>
            {publicacoes.map((pub) => (
              <div
                key={pub.id}
                onClick={() => handleCardClick(pub.id)}
                className="bg-green-300 rounded-xl p-4 shadow mb-4"
              >
                <div className="flex items-center gap-2 font-semibold text-sm text-gray-800 mb-1">
                  <span>
                    <div className="rounded-full overflow-hidden">
                      <Image
                        src={imgUser}
                        alt="Foto de usuário"
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </span>
                  <span>{pub.autorNome}</span>
                  <span className="text-gray-600">· {pub.data}</span>
                </div>
                <p className="text-sm text-gray-700 break-words">
                  {pub.conteudo}
                </p>
                <div className="flex items-center mt-3 gap-2 text-sm text-gray-700">
                  <MessageSquare className="w-4 h-4" />
                  <span>
                    {pub.comentarios} comentário
                    {pub.comentarios !== 1 ? "s" : ""}
                  </span>
                </div>
                {isEditable && ( 
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={(event) => { event.stopPropagation(); setIdParaEditar(pub.id); }}>✏️</button>
                    <button onClick={(event) => { event.stopPropagation(); setIdParaDeletar(pub.id); }}>🗑️</button>
                  </div>
                )}
                <EditarAvaliacao
                  isOpen={idParaEditar === pub.id}
                  onClose={() => setIdParaEditar(null)}
                  conteudoAvaliacao={pub.conteudo}
                  id={pub.id}
                />
                                
                <ModalConfirmar
                  isOpen={idParaDeletar === pub.id}
                  onClose={() => setIdParaDeletar(null)}
                  onConfirm={() => deletarAvaliacao}
                  title="Confirmar Exclusão da Avaliação"
                >
                <p>Você tem certeza que deseja excluir sua Avaliação? Esta ação não pode ser desfeita.</p>
                </ModalConfirmar>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicacaoCard;
