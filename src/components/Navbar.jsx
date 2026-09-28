/* ============================================
   Navbar — Barra de navegación de Kivo
   Props:
   - cantidad: total de unidades en el carrito (contador).
   - categorias: lista { id, nombre } para el menú.
   - categoriaActiva: id de la categoría elegida ('' = todas).
   - onElegirCategoria: función de App que cambia la categoría.
   Los enlaces bajan a cada sección de la página (#catalogo, etc.).
   ============================================ */

const RUTA_LOGO = `${import.meta.env.BASE_URL}img/logo.png`

export default function Navbar({ cantidad, categorias, categoriaActiva, onElegirCategoria }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark kivo-navbar sticky-top" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
          <img
            className="kivo-logo"
            src={RUTA_LOGO}
            alt="Logo de Kivo: un zorro con audífonos y un control de videojuegos"
            width="48"
            height="48"
          />
          <span>Kivo</span>
        </a>

        {/* Contador siempre visible, también en celular con el menú cerrado */}
        <a className="btn btn-kivo btn-sm ms-auto me-2 d-lg-none" href="#carrito" aria-label={`Carrito: ${cantidad} productos`}>
          🛒 {cantidad}
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir o cerrar el menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <a className="nav-link" href="#inicio">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#catalogo">Catálogo</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#catalogo"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorías
              </a>
              <ul className="dropdown-menu">
                {categorias.map((cat) => (
                  <li key={cat.id}>
                    {/* onClick: filtra el catálogo; href baja hasta la sección */}
                    <a
                      className={`dropdown-item ${categoriaActiva === cat.id ? 'active' : ''}`}
                      href="#catalogo"
                      onClick={() => onElegirCategoria(cat.id)}
                    >
                      {cat.nombre}
                    </a>
                  </li>
                ))}
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a
                    className={`dropdown-item ${categoriaActiva === '' ? 'active' : ''}`}
                    href="#catalogo"
                    onClick={() => onElegirCategoria('')}
                  >
                    Todas
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto">Contacto</a>
            </li>
            <li className="nav-item d-none d-lg-block">
              {/* Renderizado condicional: singular o plural según la cantidad */}
              <a className="btn btn-kivo btn-sm ms-lg-2" href="#carrito" aria-live="polite">
                🛒 Carrito: <strong>{cantidad}</strong> {cantidad === 1 ? 'producto' : 'productos'}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
