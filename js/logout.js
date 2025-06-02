import { logout } from '/js/auth.js';

const btn = document.getElementById('logoutBtn');
if (btn) {
  btn.addEventListener('click', () => {
    logout();
    window.location.href = "login.html";
  });
}