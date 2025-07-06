import { useEffect, useState } from "react"
import Modal from "../ui/modal"
import { delAvaliacao, updateAvaliacao } from "@/services/ApiAvaliacoes";
import { UpdateAvaliacao } from "@/types/avaliacao";
import ModalConfirmar from "../ui/modalConfirmar";


interface EditarAvaliacaoProps {
  id : number
  conteudoAvaliacao : string
  isOpen: boolean;
  onClose: () => void;
}

const EditarAvaliacao : React.FC<EditarAvaliacaoProps> = ({isOpen, onClose, id, conteudoAvaliacao}) => {
    const [isModalOpenConfirmar,setIsModalOpenConfirmar] = useState(false)
    const [conteudo, setConteudo] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setConteudo(conteudoAvaliacao || "");
        }
    }, [isOpen, conteudoAvaliacao]);


    const deletarAvaliacao = async (id : number) => { 
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
            onClose()
          }
    }

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        const conteudoUpdate: UpdateAvaliacao = { conteudo }
        try{
              const response = await updateAvaliacao(id,conteudoUpdate)
              alert(`Avaliacao editada: ${response}`);
               onClose()
        }catch(error : any){
              alert(`Erro ao realizar a edição: ${error}`)
               onClose()
        }
    }
    
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-green-300 rounded-2xl p-6 w-full max-w-2xl mx-auto shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-3">
                        
                        <textarea
                            value={conteudo}
                            onChange={(e) => setConteudo(e.target.value)}
                            placeholder={conteudo}
                            rows={8}
                            disabled={loading}
                            className="w-full bg-green-200 text-gray-800 px-4 py-3 rounded-xl focus:outline-none resize-none" />
                        {error && (
                            <div className="bg-red-100 border border-red-300 text-red-600 text-sm rounded-lg p-3">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-between pt-4 pb-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpenConfirmar(true)}
                                disabled={loading}><span className="text-2xl">🗑️</span>
                            </button>
                            <ModalConfirmar
                                        isOpen={isModalOpenConfirmar}
                                        onClose={() => setIsModalOpenConfirmar(false)} 
                                        onConfirm={() => deletarAvaliacao(id)}     
                                        title="Confirmar Exclusão da Avaliação"
                            >     
                            <p>Você tem certeza que deseja excluir sua Avaliação? Esta ação não pode ser desfeita.</p>
                            </ModalConfirmar>
                            <div>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                                    className="px-3 py-3 text-white rounded-xl font-semibold hover:underline transition duration-200"
                                    disabled={loading}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition duration-200 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? 'Enviando...' : 'Editar'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
    )
}

export default EditarAvaliacao