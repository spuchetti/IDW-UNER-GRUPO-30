export function renderizarMensajesContacto() {
  const mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
  const tbody = document.getElementById('tablaMensajesContacto');
  if (!tbody) return;

  tbody.innerHTML = mensajes.length
    ? mensajes.map(msg => `
      <tr>
        <td>${msg.nombre}</td>
        <td>${msg.email}</td>
        <td>${msg.mensaje}</td>
        <td>${msg.fecha}</td>
      </tr>
    `).join('')
    : `<tr><td colspan="4" class="text-center text-muted">No hay mensajes</td></tr>`;
}