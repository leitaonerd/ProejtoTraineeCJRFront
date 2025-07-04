import React, { useState, useEffect } from 'react';
import { createAvaliacao } from '../../services/professor';
import { getProfessores } from '../../services/professor';
import { getDisciplinas } from '../../services/disciplina';
import { getUsuario } from '../../services/usuario';
import { Professor, Disciplina } from '../../types/professor';
import Modal from '../ui/modal';

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
      
      // Reset form on success
      setProfessorId("");
      setDisciplinaId("");
      setConteudo("");
      setError(null);
      
      onClose();
    } catch (err) {
      setError("Erro ao criar a avaliação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="bg-green-300 rounded-2xl p-6 w-full max-w-2xl mx-auto shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Selecionar professor */}
          <select
            value={professorId}
            onChange={(e) => setProfessorId(e.target.value)}
            disabled={loading}
            className="w-full bg-white text-gray-700 px-4 py-3 rounded-full focus:outline-none"
          >
            <option value="">Nome do professor</option>
            {professores.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {professor.nome}
              </option>
            ))}
          </select>

          {/* Selecionar disciplina */}
          <select
            value={disciplinaId}
            onChange={(e) => setDisciplinaId(e.target.value)}
            disabled={loading}
            className="w-full bg-white text-gray-700 px-4 py-3 rounded-full focus:outline-none"
          >
            <option value="">Disciplina</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina.id} value={disciplina.id}>
                {disciplina.nome}
              </option>
            ))}
          </select>

          {/* Area do Texto */}
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            placeholder=""
            rows={8}
            disabled={loading}
            className="w-full bg-green-200 text-gray-800 px-4 py-3 rounded-xl focus:outline-none resize-none"
          />

          {/* Erro */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-600 text-sm rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-6 pt-4 pb-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-3 bg-green-400 text-white rounded-xl font-semibold hover:bg-green-500 transition duration-200"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition duration-200 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Avaliar'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NovaPublicacaoModal;
