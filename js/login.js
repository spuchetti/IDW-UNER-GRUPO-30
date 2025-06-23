<<<<<<< HEAD:js/login.js
import { login } from './auth.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const recordarCheckbox = document.getElementById('checkbox_recordar');


window.addEventListener('DOMContentLoaded', () => {
  emailInput.value = "admin@idwsa.com";
  passwordInput.value = "admin123";
  recordarCheckbox.checked = true;
});

document.querySelector('form').addEventListener('submit', function(e) {
=======
document.querySelector('form').addEventListener('submit', async function(e) {
>>>>>>> Seba:src/js/login.js
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (res.ok) {
    const data = await res.json();
    sessionStorage.setItem('accessToken', data.token);
    
    if (username === "michaelw") {
      sessionStorage.setItem('rol', 'admin');
      window.location.href = "cpanel.html";
    } else {
      sessionStorage.setItem('rol', 'comun');
      alert("No tienes permisos para acceder al panel de administración.");
      window.location.href = "index.html";
    }
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});