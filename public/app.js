console.log('App carregado');
import { fetchUsers } from './js/api.js';
import { getTotalPages } from './js/pagination.js';
import { renderUsers, renderPagination } from './js/render.js';

const PAGE_SIZE = 10;
let currentPage = 1;
let totalPages = 1;

async function loadPage(page) {
  const offset = (page - 1) * PAGE_SIZE;
  try {
    const data = await fetchUsers(offset, PAGE_SIZE);
    // Adaptação para o formato da API atual
    const users = data.rows || [];
    const total = data.count || users.length;
    totalPages = getTotalPages(total, PAGE_SIZE);
    renderUsers(users);
    renderPagination(page, totalPages, handlePageClick);
    currentPage = page;
  } catch (err) {
    alert('Erro ao carregar usuários: ' + err.message);
  }
}

function handlePageClick(page) {
  if (page !== currentPage) {
    loadPage(page);
  }
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  loadPage(1);
});
