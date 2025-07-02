export const mockUsuarios = [
  {
    id: 1,
    nome: "Morty Gamer",
    email: "morty@cjr.org.br",
    curso: "Ciência da Computação",
    departamento: "Departamento de Computação",
    fotoPerfil: "/quagsire.png",
  },
  {
    id: 2,
    nome: "Rick Sanchez",
    email: "rick@cjr.org.br",
    curso: "Engenharia Interdimensional",
    departamento: "Física Avançada",
    fotoPerfil: "/quagsire.png",
  },
  {
    id: 3,
    nome: "Summer Smith",
    email: "summer@cjr.org.br",
    curso: "Administração",
    departamento: "Humanas",
    fotoPerfil: "/summer.png",
  },
  {
    id: 4,
    nome: "Beth Smith",
    email: "beth@cjr.org.br",
    curso: "Medicina",
    departamento: "Ciências Biológicas",
    fotoPerfil: "/beth.png",
  },
  {
    id: 5,
    nome: "Jerry Smith",
    email: "jerry@cjr.org.br",
    curso: "Direito",
    departamento: "Ciências Jurídicas",
    fotoPerfil: "/jerry.png",
  },
];

export const mockAvaliacoes = [
  {
    id: 1,
    usuarioID: 1,
    professorID: 101,
    disciplinaID: 201,
    conteudo:
      "O professor é ótimo, explica bem e tem paciência.ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    createdAt: "2024-06-20T10:00:00Z",
  },
  {
    id: 2,
    usuarioID: 2,
    professorID: 101,
    disciplinaID: 202,
    conteudo: "Matéria difícil, mas o professor se esforça bastante.",
    createdAt: "2024-06-21T12:30:00Z",
  },
  {
    id: 3,
    usuarioID: 3,
    professorID: 102,
    disciplinaID: 203,
    conteudo: "A didática precisa melhorar um pouco.",
    createdAt: "2024-06-22T15:45:00Z",
  },
  {
    id: 4,
    usuarioID: 1,
    professorID: 103,
    disciplinaID: 204,
    conteudo: "Muito teórico, senti falta de exemplos práticos.",
    createdAt: "2024-06-24T09:00:00Z",
  },
  {
    id: 5,
    usuarioID: 1,
    professorID: 101,
    disciplinaID: 202,
    conteudo: "Adorei as aulas! Muito dinâmicas.",
    createdAt: "2024-06-25T14:20:00Z",
  },
];

export const mockComentarios = [
  {
    id: 1,
    usuarioID: 2,
    avaliacaoID: 1,
    conteudo: "Concordo com você!",
    createdAt: "2024-06-20T11:00:00Z",
  },
  {
    id: 2,
    usuarioID: 3,
    avaliacaoID: 1,
    conteudo: "Também gostei do professor.",
    createdAt: "2024-06-20T11:30:00Z",
  },
  {
    id: 3,
    usuarioID: 1,
    avaliacaoID: 3,
    conteudo: "Achei a didática boa, depende da aula.",
    createdAt: "2024-06-22T16:00:00Z",
  },
  {
    id: 4,
    usuarioID: 5,
    avaliacaoID: 4,
    conteudo: "Exato! Precisamos de mais prática.",
    createdAt: "2024-06-24T10:00:00Z",
  },
];
