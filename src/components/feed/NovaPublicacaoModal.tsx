// components/feed/NovaPublicacaoModal.tsx
import React, { useState, useEffect } from 'react';
import { createAvaliacao } from '../../services/professor';
import { getProfessores } from '../../services/professor';
import { getDisciplinas } from '../../services/disciplina';
import { getUsuario } from '../../services/usuario';
import { theme } from '../../styles/theme';

interface NovaPublicacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Professor {
  id: number;
  nome: string;
}

interface Disciplina {
    id: number;
    nome: string;
}

const NovaPublicacaoModal: React.FC<NovaPublicacaoModalProps> = ({ isOpen, onClose }) => {
  const [professorId, setProfessorId] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [usuarioID, setUsuarioID] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const [professoresData, disciplinasData, usuarioData] = await Promise.all([
            getProfessores(),
            getDisciplinas(),
            getUsuario(),
          ]);
          setProfessores(professoresData);
          setDisciplinas(disciplinasData);
          setUsuarioID(usuarioData.id);
        } catch (err) {
          setError("Erro ao carregar dados");
        }
      };
      fetchData();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!usuarioID) {
        setError("Usuário não autenticado");
        return;
    }

    try {
      await createAvaliacao({
        usuarioID,
        professorID: parseInt(professorId),
        disciplinaID: parseInt(disciplinaId),
        conteudo,
      });
      onClose();
    } catch (err) {
      setError("Erro ao criar a avaliação");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: theme.colors.white, padding: '2rem', borderRadius: '8px', width: '500px' }}>
        <h2>Nova Publicação</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Professor</label>
            <select value={professorId} onChange={(e) => setProfessorId(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
              <option value="">Selecione um professor</option>
              {professores.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Disciplina</label>
            <select value={disciplinaId} onChange={(e) => setDisciplinaId(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
                <option value="">Selecione uma disciplina</option>
                {disciplinas.map((d) => (
                    <option key={d.id} value={d.id}>{d.nome}</option>
                ))}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Conteúdo</label>
            <textarea value={conteudo} onChange={(e) => setConteudo(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          {error && <p style={{ color: theme.colors.danger }}>{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={onClose} style={{ padding: '0.5rem 1.5rem' }}>Cancelar</button>
            <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: theme.colors.primary, color: theme.colors.white, border: 'none', borderRadius: '8px' }}>Publicar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovaPublicacaoModal;
