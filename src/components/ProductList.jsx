/* ============================================
   ProductList — Grilla de juegos del catálogo
   Props:
   - juegos: juegos ya filtrados por App.
   - total: cantidad total de juegos del catálogo.
   - carrito: se usa para avisar cuántas unidades ya tiene cada juego.
   - onAgregar: función de App que agrega un juego al carrito.
   Recorre los juegos con .map() y crea una ProductCard por cada uno.
   ============================================ */

import ProductCard from './ProductCard.jsx'

/** Devuelve cuántas unidades de un juego hay en el carrito (0 si no está). */
function unidadesEnCarrito(carrito, id) {
  const item = carrito.find((producto) => producto.id === id)
  return item ? item.cantidad : 0
}

export default function ProductList({ juegos, total, carrito, onAgregar }) {
  // Renderizado condicional: si el filtro no encuentra nada, se muestra un aviso
  // en lugar de una grilla vacía.
  if (juegos.length === 0) {
    return (
      <p className="aviso-dinamico aviso-error mb-0" role="status">
        No hay juegos para esa búsqueda o categoría. Prueba con otro nombre o usa &quot;Limpiar filtros&quot;.
      </p>
    )
  }

  return (
    <>
      <p className="mb-3" role="status">
        {juegos.length === total
          ? `Mostrando los ${total} juegos del catálogo.`
          : `Mostrando ${juegos.length} de ${total} juegos.`}
      </p>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
        {juegos.map((juego) => (
          <div className="col" key={juego.id}>
            <ProductCard
              juego={juego}
              cantidadEnCarrito={unidadesEnCarrito(carrito, juego.id)}
              onAgregar={onAgregar}
            />
          </div>
        ))}
      </div>
    </>
  )
}
