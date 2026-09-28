/* ============================================
   Kivo — JavaScript Semana 6
   Archivo externo (buena práctica de la clase).
   Se carga al final del body en cada página.
   Estilo de la clase: funciones reutilizables,
   let/const, addEventListener, createElement,
   appendChild, Fetch GET + .then/.catch/.finally.
   Sugerencia S5: envío del formulario simulado
   con una promesa y estados de respuesta.
   ============================================ */

const URL_CATALOGO = "assets/data/productos.json";
const CLAVE_CARRITO = "kivoCarrito";

let catalogoCompleto = [];
let filtroTexto = "";
let filtroCategoria = "";
let idProductoModal = 0;

/**
 * Punto de entrada.
 * Flujo: espera a que el DOM esté listo y configura
 * solo las funciones de la página actual.
 */
function iniciarSitio() {
    configurarOfertaInicio();
    configurarCatalogo();
    configurarBusqueda();
    configurarCategorias();
    configurarCarrito();
    configurarModalDetalle();
    configurarFormulario();
}

/**
 * Evento click en Inicio.
 * Flujo: busca el botón de oferta y, si existe,
 * escucha el clic para mostrar el aviso dinámico.
 */
function configurarOfertaInicio() {
    const botonOferta = document.getElementById("btn-oferta");

    if (!botonOferta) {
        return;
    }

    botonOferta.addEventListener("click", mostrarOferta);
}

/**
 * Manipula el DOM en Inicio.
 * Flujo: cambia un texto con innerHTML y crea un aviso
 * nuevo con createElement + appendChild.
 */
function mostrarOferta() {
    const textoOferta = document.getElementById("texto-oferta");
    const textoBienvenida = document.getElementById("texto-bienvenida");
    const avisoOferta = document.getElementById("aviso-oferta");

    if (textoOferta) {
        textoOferta.innerHTML = "Oferta activa: 20% de descuento en juegos destacados de la semana.";
    }

    if (textoBienvenida) {
        textoBienvenida.innerHTML = "Aprovecha la oferta de Kivo: el juego encuentra su lugar, ahora con descuento.";
    }

    if (!avisoOferta) {
        return;
    }

    limpiarContenedor(avisoOferta);

    const aviso = document.createElement("p");
    aviso.className = "aviso-dinamico aviso-exito mb-0";
    aviso.innerHTML = "Zelda: Echoes of Time, Cyber Racers 2099 y Pixel Quest Origins participan en la promoción.";
    avisoOferta.appendChild(aviso);
}

/**
 * Cambia estilos al pasar el mouse.
 * Flujo: guarda el borde original, lo cambia al entrar
 * y lo restaura al salir. No usa solo CSS :hover.
 */
function aplicarEfectoMouse(tarjeta) {
    if (!tarjeta) {
        return;
    }

    const bordeOriginal = tarjeta.style.borderColor;

    tarjeta.addEventListener("mouseover", function () {
        tarjeta.style.borderColor = "#ff7a18";
        tarjeta.style.boxShadow = "0 0 16px rgba(255, 122, 24, 0.55)";
        tarjeta.style.transform = "scale(1.03)";
    });

    tarjeta.addEventListener("mouseout", function () {
        tarjeta.style.borderColor = bordeOriginal;
        tarjeta.style.boxShadow = "";
        tarjeta.style.transform = "";
    });
}

/**
 * Prepara el catálogo de Inicio y Productos.
 * Flujo: si existe el contenedor, lee ?categoria= de la URL,
 * carga el JSON al iniciar y escucha el botón Recargar.
 */
function configurarCatalogo() {
    const catalogo = document.getElementById("catalogo-productos");

    if (!catalogo) {
        return;
    }

    const parametros = new URLSearchParams(window.location.search);
    const categoriaUrl = parametros.get("categoria");

    if (categoriaUrl) {
        filtroCategoria = categoriaUrl;
    }

    const botonCatalogo = document.getElementById("btn-cargar-catalogo");

    if (botonCatalogo) {
        botonCatalogo.addEventListener("click", cargarProductos);
    }

    cargarProductos();
}

/**
 * Fetch GET al JSON local (criterios 5 y 6, ejemplo index4).
 * Flujo de la promesa (diapositiva 5 de la clase):
 * pending = "Cargando...", fulfilled = cards, rejected = error.
 * Se usa .then / .catch / .finally, no async/await.
 */
