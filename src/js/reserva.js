import { inicializar_servicios } from './ini_servicios.js';

inicializar_servicios();

function obtenerServicios() {
    return JSON.parse(localStorage.getItem('servicios')) || [];
}

function obtenerPresupuestos() {
    return JSON.parse(localStorage.getItem('presupuestos')) || [];
}

function guardarPresupuestos(presupuestos) {
    localStorage.setItem('presupuestos', JSON.stringify(presupuestos));
}

document.addEventListener('DOMContentLoaded', () => {

    const servicios = obtenerServicios();
    const serviciosDiv = document.getElementById('serviciosReserva');
    serviciosDiv.innerHTML = servicios.map(s =>
        `<div>
      <input type="checkbox" class="form-check-input servicio-check" id="servicio${s.id}" data-id="${s.id}" data-valor="${s.valor}">
      <label for="servicio${s.id}" class="form-check-label">${s.descripcion} ($${s.valor})</label>
    </div>`
    ).join('');

    serviciosDiv.addEventListener('change', () => {
        const checks = serviciosDiv.querySelectorAll('.servicio-check:checked');
        let total = 0;
        checks.forEach(c => total += Number(c.dataset.valor));
        document.getElementById('totalReserva').textContent = total;
    });

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-reservar-salon')) {
            e.preventDefault();
            console.log('Botón Reservar ahora clickeado', e.target.dataset.id);

            e.preventDefault();
            const salonId = e.target.dataset.id;
            document.getElementById('reservaSalonId').value = salonId;
            document.getElementById('formReserva').reset();
            document.getElementById('totalReserva').textContent = '0';
            const modal = new bootstrap.Modal(document.getElementById('modalReserva'));
            modal.show();
        }
    });

    document.getElementById('formReserva').addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = document.getElementById('nombreCliente').value.trim();
        const fecha = document.getElementById('fechaEvento').value;
        const tematica = document.getElementById('tematica').value.trim();
        const salonId = Number(document.getElementById('reservaSalonId').value);
        const serviciosSeleccionados = Array.from(document.querySelectorAll('.servicio-check:checked')).map(c => Number(c.dataset.id));
        const total = serviciosSeleccionados.reduce((acc, id) => {
            const serv = servicios.find(s => s.id === id);
            return acc + (serv ? serv.valor : 0);
        }, 0);

        const presupuestos = obtenerPresupuestos();
        presupuestos.push({
            id: Date.now(),
            salonId,
            nombre,
            fecha,
            tematica,
            valorTotal: total,
            servicios: serviciosSeleccionados
        });
        guardarPresupuestos(presupuestos);

        alert('¡Reserva confirmada! Total: $' + total);
        bootstrap.Modal.getInstance(document.getElementById('modalReserva')).hide();
    });
});