import { estaLogueado } from '/js/auth.js';

export function protegerRuta() {
  if (!estaLogueado()) {
    window.location.href = "login.html";
  }
}