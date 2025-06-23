import { logout } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnLogout');
  if (btn) {
    btn.addEventListener('click', logout);
  }
});