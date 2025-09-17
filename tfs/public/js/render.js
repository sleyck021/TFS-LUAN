// Funções para renderizar usuários e paginação
export function renderUsers(users) {
  const usersContainer = document.getElementById('users');
  usersContainer.innerHTML = '';
  let selectedUserId = null;
  console.log('Usuários recebidos:', users);
  if (!users || users.length === 0) {
    usersContainer.textContent = 'Nenhum usuário encontrado.';
    return;
  }
  const ul = document.createElement('ul');
  ul.className = 'list-group';
  users.forEach(user => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = `${user.name} (${user.email})`;
    li.style.cursor = 'pointer';
    li.onclick = () => {
      // Remove seleção anterior
      Array.from(ul.children).forEach(child => child.classList.remove('active'));
      li.classList.add('active');
      selectedUserId = user.id;
      // Mostra botão de excluir
      deleteBtn.style.display = 'inline-block';
    };
    ul.appendChild(li);
  });
  usersContainer.appendChild(ul);
  // Botão de excluir
  let deleteBtn = document.getElementById('delete-user-btn');
  if (!deleteBtn) {
    deleteBtn = document.createElement('button');
    deleteBtn.id = 'delete-user-btn';
    deleteBtn.className = 'btn btn-danger mt-2';
    deleteBtn.textContent = 'Excluir Usuário';
    deleteBtn.style.display = 'none';
    usersContainer.appendChild(deleteBtn);
  }
  deleteBtn.onclick = () => {
    if (selectedUserId) {
      const event = new CustomEvent('deleteUser', { detail: selectedUserId });
      window.dispatchEvent(event);
    }
  };
}

export function renderPagination(currentPage, totalPages, onPageClick) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = i;
    link.style.margin = '0 5px';
    if (i === currentPage) {
      link.style.fontWeight = 'bold';
      link.style.textDecoration = 'underline';
    }
    link.addEventListener('click', (e) => {
      e.preventDefault();
      onPageClick(i);
    });
    paginationContainer.appendChild(link);
  }
}
