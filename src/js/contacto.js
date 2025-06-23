function guardarMensajeContacto(mensaje) {
  const mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
  mensajes.push(mensaje);
  localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.needs-validation');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const mensaje = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      mensaje: form.mensaje.value.trim(),
      fecha: new Date().toLocaleString()
    };
    guardarMensajeContacto(mensaje);

    form.reset();
    form.classList.remove('was-validated');
    event.preventDefault();
    alert('¡Mensaje enviado correctamente!');
  });
});