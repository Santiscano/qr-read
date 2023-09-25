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

export function formaterDate(fecha){
  const fecha_formateada = new Date(fecha).toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  return fecha_formateada
}

