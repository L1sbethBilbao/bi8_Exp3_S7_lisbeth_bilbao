/* ============================================
   CartItem — Una línea del carrito
   Props:
   - item: juego del carrito con su cantidad.
   - onAumentar: suma una unidad (recibe el juego).
   - onDisminuir: resta una unidad (recibe el id).
   - onQuitar: elimina el juego completo (recibe el id).
   ============================================ */

import { formatearPrecio } from '../utils/formato.js'
import { precioFinal } from '../utils/carrito.js'

export default function CartItem({ item, onAumentar, onDisminuir, onQuitar }) {
  const subtotal = precioFinal(item) * item.cantidad

  return (
    <li className="item-carrito d-flex gap-2 align-items-center">
      <img src={item.imagen} alt="" className="miniatura-carrito" />

      <div className="flex-grow-1">
        <p className="nombre-item mb-0">{item.nombre}</p>
        <p className="small mb-1">
          {formatearPrecio(precioFinal(item))} c/u · Subtotal <strong>{formatearPrecio(subtotal)}</strong>
        </p>

        <div className="d-flex align-items-center gap-1">
          {/* Con 1 unidad, restar equivale a quitar el juego del carrito */}
          <button
            type="button"
            className="btn btn-kivo-outline btn-cantidad"
            onClick={() => onDisminuir(item.id)}
            aria-label={item.cantidad === 1 ? `Quitar ${item.nombre}` : `Restar una unidad de ${item.nombre}`}
          >
            −
          </button>
          <span className="cantidad-item" aria-label={`Cantidad: ${item.cantidad}`}>{item.cantidad}</span>
          <button
            type="button"
            className="btn btn-kivo-outline btn-cantidad"
            onClick={() => onAumentar(item)}
            aria-label={`Sumar una unidad de ${item.nombre}`}
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-quitar btn-sm ms-auto"
            onClick={() => onQuitar(item.id)}
          >
            Quitar
          </button>
        </div>
      </div>
    </li>
  )
}
