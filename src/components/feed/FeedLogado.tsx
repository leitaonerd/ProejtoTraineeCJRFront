import React, { useEffect, useState } from "react";
import Header from "../ui/Header";
import BuscaProfessor from "./BuscaProfessor";
import ProfessorCard from "./ProfessorCard";
import OrdenarDropdown from "./OrdenarDropdown";
import NovaPublicacaoModal from "./NovaPublicacaoModal";

interface Post {
  id: number;
  autor: string;
  conteudo: string;
  data: string;
}

const FeedLogado: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    // Altere a URL abaixo para o endpoint real do seu backend
    fetch("http://localhost:3001/feed", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar o feed");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando feed...</div>;
  if (error) return <div>Erro: {error}</div>;

  // Mock data for professors, should be replaced with API call
  const novosProfessores = [
    { id: 1, nome: "Nome", disciplina: "Disciplina" },
    { id: 2, nome: "Nome", disciplina: "Disciplina" },
    { id: 3, nome: "Nome", disciplina: "Disciplina" },
    { id: 4, nome: "Nome", disciplina: "Disciplina" },
  ];

  const todosProfessores = [
    { id: 5, nome: "Nome", disciplina: "Disciplina" },
    { id: 6, nome: "Nome", disciplina: "Disciplina" },
    { id: 7, nome: "Nome", disciplina: "Disciplina" },
    { id: 8, nome: "Nome", disciplina: "Disciplina" },
  ];

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
