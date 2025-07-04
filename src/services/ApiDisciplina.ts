import api from "./api"


export const getDisciplinas = async () => {
  const response = await api.get('/disciplina')
  return response.data
}

export const getDisciplina = async (id : number) => {
  const response = await api.get(`/disciplina/${id}`)
  return response.data
}