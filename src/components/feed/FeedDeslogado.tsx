import React from "react";
import Header from "../ui/header";
import BuscaProfessor from "./BuscaProfessor";
import ProfessorCard from "./ProfessorCard";
import OrdenarDropdown from "./OrdenarDropdown";

const FeedDeslogado: React.FC = () => {
  // dados de teste
  const novosProfessores = [
    { id: 1, nome: "Rick Sanchez", disciplina: "Segurança Computacional", avatar: "/rick.png" },
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
      <Header isAuthenticated={false} />
      <main style={{ padding: "2rem", backgroundColor: "#f0f2f5" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem" }}>Novos Professores</h2>
          <BuscaProfessor />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {novosProfessores.map((professor) => (
            <ProfessorCard key={professor.id} {...professor} />
          ))}
        </div>
        <hr style={{ border: "1px solid #ccc", margin: "2rem 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem" }}>Todos os Professores</h2>
          <OrdenarDropdown />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {todosProfessores.map((professor) => (
            <ProfessorCard key={professor.id} {...professor} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FeedDeslogado;
