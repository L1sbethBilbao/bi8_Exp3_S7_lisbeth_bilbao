/* ============================================
   CartTotal — Total a pagar del carrito
   Props:
   - items: juegos del carrito.
   Suma precio de oferta x cantidad con calcularTotal (reduce).
   ============================================ */

import { calcularTotal } from '../utils/carrito.js'
import { formatearPrecio } from '../utils/formato.js'

export default function CartTotal({ items }) {
  return (
    <p className="total-carrito d-flex justify-content-between mb-0">
      <span>Total:</span>
      <strong>{formatearPrecio(calcularTotal(items))}</strong>
    </p>
  )
}
