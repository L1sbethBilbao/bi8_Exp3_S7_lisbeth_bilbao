/* ============================================
   ProductCard — Tarjeta reutilizable de un juego
   Props:
   - juego: { nombre, precio, precioOferta, descripcion, imagen, categoriaNombre }.
   - cantidadEnCarrito: unidades de este juego ya agregadas.
   - onAgregar: función que recibe el juego y lo suma al carrito.
   Se escribe una sola vez y se repite por cada juego del catálogo.
   ============================================ */

import { formatearPrecio, calcularDescuento } from '../utils/formato.js'

export default function ProductCard({ juego, cantidadEnCarrito, onAgregar }) {
  const { nombre, precio, precioOferta, descripcion, imagen, categoriaNombre } = juego
  const descuento = calcularDescuento(precio, precioOferta)

  return (
    <article className="card h-100 kivo-card">
      <div className="position-relative">
        <img className="card-img-top" src={imagen} alt={`Portada del juego ${nombre}`} />
        {/* Renderizado condicional: la insignia solo aparece si hay descuento */}
        {descuento > 0 && (
          <span className="badge insignia-descuento position-absolute top-0 end-0 m-2">-{descuento}%</span>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <p className="categoria-producto mb-1">{categoriaNombre}</p>
        <h3 className="card-title h5">{nombre}</h3>
        <p className="card-text flex-grow-1">{descripcion}</p>

        <div className="d-flex align-items-baseline gap-2 mb-2">
          {descuento > 0 && (
            <span className="precio-normal" aria-label={`Precio normal ${formatearPrecio(precio)}`}>
              {formatearPrecio(precio)}
            </span>
          )}
          <span className="precio-producto fs-5" aria-label={`Precio oferta ${formatearPrecio(precioOferta)}`}>
            {formatearPrecio(precioOferta)}
          </span>
        </div>

        {/* onClick: envía este juego a la función agregarAlCarrito de App */}
        <button type="button" className="btn btn-kivo" onClick={() => onAgregar(juego)}>
          Agregar al carrito
        </button>

        {/* Renderizado condicional: aviso solo si el juego ya está en el carrito */}
        {cantidadEnCarrito > 0 && (
          <p className="en-carrito small mt-2 mb-0">
            ✔ Tienes {cantidadEnCarrito} {cantidadEnCarrito === 1 ? 'unidad' : 'unidades'} en tu carrito
          </p>
        )}
      </div>
    </article>
  )
}
