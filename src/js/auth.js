
const usuarioDemo = {
  email: "admin@idwsa.com",
  password: "admin123"
};


if (!localStorage.getItem('usuario')) {
  localStorage.setItem('usuario', JSON.stringify(usuarioDemo));
}


export function login(email, password) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (usuario && usuario.email === email && usuario.password === password) {
    sessionStorage.setItem('logueado', 'true');
    return true;
  }
  return false;
}

export function estaLogueado() {
  return sessionStorage.getItem('logueado') === 'true';
}


export function logout() {
  sessionStorage.removeItem('logueado');
}