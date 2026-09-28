/* ============================================
   Cart — Carrito de compras
   Props:
   - items: juegos del carrito, cada uno con su cantidad.
   - onAumentar / onDisminuir / onQuitar: cambian un juego.
   - onVaciar: deja el carrito vacío.
   Muestra un mensaje si está vacío; si no, la lista,
   el contador de productos, el ahorro y el total.
   ============================================ */

import CartItem from './CartItem.jsx'
import CartTotal from './CartTotal.jsx'
import { contarProductos, calcularAhorro } from '../utils/carrito.js'
import { formatearPrecio } from '../utils/formato.js'

export default function Cart({ items, onAumentar, onDisminuir, onQuitar, onVaciar }) {
  const cantidad = contarProductos(items)
  const ahorro = calcularAhorro(items)

  return (
    <section id="carrito" className="content-box p-3 p-md-4 carrito-sticky" aria-labelledby="titulo-carrito">
      <h2 id="titulo-carrito" className="h4 d-flex justify-content-between align-items-center">
        <span>Carrito</span>
        {/* Contador de productos del carrito */}
        <span className="badge contador-carrito" aria-live="polite">
          {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
        </span>
      </h2>

      {/* Renderizado condicional principal: carrito vacío o con juegos */}
      {items.length === 0 ? (
        <p className="mb-0">
          Tu carrito está vacío. Agrega un juego con el botón <strong>Agregar al carrito</strong> de cada tarjeta.
        </p>
      ) : (
        <>
          <ul className="list-unstyled d-grid gap-2 mb-3">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onAumentar={onAumentar}
                onDisminuir={onDisminuir}
                onQuitar={onQuitar}
              />
            ))}
          </ul>

          {ahorro > 0 && (
            <p className="ahorro-carrito mb-1">Ahorras {formatearPrecio(ahorro)} con las ofertas.</p>
          )}
          <CartTotal items={items} />

          <button type="button" className="btn btn-kivo-outline btn-sm mt-3 w-100" onClick={onVaciar}>
            Vaciar carrito
          </button>
        </>
      )}
    </section>
  )
}
