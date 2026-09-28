/* ============================================
   Kivo — Catálogo de juegos (Semana 7)
   Cada juego tiene lo que pide la actividad:
   nombre, precio normal, precio oferta,
   descripción corta e imagen.
   ============================================ */

/**
 * Arma la ruta de una imagen de public/img.
 * Usa BASE_URL para que funcione igual en local (npm run dev)
 * y en GitHub Pages, donde el sitio vive dentro de /bi8_Exp3_S7_lisbeth_bilbao/.
 */
const rutaImagen = (archivo) => `${import.meta.env.BASE_URL}img/${archivo}`

/** Categorías del navbar y del selector de filtro. */
export const categorias = [
  { id: 'accion', nombre: 'Acción y aventura' },
  { id: 'carreras', nombre: 'Carreras' },
  { id: 'rpg', nombre: 'RPG' },
]

const productos = [
  {
    id: 1,
    nombre: 'Zelda: Echoes of Time',
    precio: 49990,
    precioOferta: 39990,
    categoria: 'accion',
    categoriaNombre: 'Acción y aventura',
    imagen: rutaImagen('juego-echoes.jpg'),
    descripcion: 'Aventura de mundo abierto para Nintendo Switch, con exploración, puzzles y combates en Hyrule.',
  },
  {
    id: 2,
    nombre: 'Templo de las Sombras',
    precio: 29990,
    precioOferta: 23990,
    categoria: 'accion',
    categoriaNombre: 'Acción y aventura',
    imagen: rutaImagen('juego-templo.jpg'),
    descripcion: 'Expansión de acción: mazmorras cortas, jefes y tesoros para completar la colección de Echoes.',
  },
  {
    id: 3,
    nombre: 'Cyber Racers 2099',
    precio: 39990,
    precioOferta: 31990,
    categoria: 'carreras',
    categoriaNombre: 'Carreras',
    imagen: rutaImagen('juego-cyber.jpg'),
    descripcion: 'Carreras futuristas para PC y PlayStation, con circuitos neón y modos multijugador.',
  },
  {
    id: 4,
    nombre: 'Neon Drift League',
    precio: 24990,
    precioOferta: 19990,
    categoria: 'carreras',
    categoriaNombre: 'Carreras',
    imagen: rutaImagen('juego-neon.jpg'),
    descripcion: 'Liga arcade de derrapes en ciudad nocturna. Ideal para partidas rápidas en local o en línea.',
  },
  {
    id: 5,
    nombre: 'Pixel Quest Origins',
    precio: 19990,
    precioOferta: 14990,
    categoria: 'rpg',
    categoriaNombre: 'RPG',
    imagen: rutaImagen('juego-pixelquest.jpg'),
    descripcion: 'RPG clásico en 2D, con historia, turnos y mazmorras en pixel art.',
  },
  {
    id: 6,
    nombre: 'Pixel Quest Legends',
    precio: 22990,
    precioOferta: 18390,
    categoria: 'rpg',
    categoriaNombre: 'RPG',
    imagen: rutaImagen('juego-legends.jpg'),
    descripcion: 'Secuela independiente: nuevas clases, cofres raros y un mapa más grande para coleccionistas.',
  },
]

export default productos
