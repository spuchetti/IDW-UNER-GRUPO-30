import { login } from 'auth.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const recordarCheckbox = document.getElementById('checkbox_recordar');


window.addEventListener('DOMContentLoaded', () => {
  emailInput.value = "admin@idwsa.com";
  passwordInput.value = "admin123";
  recordarCheckbox.checked = true;
});

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (recordarCheckbox.checked) {
    localStorage.setItem('loginRecordado', JSON.stringify({ email, password }));
  } else {
    localStorage.removeItem('loginRecordado');
  }

  if (login(email, password)) {
    window.location.href = "cpanel.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});