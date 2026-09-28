/* ============================================
   Kivo — Cálculos del carrito
   Funciones puras: reciben el arreglo del carrito
   y devuelven un resultado, sin modificarlo.
   Cada ítem tiene la forma { ...juego, cantidad }.
   ============================================ */

/** Precio que se cobra: el de oferta si existe, si no el normal. */
export function precioFinal(item) {
  return item.precioOferta ?? item.precio
}

/** Suma las unidades de todos los juegos (el contador del carrito). */
export function contarProductos(carrito) {
  return carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0)
}

/** Suma precio final x cantidad de cada juego (el total a pagar). */
export function calcularTotal(carrito) {
  return carrito.reduce((acumulado, item) => acumulado + precioFinal(item) * item.cantidad, 0)
}

/** Cuánto ahorra el cliente comparando precio normal y precio de oferta. */
export function calcularAhorro(carrito) {
  return carrito.reduce(
    (acumulado, item) => acumulado + (item.precio - precioFinal(item)) * item.cantidad,
    0,
  )
}
