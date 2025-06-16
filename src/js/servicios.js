import { inicializar_servicios } from './ini_servicios.js';
inicializar_servicios();

function obtenerServicios() {
  return JSON.parse(localStorage.getItem('servicios')) || [];
}
function guardarServicios(servicios) {
  localStorage.setItem('servicios', JSON.stringify(servicios));
}
function renderizarServicios() {
  const servicios = obtenerServicios();
  const tbody = document.querySelector('#tablaServicios tbody');
  tbody.innerHTML = servicios.map(s => `
    <tr>
      <td>${s.descripcion}</td>
      <td>$${s.valor}</td>
      <td>
        <button class="btn btn-sm btn-primary btn-editar-servicio" data-id="${s.id}">Editar</button>
        <button class="btn btn-sm btn-danger btn-eliminar-servicio" data-id="${s.id}">Eliminar</button>
      </td>
    </tr>
  `).join('');
}
document.getElementById('formServicio').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('servicioId').value;
  const descripcion = document.getElementById('descripcionServicio').value.trim();
  const valor = Number(document.getElementById('valorServicio').value);
  let servicios = obtenerServicios();
  if (id) {
    servicios = servicios.map(s => s.id == id ? { ...s, descripcion, valor } : s);
  } else {
    const nuevoId = servicios.length ? Math.max(...servicios.map(s => s.id)) + 1 : 1;
    servicios.push({ id: nuevoId, descripcion, valor });
  }
  guardarServicios(servicios);
  renderizarServicios();
  this.reset();
});
document.querySelector('#tablaServicios tbody').addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-editar-servicio')) {
    const id = e.target.dataset.id;
    const servicio = obtenerServicios().find(s => s.id == id);
    if (servicio) {
      document.getElementById('servicioId').value = servicio.id;
      document.getElementById('descripcionServicio').value = servicio.descripcion;
      document.getElementById('valorServicio').value = servicio.valor;
    }
  }
  if (e.target.classList.contains('btn-eliminar-servicio')) {
    if (confirm('¿Eliminar servicio?')) {
      let servicios = obtenerServicios().filter(s => s.id != e.target.dataset.id);
      guardarServicios(servicios);
      renderizarServicios();
    }
  }
});
renderizarServicios();