function cargarProductos() {
    const estado = document.getElementById("estado-catalogo");
    const catalogo = document.getElementById("catalogo-productos");
    const botonCatalogo = document.getElementById("btn-cargar-catalogo");

    if (botonCatalogo) {
        botonCatalogo.disabled = true;
    }

    if (estado) {
        estado.innerHTML = "Cargando productos desde el JSON local...";
        estado.className = "mt-3 mb-0 aviso-dinamico aviso-carga";
    }

    if (catalogo) {
        limpiarContenedor(catalogo);
    }

    fetch(URL_CATALOGO)
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("No se pudo cargar el catálogo (código " + respuesta.status + ").");
            }
            return respuesta.json();
        })
        .then(function (productos) {
            if (!Array.isArray(productos) || productos.length === 0) {
                throw new Error("El archivo JSON no devolvió productos.");
            }
            catalogoCompleto = productos;
            pintarCatalogoFiltrado();
        })
        .catch(function (error) {
            catalogoCompleto = [];
            mostrarErrorCatalogo(error.message);
        })
        .finally(function () {
            if (botonCatalogo) {
                botonCatalogo.disabled = false;
            }
        });
}

/**
 * Aplica búsqueda y categoría sobre el arreglo cargado.
 * Flujo: no vuelve a pedir el JSON; solo filtra y vuelve a pintar.
 */
function pintarCatalogoFiltrado() {
    const catalogo = document.getElementById("catalogo-productos");
    const estado = document.getElementById("estado-catalogo");

    if (!catalogo) {
        return;
    }

    const filtrados = obtenerProductosFiltrados();
    limpiarContenedor(catalogo);

    if (filtrados.length === 0) {
        if (estado) {
            estado.innerHTML = "No hay juegos para esa búsqueda o categoría. Prueba con otro nombre.";
            estado.className = "mt-3 mb-0 aviso-dinamico aviso-error";
        }
        return;
    }

    let indice = 0;
    while (indice < filtrados.length) {
        const tarjeta = crearTarjetaProducto(filtrados[indice]);
        catalogo.appendChild(tarjeta);
        indice = indice + 1;
    }

    if (estado) {
        const etiqueta = filtrados.length === 1 ? "juego creado" : "juegos creados";
        estado.innerHTML = "Catálogo cargado: " + filtrados.length + " " + etiqueta + " con createElement y appendChild.";
        estado.className = "mt-3 mb-0 aviso-dinamico aviso-exito";
    }
}

/**
 * Devuelve el arreglo filtrado por texto y categoría.
 * Flujo: compara nombre, categoría y descripción en minúsculas.
 */
function obtenerProductosFiltrados() {
    const texto = filtroTexto.toLowerCase();
    const resultado = [];
    let indice = 0;

    while (indice < catalogoCompleto.length) {
        const producto = catalogoCompleto[indice];
        const coincideCategoria = !filtroCategoria || producto.categoria === filtroCategoria;
        const textoProducto = (producto.nombre + " " + producto.categoriaNombre + " " + producto.descripcion).toLowerCase();
        const coincideTexto = !texto || textoProducto.indexOf(texto) !== -1;

        if (coincideCategoria && coincideTexto) {
            resultado.push(producto);
        }

        indice = indice + 1;
    }

    return resultado;
}

/**
 * Crea una card de producto (patrón index5 / guía e-commerce).
 * Flujo: createElement de columna, article, imagen, textos y
 * botones; click agrega al carrito o abre el modal.
 */
function crearTarjetaProducto(producto) {
    const columna = document.createElement("div");
    columna.className = "col";

    const articulo = document.createElement("article");
    articulo.className = "card h-100 kivo-card";

    const imagen = document.createElement("img");
    imagen.className = "card-img-top";
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body d-flex flex-column";

    const titulo = document.createElement("h3");
    titulo.className = "card-title h5";
    titulo.innerHTML = producto.nombre;

    const precio = document.createElement("p");
    precio.className = "card-text precio-producto";
    precio.innerHTML = "Precio: " + formatearPrecio(producto.precio);

    const categoria = document.createElement("p");
    categoria.className = "card-text flex-grow-1";
    categoria.innerHTML = "Categoría: " + producto.categoriaNombre;

    const acciones = document.createElement("div");
    acciones.className = "d-flex flex-wrap gap-2 mt-2";

    const botonAgregar = document.createElement("button");
    botonAgregar.type = "button";
    botonAgregar.className = "btn btn-kivo btn-sm";
    botonAgregar.innerHTML = "Agregar al carrito";
    botonAgregar.addEventListener("click", function () {
        agregarAlCarrito(producto.id);
    });

    const botonDetalle = document.createElement("button");
    botonDetalle.type = "button";
    botonDetalle.className = "btn btn-kivo-outline btn-sm";
    botonDetalle.innerHTML = "Ver detalle";
    botonDetalle.addEventListener("click", function () {
        abrirModalDetalle(producto.id);
    });

    acciones.appendChild(botonAgregar);
    acciones.appendChild(botonDetalle);
    cuerpo.appendChild(titulo);
    cuerpo.appendChild(precio);
    cuerpo.appendChild(categoria);
    cuerpo.appendChild(acciones);
    articulo.appendChild(imagen);
    articulo.appendChild(cuerpo);
    columna.appendChild(articulo);

    aplicarEfectoMouse(articulo);

    return columna;
}

