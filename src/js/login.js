document.querySelector('form').addEventListener('submit', async function(e) {
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
    // Solo michaelw es admin
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