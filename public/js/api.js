// Funções para requisições à API de usuários
export async function fetchUsers(offset = 0, limit = 10) {
  const response = await fetch(`/api/users?offset=${offset}&limit=${limit}`);
  if (!response.ok) throw new Error('Erro ao buscar usuários');
  return response.json();
}
