// Funções para lógica de paginação
export function getTotalPages(totalItems, pageSize) {
  return Math.ceil(totalItems / pageSize);
}
