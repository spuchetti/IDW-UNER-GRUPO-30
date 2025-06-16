import { inicializar_salones } from './ini_salones.js';

inicializar_salones();

const salonForm = document.getElementById('salonForm');
const tablaSalones = document.getElementById('tablaSalones').querySelector('tbody');
const btnGuardar = document.getElementById('btnGuardar');
const imagenInput = document.getElementById('imagen');

function obtenerSalones() {
  return JSON.parse(localStorage.getItem('salones')) || [];
}

function guardarSalones(salones) {
  localStorage.setItem('salones', JSON.stringify(salones));
}

function limpiarFormulario() {
  salonForm.reset();
  document.getElementById('salonId').value = '';
  btnGuardar.textContent = 'Agregar';
}

function renderizarTabla() {
  const salones = obtenerSalones();
  tablaSalones.innerHTML = '';
  salones.forEach((salon) => {
    const imgTag = salon.imagen
      ? `<img src="${salon.imagen}" alt="Imagen de ${salon.nombre}" style="width:60px;height:40px;object-fit:cover;border-radius:6px;margin-right:8px;">`
      : '';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${imgTag}${salon.nombre}</td>
      <td>${salon.descripcion}</td>
      <td>${salon.capacidad}</td>
      <td>$${salon.precio}</td>
      <td>
        <button class="btn btn-sm btn-primary me-2 btn-editar" data-id="${salon.id}">Editar</button>
        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${salon.id}">Eliminar</button>
      </td>
    `;
    tablaSalones.appendChild(tr);
  });
}


tablaSalones.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-editar')) {
    const id = Number(e.target.dataset.id);
    const salon = obtenerSalones().find(s => s.id === id);
    if (salon) {
      document.getElementById('salonId').value = salon.id;
      document.getElementById('nombre').value = salon.nombre;
      document.getElementById('descripcion').value = salon.descripcion;
      document.getElementById('capacidad').value = salon.capacidad;
      document.getElementById('precio').value = salon.precio;
      btnGuardar.textContent = 'Actualizar';

    }
  }
  if (e.target.classList.contains('btn-eliminar')) {
    const id = Number(e.target.dataset.id);
    if (confirm('¿Seguro que desea eliminar este salón?')) {
      let salones = obtenerSalones();
      salones = salones.filter(s => s.id !== id);
      guardarSalones(salones);
      renderizarTabla();
      limpiarFormulario();
    }
  }
});

function leerImagen(input, callback) {
  if (input && input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      callback(e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    callback(null);
  }
}

salonForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!salonForm.checkValidity()) {
    salonForm.classList.add('was-validated');
    return;
  }
  const id = document.getElementById('salonId').value;
  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const capacidad = Number(document.getElementById('capacidad').value);
  const precio = Number(document.getElementById('precio').value);

  let salones = obtenerSalones();

  function guardarYActualizar(imagenBase64) {
    if (id) {

      salones = salones.map(salon =>
        salon.id === Number(id)
          ? { ...salon, nombre, descripcion, capacidad, precio, imagen: imagenBase64 || salon.imagen }
          : salon
      );
    } else {

      const nuevoId = salones.length ? Math.max(...salones.map(s => s.id)) + 1 : 1;
      salones.push({ id: nuevoId, nombre, descripcion, capacidad, precio, imagen: imagenBase64 });
    }
    guardarSalones(salones);
    renderizarTabla();
    limpiarFormulario();
    salonForm.classList.remove('was-validated');
  }

  if (imagenInput && imagenInput.files && imagenInput.files[0]) {
    leerImagen(imagenInput, guardarYActualizar);
  } else {
    guardarYActualizar();
  }
});

renderizarTabla();