/**
 * Manejo de error de Fetch (promesa rejected).
 * Flujo: muestra el motivo en la página, no solo en consola.
 */
function mostrarErrorCatalogo(mensaje) {
    const estado = document.getElementById("estado-catalogo");

    if (!estado) {
        return;
    }

    estado.innerHTML = "No pudimos cargar los juegos. " + mensaje + " Revisa el archivo JSON o tu conexión e inténtalo de nuevo.";
    estado.className = "mt-3 mb-0 aviso-dinamico aviso-error";
}

/**
 * Evento submit del formulario de búsqueda (criterio 4).
 * Flujo: preventDefault para no recargar; filtra el catálogo.
 */
function configurarBusqueda() {
    const formulario = document.getElementById("formulario-busqueda");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        const campo = document.getElementById("campo-busqueda");
        filtroTexto = campo ? campo.value.trim() : "";
        pintarCatalogoFiltrado();
    });
}

/**
 * Categorías simuladas del navbar (criterio 2).
 * Flujo: si el catálogo está en la página, filtra aquí.
 * Si no (Contacto), deja el enlace a Productos.
 */
function configurarCategorias() {
    const enlaces = document.getElementsByClassName("filtro-categoria");
    let indice = 0;

    while (indice < enlaces.length) {
        enlaces[indice].addEventListener("click", function (evento) {
            const destino = document.getElementById("catalogo-productos");
            const categoria = evento.currentTarget.getAttribute("data-categoria") || "";

            if (!destino) {
                return;
            }

            evento.preventDefault();
            filtroCategoria = categoria;
            pintarCatalogoFiltrado();
        });
        indice = indice + 1;
    }
}

/**
 * Muestra el resumen del carrito al cargar la página.
 */
function configurarCarrito() {
    const resumen = document.getElementById("resumen-carrito");
    const botonVaciar = document.getElementById("btn-vaciar-carrito");

    if (!resumen) {
        return;
    }

    if (botonVaciar) {
        botonVaciar.addEventListener("click", vaciarCarrito);
    }

    pintarResumenCarrito();
}

/**
 * Vacía el carrito con un clic.
 * Flujo: borra sessionStorage y vuelve a pintar el aside vacío.
 */
function vaciarCarrito() {
    guardarCarrito([]);
    pintarResumenCarrito();
}

/**
 * Evento click: agrega un juego al carrito (criterio 3).
 * Flujo: busca el producto, suma cantidad y pinta el resumen.
 */
