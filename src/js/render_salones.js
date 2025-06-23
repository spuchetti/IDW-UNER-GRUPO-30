import { inicializar_salones } from './ini_salones.js';

inicializar_salones();

function obtenerSalones() {
  return JSON.parse(localStorage.getItem('salones')) || [];
}

function crearCardSalon(salon) {
  const imgSrc = salon.imagen ? salon.imagen : `src/img/salon${salon.id}.webp`;
  return `
    <div class="col">
      <div class="card h-100 shadow rounded-4">
        <img
          src="${imgSrc}"
          class="card-img-top rounded-top-4"
          alt="Salón ${salon.nombre}"
          onerror="this.onerror=null;this.src='src/img/salon1.webp';"
        />
        <div class="card-body text-center d-flex flex-column justify-content-between">
          <h5 class="card-title fw-bold">${salon.nombre}</h5>
          <p class="card-text">${salon.descripcion}</p>
          <p class="card-text">Capacidad: ${salon.capacidad} personas.</p>
          <p class="fw-semibold">
            <span class="text-warning">Precio: </span>$${salon.precio} por día
          </p>
          <a href="#" class="btn btn-warning btn-reservar-salon" data-id="${salon.id}">Reservar ahora</a>
        </div>
      </div>
    </div>
  `;
}
export function renderizarSalones(salones, fechaSeleccionada = '') {
  const container = document.getElementById('salones-cards-container');
  container.innerHTML = salones.map(salon => {
    let estado = "Disponible";
    if (fechaSeleccionada && salonEstaReservado(salon.id, fechaSeleccionada)) {
      estado = "Reservado";
    }
    return `
      <div class="col">
        <div class="card h-100 shadow rounded-4">
          <img src="${salon.imagen}" class="card-img-top rounded-top-4" alt="Salón ${salon.nombre}" />
          <div class="card-body text-center d-flex flex-column justify-content-between">
            <h5 class="card-title fw-bold">${salon.nombre}</h5>
            <p class="card-text">${salon.descripcion}</p>
            <p class="card-text">Capacidad: ${salon.capacidad} personas.</p>
            <p class="fw-semibold">
              <span class="text-warning">Precio: </span>$${salon.precio} por día
            </p>
            <span class="badge ${estado === 'Disponible' ? 'bg-success' : 'bg-danger'} mb-2">${estado}</span>
            <a href="#" class="btn btn-warning btn-reservar-salon ${estado === 'Reservado' ? 'disabled' : ''}" data-id="${salon.id}">Reservar ahora</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function obtenerPresupuestos() {
  return JSON.parse(localStorage.getItem('presupuestos')) || [];
}

function salonEstaReservado(salonId, fecha) {
  const presupuestos = obtenerPresupuestos();
  return presupuestos.some(p => p.salonId == salonId && p.fecha === fecha);
}

document.getElementById('formFiltros').addEventListener('submit', function(e) {
  e.preventDefault();
  const fecha = document.getElementById('filtroFecha').value;
  renderizarSalones(obtenerSalones(), fecha);
});

document.getElementById('filtroFecha').addEventListener('change', function() {
  const fecha = this.value;
  renderizarSalones(obtenerSalones(), fecha);
});


renderizarSalones(obtenerSalones());