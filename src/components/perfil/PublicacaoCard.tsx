// components/perfil/PublicacaoCard.tsx
import { MessageSquare } from "lucide-react";
import Image from "next/image";

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
}

const PublicacaoCard: React.FC<PublicacaoCardProps> = ({
  publicacoes,
  imgUser,
  isEditable, // Receba a prop isEditable
}) => {
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
                {isEditable && ( // Exemplo de como você poderia adicionar botões para cada publicação
                  <div className="flex justify-end gap-2 mt-2">
                    <button className="text-blue-600 text-sm">Editar</button>
                    <button className="text-red-600 text-sm">Excluir</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicacaoCard;