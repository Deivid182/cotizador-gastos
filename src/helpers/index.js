export const formatearCantidad = cantidad => {
  return cantidad.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}

export const generarID = () => {
  const random = Math.random().toString(32).substring(2)
  const date = Date.now().toString(32)
  return random + date
}

export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha)
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }

  return fechaNueva.toLocaleDateString('es-ES', opciones)
} 