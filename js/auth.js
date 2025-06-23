export function estaLogueado() {
  return !!sessionStorage.getItem('accessToken');
}

export function obtenerRol() {
  return sessionStorage.getItem('rol') || 'comun';
}

export function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}