import { protegerRuta } from './proteger_ruta.js';
protegerRuta('admin');

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('https://dummyjson.com/users');
  const data = await res.json();
  const tbody = document.querySelector('#tablaUsuarios tbody');
  tbody.innerHTML = data.users.map(u => `
    <tr>
      <td>${u.firstName} ${u.lastName}</td>
      <td>${u.email}</td>
      <td>${u.phone}</td>
      <td>${u.address.city}</td>
    </tr>
  `).join('');
});