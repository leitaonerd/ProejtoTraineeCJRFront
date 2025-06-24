import React, { useState, useEffect } from 'react';
import { createAvaliacao } from '../../services/professor';
import { getProfessores } from '../../services/professor';
import { getDisciplinas } from '../../services/disciplina';
import { getUsuario } from '../../services/usuario';
import { Professor, Disciplina } from '../../types/professor';
import Modal from '../ui/modal';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';

interface NovaPublicacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovaPublicacaoModal: React.FC<NovaPublicacaoModalProps> = ({ isOpen, onClose }) => {
  const [professorId, setProfessorId] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [usuarioID, setUsuarioID] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          setLoading(true);
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
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!professorId) {
      setError("Selecione um professor");
      return;
    }

    if (!disciplinaId) {
      setError("Selecione uma disciplina");
      return;
    }

    if (!conteudo.trim()) {
      setError("O conteúdo da avaliação é obrigatório");
      return;
    }

    if (!usuarioID) {
      setError("Usuário não autenticado");
      return;
    }

    try {
      setLoading(true);
      await createAvaliacao({
        usuarioID,
        professorID: parseInt(professorId),
        disciplinaID: parseInt(disciplinaId),
        conteudo,
      });
      onClose();
      // Could add toast notification here
    } catch (err) {
      setError("Erro ao criar a avaliação");
    } finally {
      setLoading(false);
    }
  };

  const professorOptions = professores.map(p => ({
    value: p.id,
    label: p.nome
  }));

  const disciplinaOptions = disciplinas.map(d => ({
    value: d.id,
    label: d.nome
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Publicação">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select 
          label="Professor"
          value={professorId}
          onChange={(e) => setProfessorId(e.target.value)}
          options={professorOptions}
          placeholder="Selecione um professor"
          disabled={loading}
        />
        
        <Select
          label="Disciplina"
          value={disciplinaId}
          onChange={(e) => setDisciplinaId(e.target.value)}
          options={disciplinaOptions}
          placeholder="Selecione uma disciplina"
          disabled={loading}
        />
        
        <TextArea
          label="Conteúdo da Avaliação"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          placeholder="Escreva sua avaliação aqui..."
          rows={5}
          disabled={loading}
        />
        
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="flex justify-end gap-3 mt-4">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NovaPublicacaoModal;
