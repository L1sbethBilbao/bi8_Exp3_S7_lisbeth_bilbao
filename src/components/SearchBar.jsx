/* ============================================
   SearchBar — Buscador y filtro por categoría
   Props:
   - busqueda / onCambiarBusqueda: texto y función de App.
   - categoria / onCambiarCategoria: categoría y función de App.
   - categorias: opciones del selector.
   - onLimpiar: vuelve a mostrar todo el catálogo.
   Son campos controlados: su valor viene del estado de App
   y cada tecla dispara onChange, que filtra al instante.
   ============================================ */

export default function SearchBar({
  busqueda,
  onCambiarBusqueda,
  categoria,
  onCambiarCategoria,
  categorias,
  onLimpiar,
}) {
  const hayFiltros = busqueda !== '' || categoria !== ''

  return (
    // onSubmit con preventDefault: presionar Enter no recarga la página.
    <form className="search-form mb-3" role="search" onSubmit={(evento) => evento.preventDefault()}>
      <div className="row g-2 align-items-end">
        <div className="col-12 col-md-7">
          <label className="form-label" htmlFor="campo-busqueda">Buscar juego</label>
          <input
            className="form-control"
            id="campo-busqueda"
            type="search"
            placeholder="Nombre o categoría, ejemplo: Zelda o RPG"
            value={busqueda}
            onChange={(evento) => onCambiarBusqueda(evento.target.value)}
          />
        </div>
        <div className="col-12 col-md-5">
          <label className="form-label" htmlFor="filtro-categoria">Categoría</label>
          <select
            className="form-select"
            id="filtro-categoria"
            value={categoria}
            onChange={(evento) => onCambiarCategoria(evento.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Renderizado condicional: el botón solo aparece si hay filtros activos */}
      {hayFiltros && (
        <button type="button" className="btn btn-kivo-outline btn-sm mt-2" onClick={onLimpiar}>
          Limpiar filtros
        </button>
      )}
    </form>
  )
}
