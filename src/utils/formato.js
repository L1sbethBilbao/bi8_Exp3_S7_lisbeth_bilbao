/* ============================================
   Kivo — Funciones de formato reutilizables
   ============================================ */

/**
 * Formatea un número como pesos chilenos, por ejemplo 39990 -> "$39.990".
 * Se usa en las cards, en el carrito y en el total.
 */
export function formatearPrecio(valor) {
  return Number(valor).toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  })
}

/**
 * Calcula el porcentaje de descuento entre el precio normal y el de oferta.
 * Devuelve 0 si no hay oferta, para que la insignia no se muestre.
 */
export function calcularDescuento(precio, precioOferta) {
  if (!precioOferta || precioOferta >= precio) {
    return 0
  }
  return Math.round(((precio - precioOferta) / precio) * 100)
}
