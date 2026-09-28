# Kivo — Semana 6 (PFY2201)

Tienda de videojuegos Kivo. Sitio e-commerce con Bootstrap 5 y JavaScript: catálogo desde un JSON local, carrito, búsqueda y formulario de contacto asíncrono.

## Enlaces

- Repositorio: https://github.com/L1sbethBilbao/bi8_Exp2_S6_lisbeth_bilbao
- GitHub Pages: https://l1sbethbilbao.github.io/bi8_Exp2_S6_lisbeth_bilbao/

## Estructura

```
index.html
productos.html
contacto.html
assets/css/estilos.css
assets/js/funciones.js
assets/img/
assets/data/productos.json
```

## Cómo probar

1. Abre el sitio con un servidor local (Live Server o similar). El Fetch al JSON no funciona bien con `file://`.
2. En **Inicio** o **Productos** el catálogo se carga solo. Usa **Recargar catálogo** para ver el GET en F12 → Red.
3. **Agregar al carrito** actualiza el resumen del aside.
4. El formulario **Buscar** filtra por nombre o categoría (submit, sin recargar).
5. **Categorías** del navbar filtra Acción, Carreras o RPG.
6. **Ver detalle** abre un modal Bootstrap.
7. En **Contacto**, un envío válido muestra carga y luego éxito. El correo `falla@kivo.cl` simula el error de la promesa.

## Contenidos de la semana 6

- Fetch GET a JSON local, con `.then` / `.catch` / `.finally` y estados pending / fulfilled / rejected.
- Carrito con `createElement` y `appendChild`.
- Eventos `click` (carrito) y `submit` (búsqueda y contacto).
- Navbar con categorías simuladas, usable en móvil.
- Sugerencia de la retroalimentación S5: envío de contacto simulado con una promesa.
