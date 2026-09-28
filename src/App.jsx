/* ============================================
   Kivo — Componente principal App (Semana 7)
   Aquí vive el estado de la tienda (useState):
   el carrito, el texto de búsqueda y la categoría.
   App pasa los datos y las funciones a los demás
   componentes por props (flujo de arriba hacia abajo).
   ============================================ */

import { useEffect, useState } from 'react'
import productos, { categorias } from './data/productos.js'
import { contarProductos } from './utils/carrito.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import SearchBar from './components/SearchBar.jsx'
import ProductList from './components/ProductList.jsx'
import Cart from './components/Cart.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'

const CLAVE_CARRITO = 'kivoCarrito'

/**
 * Lee el carrito guardado en localStorage al abrir la página.
 * Si no hay datos o están dañados, parte con el carrito vacío.
 */
function leerCarritoGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO))
    return Array.isArray(guardado) ? guardado : []
  } catch {
    return []
  }
}

export default function App() {
  // Estado del carrito: cada ítem es { ...juego, cantidad }.
  // Se pasa una función a useState para leer localStorage solo una vez.
  const [carrito, setCarrito] = useState(leerCarritoGuardado)
  // Estado de los filtros del catálogo.
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')

  // useEffect: cada vez que cambia el carrito se guarda en localStorage,
  // así no se pierde al recargar la página.
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
  }, [carrito])

  /**
   * Agrega un juego al carrito.
   * Si ya estaba, suma una unidad; si no, lo agrega con cantidad 1.
   * Se usa el estado anterior (prev) para no perder cambios.
   */
  const agregarAlCarrito = (juego) => {
    setCarrito((prev) => {
      const existe = prev.some((item) => item.id === juego.id)
      if (existe) {
        return prev.map((item) =>
          item.id === juego.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        )
      }
      return [...prev, { ...juego, cantidad: 1 }]
    })
  }

  /**
   * Resta una unidad de un juego.
   * Si queda en 0, el juego sale del carrito.
   */
  const disminuirCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0),
    )
  }

  /** Elimina un juego completo del carrito, sin importar su cantidad. */
  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  /** Deja el carrito vacío. */
  const vaciarCarrito = () => {
    setCarrito([])
  }

  /** Limpia la búsqueda y la categoría para volver a ver todo el catálogo. */
  const limpiarFiltros = () => {
    setBusqueda('')
    setCategoria('')
  }

  // Juegos que se muestran: se filtran por categoría y por texto
  // (nombre, categoría o descripción) sin modificar el arreglo original.
  const texto = busqueda.trim().toLowerCase()
  const productosFiltrados = productos.filter((juego) => {
    const coincideCategoria = !categoria || juego.categoria === categoria
    const contenido = `${juego.nombre} ${juego.categoriaNombre} ${juego.descripcion}`.toLowerCase()
    const coincideTexto = !texto || contenido.includes(texto)
    return coincideCategoria && coincideTexto
  })

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        cantidad={contarProductos(carrito)}
        categorias={categorias}
        categoriaActiva={categoria}
        onElegirCategoria={setCategoria}
      />

      <Hero destacados={productos.slice(0, 3)} />

      <main className="container py-4 flex-grow-1">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <section id="catalogo" className="content-box p-3 p-md-4" aria-labelledby="catalogo-titulo">
              <h2 id="catalogo-titulo">Catálogo de juegos</h2>
              <SearchBar
                busqueda={busqueda}
                onCambiarBusqueda={setBusqueda}
                categoria={categoria}
                onCambiarCategoria={setCategoria}
                categorias={categorias}
                onLimpiar={limpiarFiltros}
              />
              <ProductList
                juegos={productosFiltrados}
                total={productos.length}
                carrito={carrito}
                onAgregar={agregarAlCarrito}
              />
            </section>
          </div>

          <aside className="col-12 col-lg-4" aria-label="Carrito de compras">
            <Cart
              items={carrito}
              onAumentar={agregarAlCarrito}
              onDisminuir={disminuirCantidad}
              onQuitar={quitarDelCarrito}
              onVaciar={vaciarCarrito}
            />
          </aside>
        </div>

        <ContactForm />
      </main>

      <Footer />
    </div>
  )
}
