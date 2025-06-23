export const inicializar_presupuestos = () => {
  if (!localStorage.getItem('presupuestos')) {
    localStorage.setItem('presupuestos', JSON.stringify([]));
  }
};