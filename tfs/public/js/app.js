


console.log('App carregado');
import { fetchUsers } from './api.js';
import { getTotalPages } from './pagination.js';
import { renderUsers, renderPagination } from './render.js';

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
    // Adicionar usuário
    const addBtn = document.getElementById('add-user-btn');
    if (addBtn) {
        addBtn.onclick = async () => {
            const name = prompt('Nome do usuário:');
            const email = prompt('Email do usuário:');
            if (name && email) {
                try {
                    // Adapte para sua API
                    await fetch('/api/users', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email })
                    });
                    loadPage(currentPage);
                } catch (err) {
                    alert('Erro ao adicionar usuário: ' + err.message);
                }
            }
        };
    }

    // Excluir usuário
    window.addEventListener('deleteUser', async (e) => {
        const userId = e.detail;
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                // Adapte para sua API
                await fetch(`/api/users/${userId}`, { method: 'DELETE' });
                loadPage(currentPage);
            } catch (err) {
                alert('Erro ao excluir usuário: ' + err.message);
            }
        }
    });
});
