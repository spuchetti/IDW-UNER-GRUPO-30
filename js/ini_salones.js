export const inicializar_salones = () => {
  if (!localStorage.getItem('salones')) {
    const salones_iniciales = [
      {
        id: 1,
        nombre: "Salón Elegante",
        descripcion: "Para bodas y eventos formales.",
        direccion: "Calle Falsa 123",
        capacidad: 250,
        precio: 5000,
        estado: "Disponible",
        imagen: "src/img/salon1.webp"
      },
      {
        id: 2,
        nombre: "Salón Moderno",
        descripcion: "Con pista de baile e iluminación LED.",
        direccion: "Calle Verdadera 456",
        capacidad: 100,
        precio: 3000,
        estado: "Disponible",
        imagen: "src/img/salon2.webp"
      },
      {
        id: 3,
        nombre: "Salón al Aire Libre",
        descripcion: "Ideal para eventos de día.",
        direccion: "Calle Abierta 789",
        capacidad: 50,
        precio: 2000,
        estado: "Disponible",
        imagen: "src/img/salon3.webp"
      },
      {
        id: 4,
        nombre: "Salón VIP",
        descripcion: "Ambiente exclusivo con atención premium.",
        capacidad: 30,
        precio: 10000,
        estado: "Disponible",
        imagen: "src/img/salon4.webp"
      }
    ];
    localStorage.setItem('salones', JSON.stringify(salones_iniciales)); // Guarda los salones iniciales en localStorage
  }
};
