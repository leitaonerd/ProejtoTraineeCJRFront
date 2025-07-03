import React, { useEffect, useState } from "react";
import Header from "../ui/header";
import BuscaProfessor from "./BuscaProfessor";
import ProfessorCard from "./ProfessorCard";
import OrdenarDropdown from "./OrdenarDropdown";
import NovaPublicacaoModal from "./NovaPublicacaoModal";
import { getProfessores } from "../../services/ApiProfessor";
import { theme } from "../../styles/theme";
import { Professor } from "../../types/professor";

const FeedLogado: React.FC = () => {
  const [novosProfessores, setNovosProfessores] = useState<Professor[]>([]);
  const [todosProfessores, setTodosProfessores] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const data = await getProfessores();
        //arbitrario, pode mudar depois
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

  const filteredProfessores = todosProfessores
    .filter((professor) =>
      professor.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.nome.localeCompare(b.nome);
      }
      return b.nome.localeCompare(a.nome);
    });

  return (
    <div>
      <Header isAuthenticated={true} />
      <main style={{ padding: "2rem", backgroundColor: theme.colors.background }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem" }}>Novos Professores</h2>
          <BuscaProfessor searchTerm={searchTerm} onSearchChange={setSearchTerm} />
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
            <ProfessorCard disciplina={""} key={professor.id} {...professor} />
          ))}
        </div>
        <hr style={{ border: `1px solid ${theme.colors.gray}`, margin: "2rem 0" }} />
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
                backgroundColor: theme.colors.primary,
                color: theme.colors.white,
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Nova Publicação
            </button>
            <OrdenarDropdown onSortChange={setSortOrder} />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredProfessores.map((professor) => (
            <ProfessorCard disciplina={""} key={professor.id} {...professor} />
          ))}
        </div>
        <NovaPublicacaoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
};

export default FeedLogado;
