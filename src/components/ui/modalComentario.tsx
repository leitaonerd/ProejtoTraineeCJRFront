import { useEffect, useState } from "react"
import Modal from "../ui/modal"
import { delAvaliacao, updateAvaliacao } from "@/services/ApiAvaliacoes";
import { Avaliacao, UpdateAvaliacao } from "@/types/avaliacao";
import ModalConfirmar from "../ui/modalConfirmar";
import { User } from "@/types/user";
import { useAuth } from "@/context/AuthContext";
import { Comentario } from "@/types/comentario";
import { createComentario } from "@/services/ApiComentario";
import router from "next/router";


interface CriarComentarioProps {
  avaliacao : Avaliacao
  isOpen: boolean;
  onClose: () => void;
}

const CriarComentario : React.FC<CriarComentarioProps> = ({isOpen, onClose, avaliacao}) => {
    const [conteudo, setConteudo] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { isLoggedIn, loading: authLoading,user: loggedInUser } = useAuth();

    useEffect(() => {
  if (isOpen) {
    setConteudo("");
    setError(null);
  }
}, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
        const userDataString = localStorage.getItem('userData');

        if (userDataString) {
            const usuario: User = JSON.parse(userDataString) as User;
            if(usuario.id){
                const comentario : Comentario = {avaliacaoID : avaliacao.id, conteudo : conteudo,usuarioID : usuario.id}
                try{  
                const response = await createComentario(comentario)
                window.alert("Comentário Criado")
                onClose()
            }catch(error){
                window.alert(`Comentário Não foi Criado : ${error}`)
            }

            }
        } else {
            console.error("Não foi possível encontrar os dados do usuário no localStorage para o submit.");
        }
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
                                    {loading ? 'Enviando...' : 'Comentar'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
    )
}

export default CriarComentario