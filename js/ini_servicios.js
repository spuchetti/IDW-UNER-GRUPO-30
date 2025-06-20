export const inicializar_servicios = () => {
    if (!localStorage.getItem('servicios')) {
        const servicios_iniciales = [
            { id: 1, descripcion: "Catering", valor: 2000 },
            { id: 2, descripcion: "DJ", valor: 1500 },
            { id: 3, descripcion: "Decoración", valor: 1000 },
            { id: 4, descripcion: "Fotografía", valor: 2500 },
            { id: 5, descripcion: "Transporte", valor: 3000 },
            { id: 6, descripcion: "Seguridad", valor: 1200 },
            { id: 7, descripcion: "Iluminación", valor: 800 },
            { id: 8, descripcion: "Mobiliario", valor: 500 }
        ];
        localStorage.setItem('servicios', JSON.stringify(servicios_iniciales));
    }
};