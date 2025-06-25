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

    // Obtener datos completos del usuario para saber el rol
    const userRes = await fetch(`https://dummyjson.com/users/${data.id}`);
    const userData = await userRes.json();

    if (userData.role === "admin") {
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





// Explicación sencilla del proceso de autenticación para resumir

// 1. Formulario de Login
// El usuario ingresa su nombre de usuario y contraseña en la página de login.

// 2. Archivo principal: login.js
// Cuando el usuario envía el formulario, este archivo:
// Captura el evento y evita que la página se recargue.
// Toma los valores del usuario y contraseña.

// 3. Validación con la API
// Se hace una solicitud POST a https://dummyjson.com/auth/login usando fetch, enviando los datos del usuario.
// Si la respuesta es correcta:
// Se guarda el token recibido en sessionStorage como accessToken.
// Se hace otra consulta a la API para obtener los datos completos del usuario y saber su rol (admin o común).

// 4. Control de acceso según el rol
// Si el usuario es admin:
// Se guarda el rol en sessionStorage y se redirige al panel de administración (cpanel.html).
// Si el usuario es común:
// Se guarda el rol, se muestra un mensaje de advertencia y se redirige a la página principal (index.html).