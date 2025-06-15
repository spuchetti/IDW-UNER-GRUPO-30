
export function protegerRuta(rolRequerido = null) {
  if (!sessionStorage.getItem('accessToken')) {
    window.location.href = "login.html";
    return;
  }
  if (rolRequerido && sessionStorage.getItem('rol') !== rolRequerido) {
    alert("No tienes permisos para acceder a esta sección.");
    window.location.href = "index.html";
  }
}

protegerRuta('admin');