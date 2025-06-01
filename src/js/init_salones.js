export const inicializar_salones = () => {
  if (!localStorage.getItem('salones')) {
    const salones_iniciales = [
      {
        id: 1,
        nombre: "Salón Elegante",
        descripcion: "Para bodas y eventos formales.",
        capacidad: 250,
        precio: 5000
      },
      {
        id: 2,
        nombre: "Salón Moderno",
        descripcion: "Con pista de baile e iluminación LED.",
        capacidad: 100,
        precio: 3000
      },
      {
        id: 3,
        nombre: "Salón al Aire Libre",
        descripcion: "Ideal para eventos de día.",
        capacidad: 50,
        precio: 2000
      },
      {
        id: 4,
        nombre: "Salón VIP",
        descripcion: "Ambiente exclusivo con atención premium.",
        capacidad: 30,
        precio: 10000
      }
    ];
    localStorage.setItem('salones', JSON.stringify(salones_iniciales));
  }
};
