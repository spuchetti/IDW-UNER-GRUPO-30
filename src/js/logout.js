function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnLogout');
  if (btn) {
    btn.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = "login.html";
    });
  }
});