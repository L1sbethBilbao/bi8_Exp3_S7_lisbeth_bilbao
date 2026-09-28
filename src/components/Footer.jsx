/* ============================================
   Footer — Pie de página de Kivo
   Componente sin props ni estado: solo muestra
   los datos de contacto y el enlace para subir.
   ============================================ */

export default function Footer() {
  return (
    <footer className="site-footer mt-auto py-3">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-center text-md-start">
        <p className="mb-0">Kivo — Av. Gamer 123, Santiago, Chile</p>
        <p className="mb-0">Teléfono: +56 9 1234 5678</p>
        <p className="mb-0">
          Redes:{' '}
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          {' — '}
          <a href="mailto:hola@kivo.cl">hola@kivo.cl</a>
        </p>
        <p className="mb-0"><a href="#inicio">Volver arriba</a></p>
      </div>
    </footer>
  )
}
