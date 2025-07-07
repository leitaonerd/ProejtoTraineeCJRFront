import { Professor } from "@/types/professor";
import Image from "next/image";

interface PerfilCardProfessorProps {
  professor: Professor;
}

const PerfilCardProfessor: React.FC<PerfilCardProfessorProps> = ({
  professor,
}) => {
  if (!professor) return <p>Professor não encontrado</p>;
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="overflow-hidden shadow-xl" style={{ height: "400px" }}>
        <div className="bg-green-300 h-[45%] w-full" />

        <div className="bg-white h-[55%] w-full px-6 pb-6 pt-16 relative">
          <div className="absolute -top-16 left-20 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={"/quagsire.png"}
              alt="Foto de usuário"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-align: left ml-12">
            <h2 className="text-2xl font-bold text-gray-800">
              {professor?.nome}
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
                <span>Dept. </span>
                {professor?.departamento}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap mt-1">
              <Image
                src={"/book.png"}
                alt="Foto de livro/disciplina"
                width={24}
                height={24}
              />
              <p className="text-base text-gray-600 mt-1">
                {professor.disciplina?.nome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilCardProfessor;