function agregarAlCarrito(idProducto) {
    const producto = buscarProductoPorId(idProducto);

    if (!producto) {
        return;
    }

    const carrito = leerCarrito();
    let indice = 0;
    let encontrado = false;

    while (indice < carrito.length) {
        if (carrito[indice].id === producto.id) {
            carrito[indice].cantidad = carrito[indice].cantidad + 1;
            encontrado = true;
            break;
        }
        indice = indice + 1;
    }

    if (!encontrado) {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    pintarResumenCarrito();
}

/**
 * Pinta el resumen del carrito con createElement y appendChild.
 * Flujo: limpia el área, lista cada ítem y muestra el total.
 */
function pintarResumenCarrito() {
    const resumen = document.getElementById("resumen-carrito");
    const estado = document.getElementById("estado-carrito");
    const totalCaja = document.getElementById("total-carrito");

    if (!resumen) {
        return;
    }

    const carrito = leerCarrito();
    limpiarContenedor(resumen);

    const botonVaciar = document.getElementById("btn-vaciar-carrito");

    if (carrito.length === 0) {
        if (estado) {
            estado.innerHTML = "Tu carrito está vacío. Agrega un juego con el botón de cada card.";
        }
        if (totalCaja) {
            totalCaja.innerHTML = "";
        }
        if (botonVaciar) {
            botonVaciar.disabled = true;
        }
        return;
    }

    if (botonVaciar) {
        botonVaciar.disabled = false;
    }

    if (estado) {
        estado.innerHTML = "Resumen de tu compra (se actualiza al hacer clic en Agregar al carrito):";
    }

    const lista = document.createElement("ul");
    lista.className = "lista-carrito mb-2";

    let total = 0;
    let indice = 0;

    while (indice < carrito.length) {
        const item = carrito[indice];
        const subtotal = item.precio * item.cantidad;
        total = total + subtotal;

        const linea = document.createElement("li");
        linea.innerHTML = item.nombre + " x" + item.cantidad + " — " + formatearPrecio(subtotal);
        lista.appendChild(linea);
        indice = indice + 1;
    }

    resumen.appendChild(lista);

    if (totalCaja) {
        totalCaja.innerHTML = "Total: " + formatearPrecio(total);
    }
}

/**
 * Lee el carrito guardado en sessionStorage.
 * Flujo: si no hay datos, devuelve un arreglo vacío.
 */
function leerCarrito() {
    const texto = sessionStorage.getItem(CLAVE_CARRITO);

    if (!texto) {
        return [];
    }

    try {
        const datos = JSON.parse(texto);
        if (Array.isArray(datos)) {
            return datos;
        }
        return [];
    } catch (error) {
        return [];
    }
}

/**
 * Guarda el carrito para que Inicio y Productos compartan el resumen.
 */
function guardarCarrito(carrito) {
    sessionStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

/**
 * Busca un producto del catálogo por id.
 */
function buscarProductoPorId(idProducto) {
    let indice = 0;

    while (indice < catalogoCompleto.length) {
        if (catalogoCompleto[indice].id === idProducto) {
            return catalogoCompleto[indice];
        }
        indice = indice + 1;
    }

    return null;
}

/**
 * Modal de detalle (extra de clase: index5 / index6).
 * Flujo: el botón Ver detalle llena el body y llama a show().
 */
function configurarModalDetalle() {
    const botonModal = document.getElementById("btn-modal-agregar");

    if (!botonModal) {
        return;
    }

    botonModal.addEventListener("click", function () {
        if (idProductoModal) {
            agregarAlCarrito(idProductoModal);
        }
    });
}

/**
 * Abre el modal con los datos del juego (guía figura 6).
 */
function abrirModalDetalle(idProducto) {
    const producto = buscarProductoPorId(idProducto);
    const cuerpo = document.getElementById("modal-detalle-cuerpo");
    const titulo = document.getElementById("modal-detalle-titulo");
    const modalEl = document.getElementById("modal-detalle");

    if (!producto || !cuerpo || !modalEl) {
        return;
    }

    idProductoModal = producto.id;

    if (titulo) {
        titulo.innerHTML = producto.nombre;
    }

    limpiarContenedor(cuerpo);

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.className = "img-fluid rounded mb-3";

    const descripcion = document.createElement("p");
    descripcion.innerHTML = producto.descripcion;

    const precio = document.createElement("p");
    precio.className = "precio-producto";
    precio.innerHTML = "Precio: " + formatearPrecio(producto.precio);

    const categoria = document.createElement("p");
    categoria.innerHTML = "Categoría: " + producto.categoriaNombre;

    cuerpo.appendChild(imagen);
    cuerpo.appendChild(descripcion);
    cuerpo.appendChild(precio);
    cuerpo.appendChild(categoria);

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}

/**
 * Formatea el precio en pesos chilenos, como en la demo de clase.
 */
function formatearPrecio(valor) {
    return "$" + Number(valor).toLocaleString("es-CL");
}

/**
 * Evento submit del formulario de Contacto.
 * Flujo: si existe el form, escucha submit y evita
 * que la página se recargue (preventDefault de la guía).
 */
function configurarFormulario() {
    const formulario = document.getElementById("formulario-contacto");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", validarFormulario);
}

/**
 * Valida el formulario (truthy/falsy).
 * Flujo: si falta un dato muestra error y no dispara la promesa;
 * si todo está correcto inicia el envío asíncrono.
 */
function validarFormulario(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    const novedadesSi = document.getElementById("novedades-si");
    const novedadesNo = document.getElementById("novedades-no");

    const valorNombre = nombre ? nombre.value.trim() : "";
    const valorEmail = email ? email.value.trim() : "";
    const valorMensaje = mensaje ? mensaje.value.trim() : "";
    const eligioNovedades = (novedadesSi && novedadesSi.checked) || (novedadesNo && novedadesNo.checked);

    if (!valorNombre) {
        mostrarMensajeFormulario("Escribe tu nombre para enviar el mensaje.", "error");
        return;
    }

    if (!valorEmail || valorEmail.indexOf("@") === -1) {
        mostrarMensajeFormulario("Ingresa un correo electrónico válido.", "error");
        return;
    }

    if (!eligioNovedades) {
        mostrarMensajeFormulario("Indica si deseas recibir novedades.", "error");
        return;
    }

    if (!valorMensaje) {
        mostrarMensajeFormulario("El mensaje no puede quedar vacío.", "error");
        return;
    }

    const datosEnvio = {
        nombre: valorNombre,
        email: valorEmail,
        mensaje: valorMensaje
    };

    procesarEnvioFormulario(evento.target, datosEnvio);
}

/**
 * Procesa el envío asíncrono (sugerencia S5 del profesor).
 * Flujo: pending = carga, fulfilled = éxito, rejected = error.
 * finally reactiva el formulario.
 */
function procesarEnvioFormulario(formulario, datos) {
    mostrarMensajeFormulario("Enviando tu mensaje...", "carga");
    cambiarEstadoFormulario(formulario, true);

    enviarFormularioSimulado(datos)
        .then(function (respuesta) {
            const textoExito = "Gracias, " + respuesta.nombre + ". Recibimos tu mensaje y te responderemos a " + respuesta.email + ".";
            mostrarMensajeFormulario(textoExito, "exito");
            formulario.reset();
        })
        .catch(function (error) {
            mostrarMensajeFormulario("No se pudo enviar el mensaje: " + error.message, "error");
        })
        .finally(function () {
            cambiarEstadoFormulario(formulario, false);
        });
}

/**
 * Simula el envío del formulario con una promesa (retroalimentación S5).
 * Flujo: espera 1.5 segundos como si hablara con un servidor.
 * Resuelve si el envío es correcto. Rechaza si el correo es
 * falla@kivo.cl, para practicar el estado rejected.
 */
function enviarFormularioSimulado(datos) {
    return new Promise(function (resolver, rechazar) {
        setTimeout(function () {
            const correoPrueba = datos.email.toLowerCase();

            if (correoPrueba === "falla@kivo.cl") {
                rechazar(new Error("El servidor no respondió. Inténtalo de nuevo."));
                return;
            }

            resolver(datos);
        }, 1500);
    });
}

/**
 * Activa o desactiva el formulario mientras se envía.
 * Flujo: evita un segundo clic y cambia el texto del botón.
 */
function cambiarEstadoFormulario(formulario, enviando) {
    const botonEnviar = document.getElementById("btn-enviar-contacto");
    const controles = formulario.elements;
    let indice = 0;

    while (indice < controles.length) {
        controles[indice].disabled = enviando;
        indice = indice + 1;
    }

    if (botonEnviar) {
        botonEnviar.innerHTML = enviando ? "Enviando..." : "Enviar";
    }
}

/**
 * Crea el aviso del formulario con createElement y appendChild.
 * Flujo: limpia el contenedor y agrega un párrafo según el estado
 * (carga / pending, éxito / fulfilled o error / rejected).
 */
function mostrarMensajeFormulario(texto, estado) {
    const resultado = document.getElementById("resultado-envio");

    if (!resultado) {
        return;
    }

    limpiarContenedor(resultado);

    const aviso = document.createElement("p");

    if (estado === "carga") {
        aviso.className = "aviso-dinamico aviso-carga mb-0";
    } else if (estado === "error") {
        aviso.className = "aviso-dinamico aviso-error mb-0";
    } else {
        aviso.className = "aviso-dinamico aviso-exito mb-0";
    }

    if (estado === "carga") {
        const indicador = document.createElement("span");
        indicador.className = "spinner-border spinner-border-sm me-2";
        indicador.setAttribute("aria-hidden", "true");
        aviso.appendChild(indicador);
    }

    const textoAviso = document.createElement("span");
    textoAviso.innerHTML = texto;
    aviso.appendChild(textoAviso);
    resultado.appendChild(aviso);
}

/**
 * Quita todos los hijos de un elemento.
 * Flujo: se reutiliza al limpiar avisos, catálogo y carrito.
 */
function limpiarContenedor(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

document.addEventListener("DOMContentLoaded", iniciarSitio);
