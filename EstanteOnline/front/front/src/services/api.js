const API_URL = "http://localhost:4000/livros"

export async function getLivros() {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error("Erro ao buscar livros")
  return response.json()
}

export function downloadLivro(id) {
  return `${API_URL}/download/${id}`
}
