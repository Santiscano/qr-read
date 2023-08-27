/**
 * metodo transformacion de fecha de 2023-05-10T15:11:14.000Z a 10 de mayo, 0:55 p. m.
 * @param fecha 2023-05-10T15:11:14.000Z
 * @returns 10 de mayo, 0:55 p. m.
 */
export function formatearFecha(fecha) {
  const fecha_dt = new Date(fecha);
  const opciones = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  // @ts-ignore
  const fecha_formateada = fecha_dt.toLocaleString('es-ES', opciones);
  return fecha_formateada;
}
