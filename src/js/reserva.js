import { inicializar_servicios } from './ini_servicios.js';

inicializar_servicios();

let logoBase64 = null;
let logoListo = false;

function cargarLogo() {
    const img = new Image();
    img.src = 'src/img/logo.png'; 
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        logoBase64 = canvas.toDataURL('image/png');
        logoListo = true;

        document.querySelectorAll('.btn-reservar-salon').forEach(btn => btn.disabled = false);
    };
 
    document.querySelectorAll('.btn-reservar-salon').forEach(btn => btn.disabled = true);
}
cargarLogo();

function obtenerServicios() {
    return JSON.parse(localStorage.getItem('servicios')) || [];
}
function obtenerPresupuestos() {
    return JSON.parse(localStorage.getItem('presupuestos')) || [];
}
function guardarPresupuestos(presupuestos) {
    localStorage.setItem('presupuestos', JSON.stringify(presupuestos));
}

function generarComprobantePDF(presupuesto) {
    if (!logoListo) {
        alert('El logo aún se está cargando. Por favor, intentá de nuevo en un momento.');
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    
    if (logoBase64 && logoBase64.startsWith('data:image/png;base64,')) {
        console.log('Logo base64:', logoBase64);
        doc.addImage(logoBase64, 'PNG', 5, 5, 50, 35);
    }

    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text("Comprobante de Reserva", 105, 18, { align: "center" });
    doc.setDrawColor(255, 193, 7);
    doc.setLineWidth(1.5);
    doc.line(60, 23, 150, 23);

    doc.setFillColor(245, 245, 245);
    doc.roundedRect(10, 35, 190, 28, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${presupuesto.nombre}`, 15, 45);
    doc.text(`Fecha: ${presupuesto.fecha}`, 15, 53);
    doc.text(`Temática: ${presupuesto.tematica}`, 15, 61);

    let y = 75;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(10, y - 5, 190, 8 + 8 * presupuesto.servicios.length, 3, 3, 'F');
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text("Servicios incluidos:", 15, y);
    doc.setFont('helvetica', 'normal');
    y += 8;
    presupuesto.servicios.forEach(servicio => {
        doc.text(`• ${servicio.descripcion} ($${servicio.valor})`, 20, y);
        y += 8;
    });

    doc.setFillColor(40, 167, 69);
    doc.roundedRect(10, y + 5, 190, 15, 3, 3, 'F');
    doc.setFontSize(15);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: $${presupuesto.total}`, 105, y + 16, { align: "center" });

    const qrData = JSON.stringify({
        nombre: presupuesto.nombre,
        fecha: presupuesto.fecha,
        tematica: presupuesto.tematica,
        servicios: presupuesto.servicios.map(s => s.descripcion),
        total: presupuesto.total
    });

    const qr = new QRious({
        value: qrData,
        size: 100,
        background: 'white',
        foreground: 'black'
    });

    doc.addImage(qr.toDataURL(), 'PNG', 150, 240, 40, 40);

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'italic');
    doc.text("¡Gracias por confiar en nosotros!", 105, 285, { align: "center" });

    doc.save("comprobante_reserva.pdf");
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-reservar-salon')) {
            e.preventDefault();
            const salonId = e.target.dataset.id;
            document.getElementById('reservaSalonId').value = salonId;

            const modal = new bootstrap.Modal(document.getElementById('modalReserva'));
            modal.show();
            actualizarTotal();
        }
    });

    const servicios = obtenerServicios();
    const serviciosDiv = document.getElementById('serviciosReserva');
    if (serviciosDiv) {
        serviciosDiv.innerHTML = servicios.map(s =>
            `<div>
                <input type="checkbox" class="form-check-input servicio-check" id="servicio${s.id}" data-id="${s.id}" data-valor="${s.valor}">
                <label for="servicio${s.id}" class="form-check-label">${s.descripcion} ($${s.valor})</label>
            </div>`
        ).join('');
    }

    function actualizarTotal() {
        const servicios = obtenerServicios();
        const seleccionados = Array.from(document.querySelectorAll('.servicio-check:checked'));
        const salonId = document.getElementById('reservaSalonId').value;
        const salones = JSON.parse(localStorage.getItem('salones')) || [];
        const salonSeleccionado = salones.find(s => s.id == salonId);
        let total = salonSeleccionado ? Number(salonSeleccionado.precio) : 0;
        total += seleccionados.reduce((sum, input) => {
            const id = Number(input.dataset.id);
            const servicio = servicios.find(s => s.id === id);
            return sum + (servicio ? Number(servicio.valor) : 0);
        }, 0);
        document.getElementById('totalReserva').textContent = total;
    }

    document.getElementById('serviciosReserva').addEventListener('change', actualizarTotal);

    const form = document.getElementById('formReserva');
    let ultimoPresupuesto = null;

    if (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }
            form.classList.remove('was-validated');
            const nombre = document.getElementById('nombreCliente').value.trim();
            const fecha = document.getElementById('fechaEvento').value;
            const tematica = document.getElementById('tematica').value.trim();

            const serviciosSeleccionados = Array.from(document.querySelectorAll('.servicio-check:checked'))
                .map(input => {
                    const id = Number(input.dataset.id);
                    const servicio = servicios.find(s => s.id === id);
                    return servicio;
                });

            const salonId = document.getElementById('reservaSalonId').value;
            const salones = JSON.parse(localStorage.getItem('salones')) || [];
            const salonSeleccionado = salones.find(s => s.id == salonId);

            let totalServicios = salonSeleccionado ? Number(salonSeleccionado.precio) : 0;
            totalServicios += serviciosSeleccionados.reduce((sum, s) => sum + Number(s.valor), 0);

            const presupuesto = {
                id: Date.now(),
                salonId,
                nombre,
                fecha,
                tematica,
                servicios: serviciosSeleccionados,
                total: totalServicios
            };

            
            const hoy = new Date();
            hoy.setHours(0,0,0,0);
            const partes = fecha.split('-');
            const fechaReserva = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
            fechaReserva.setHours(0,0,0,0);

            const mensajeError = document.getElementById('mensajeErrorReserva');
            if (fechaReserva < hoy) {
                if (mensajeError) {
                    mensajeError.textContent = 'No se puede reservar para una fecha pasada.';
                    mensajeError.classList.remove('d-none');
                }
                event.preventDefault();
                return;
            } else {
                if (mensajeError) mensajeError.classList.add('d-none');
            }

            const presupuestos = obtenerPresupuestos();
            const yaReservado = presupuestos.some(p => 
                p.salonId == presupuesto.salonId && p.fecha === presupuesto.fecha
            );

            if (yaReservado) {
                if (mensajeError) {
                    mensajeError.textContent = 'Este salón ya está reservado para esa fecha.';
                    mensajeError.classList.remove('d-none');
                }
                event.preventDefault();
                return;
            } else {
                if (mensajeError) mensajeError.classList.add('d-none');
            }

            presupuestos.push(presupuesto);
            guardarPresupuestos(presupuestos);

            ultimoPresupuesto = presupuesto;

            generarComprobantePDF(ultimoPresupuesto);

            form.reset();
            form.classList.remove('was-validated');
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalReserva'));
            if (modal) modal.hide();

            event.preventDefault();
            alert('¡Reserva realizada correctamente! El comprobante se descargó automáticamente.');
        });
    }

    
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    const minFecha = `${yyyy}-${mm}-${dd}`;
    const inputFechaEvento = document.getElementById('fechaEvento');
    if (inputFechaEvento) inputFechaEvento.setAttribute('min', minFecha);

    document.getElementById('fechaEvento').addEventListener('input', function() {
        const mensajeError = document.getElementById('mensajeErrorReserva');
        if (mensajeError) mensajeError.classList.add('d-none');
    });
});