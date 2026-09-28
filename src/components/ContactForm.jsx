/* ============================================
   ContactForm — Formulario de contacto de Kivo
   Estado propio con useState:
   - datos: valores de los campos (campos controlados).
   - estado: 'inactivo' | 'enviando' | 'exito' | 'error'.
   - mensaje: texto que se muestra según el estado.
   El envío se simula con una promesa (como en la semana 6):
   el correo falla@kivo.cl fuerza el error para probarlo.
   ============================================ */

import { useState } from 'react'

const DATOS_INICIALES = {
  nombre: '',
  email: '',
  asunto: 'consulta',
  novedades: '',
  mensaje: '',
}

const LARGO_MAXIMO = 300

/**
 * Revisa los datos antes de enviar.
 * Devuelve el texto del primer error o '' si todo está bien.
 */
function validarDatos(datos) {
  if (!datos.nombre.trim()) return 'Escribe tu nombre para enviar el mensaje.'
  if (!/^\S+@\S+\.\S+$/.test(datos.email.trim())) return 'Ingresa un correo electrónico válido, por ejemplo nombre@correo.com.'
  if (!datos.novedades) return 'Indica si deseas recibir novedades.'
  if (!datos.mensaje.trim()) return 'El mensaje no puede quedar vacío.'
  return ''
}

/**
 * Simula el envío a un servidor: espera 1,5 segundos.
 * Resuelve si todo está bien y rechaza si el correo es falla@kivo.cl.
 */
function enviarSimulado(datos) {
  return new Promise((resolver, rechazar) => {
    setTimeout(() => {
      if (datos.email.trim().toLowerCase() === 'falla@kivo.cl') {
        rechazar(new Error('El servidor no respondió. Inténtalo de nuevo.'))
        return
      }
      resolver(datos)
    }, 1500)
  })
}

export default function ContactForm() {
  const [datos, setDatos] = useState(DATOS_INICIALES)
  const [estado, setEstado] = useState('inactivo')
  const [mensaje, setMensaje] = useState('')

  const enviando = estado === 'enviando'

  /**
   * onChange compartido por todos los campos:
   * usa el atributo name para saber qué dato actualizar.
   */
  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setDatos((prev) => ({ ...prev, [name]: value }))
  }

  /** onSubmit: valida, muestra "Enviando..." y espera la promesa. */
  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const error = validarDatos(datos)
    if (error) {
      setEstado('error')
      setMensaje(error)
      return
    }

    setEstado('enviando')
    setMensaje('Enviando tu mensaje...')

    enviarSimulado(datos)
      .then((respuesta) => {
        setEstado('exito')
        setMensaje(`Gracias, ${respuesta.nombre}. Recibimos tu mensaje y te responderemos a ${respuesta.email}.`)
        setDatos(DATOS_INICIALES)
      })
      .catch((errorEnvio) => {
        setEstado('error')
        setMensaje(`No se pudo enviar el mensaje: ${errorEnvio.message}`)
      })
  }

  /** Clases del aviso según el estado del envío. */
  const claseAviso = {
    enviando: 'aviso-carga',
    exito: 'aviso-exito',
    error: 'aviso-error',
  }[estado]

  return (
    <section id="contacto" className="content-box p-3 p-md-4 mt-4" aria-labelledby="contacto-titulo">
      <h2 id="contacto-titulo">Contacto</h2>
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <form className="contact-form" onSubmit={manejarEnvio} noValidate>
            <fieldset className="p-3" disabled={enviando}>
              <legend className="float-none w-auto px-2">Datos del mensaje</legend>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="nombre">Nombre:</label>
                  <input className="form-control" id="nombre" name="nombre" type="text" value={datos.nombre} onChange={manejarCambio} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="email">Correo electrónico:</label>
                  <input className="form-control" id="email" name="email" type="email" placeholder="ejemplo@correo.com" value={datos.email} onChange={manejarCambio} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="asunto">Asunto:</label>
                  <select className="form-select" id="asunto" name="asunto" value={datos.asunto} onChange={manejarCambio}>
                    <option value="consulta">Consulta general</option>
                    <option value="pedido">Estado de pedido</option>
                    <option value="soporte">Soporte técnico</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <p className="form-label mb-2">¿Deseas recibir novedades?</p>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="novedades" id="novedades-si" value="si" checked={datos.novedades === 'si'} onChange={manejarCambio} />
                    <label className="form-check-label" htmlFor="novedades-si">Sí</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="novedades" id="novedades-no" value="no" checked={datos.novedades === 'no'} onChange={manejarCambio} />
                    <label className="form-check-label" htmlFor="novedades-no">No</label>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="mensaje">Mensaje:</label>
                  <textarea className="form-control" id="mensaje" name="mensaje" rows="4" maxLength={LARGO_MAXIMO} value={datos.mensaje} onChange={manejarCambio}></textarea>
                  {/* Contador que se actualiza con cada tecla (onChange) */}
                  <p className="form-text text-end mb-0">{datos.mensaje.length}/{LARGO_MAXIMO} caracteres</p>
                </div>
                <div className="col-12">
                  <button className="btn btn-kivo" type="submit">
                    {enviando ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </div>
            </fieldset>
          </form>

          {/* Renderizado condicional: el aviso solo existe si hubo un intento de envío */}
          {estado !== 'inactivo' && (
            <p className={`aviso-dinamico ${claseAviso} mt-3 mb-0`} role="status" aria-live="polite">
              {enviando && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
              {mensaje}
            </p>
          )}
        </div>

        <div className="col-12 col-lg-4">
          <h3 className="h5 subtitulo-contacto">Información de contacto</h3>
          <p className="mb-1">Teléfono: +56 9 1234 5678</p>
          <p className="mb-1">Email: <a href="mailto:hola@kivo.cl">hola@kivo.cl</a></p>
          <p className="mb-3">Instagram: <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">@kivo</a></p>
          <h3 className="h5 subtitulo-contacto">Ubicación</h3>
          <p className="mb-0">Av. Gamer 123, Santiago, Chile</p>
        </div>
      </div>
    </section>
  )
}
