import { Professor } from "../types/professor";
import api from "./api";
import { Avaliacao } from "@/types/avaliacao";

export const getProfessores = async () => {
  const response = await api.get("/professores");
  return response.data;
};

export const getProfessor = async (id: number): Promise<Professor> => {
  console.log("getProfessor chamado");
  const response = await api.get(`/professores/${id}`);
  console.log(response);
  return response.data;
};
