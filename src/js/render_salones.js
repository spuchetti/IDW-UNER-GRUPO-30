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
          <a href="#" class="btn btn-warning text-dark fw-bold w-100">Reservar ahora</a>
        </div>
      </div>
    </div>
  `;
}
export function renderizarSalones() {
  const container = document.getElementById('salones-cards-container');
  if (!container) return;
  const salones = obtenerSalones();
  container.innerHTML = salones.map(crearCardSalon).join('');
}

// Renderiza al cargar el archivo
renderizarSalones();