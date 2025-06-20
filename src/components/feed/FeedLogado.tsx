import React, { useEffect, useState } from "react";
import Header from "../ui/Header";
import BuscaProfessor from "./BuscaProfessor";
import ProfessorCard from "./ProfessorCard";
import OrdenarDropdown from "./OrdenarDropdown";
import NovaPublicacaoModal from "./NovaPublicacaoModal";
import { getProfessores } from "../../services/professor";

interface Professor {
  id: number;
  nome: string;
  disciplina: string;
  avatar?: string;
}

const FeedLogado: React.FC = () => {
  const [novosProfessores, setNovosProfessores] = useState<Professor[]>([]);
  const [todosProfessores, setTodosProfessores] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const data = await getProfessores();
        // Mocking the split between new and all professors for now
        setNovosProfessores(data.slice(0, 4));
        setTodosProfessores(data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao buscar os professores");
        setLoading(false);
      }
    };

    fetchProfessores();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Header isAuthenticated={true} />
      <main style={{ padding: "2rem", backgroundColor: "#f0f2f5" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem" }}>Novos Professores</h2>
          <BuscaProfessor />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {novosProfessores.map((professor) => (
            <ProfessorCard key={professor.id} {...professor} />
          ))}
        </div>
        <hr style={{ border: "1px solid #ccc", margin: "2rem 0" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem" }}>Todos os Professores</h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                padding: "0.5rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "#4A90E2",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Nova Publicação
            </button>
            <OrdenarDropdown />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {todosProfessores.map((professor) => (
            <ProfessorCard key={professor.id} {...professor} />
          ))}
        </div>
      </main>
      <NovaPublicacaoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FeedLogado;
