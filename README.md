# La Camiseta

Catálogo estático de camisetas de fútbol de todas las épocas y equipos. El pedido se genera como
mensaje de texto y se envía por WhatsApp. No hay backend, base de datos ni pasarela de pago.

## Stack

- Next.js con App Router y exportación estática (`output: "export"`).
- TypeScript en modo estricto.
- Tailwind CSS con la paleta de la tienda.
- React Context + `localStorage` para el carrito.
- pnpm como único gestor de paquetes.

## Requisitos

- Node.js 20 o superior.
- pnpm 9. La versión está fijada en `packageManager`.

## Instalación

```bash
pnpm install
```

## Variables de entorno

Crea tu archivo local a partir del ejemplo:

```powershell
Copy-Item .env.example .env.local
```

Edita `.env.local`:

```text
NEXT_PUBLIC_WHATSAPP_NUMBER=34600000000
NEXT_PUBLIC_HOSTING_URL=http://localhost:3000
```

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número de WhatsApp con prefijo de país y sin signos. Es el número
  que recibirá los pedidos.
- `NEXT_PUBLIC_HOSTING_URL`: URL pública de la web. Se usa para compartir productos por WhatsApp.
  En local puede ser `http://localhost:3000`.

Las variables deben empezar por `NEXT_PUBLIC_` para estar disponibles en el navegador. Si falta
alguna, la web muestra un aviso en consola y no se rompe.

## Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

Páginas disponibles:

- `/` — inicio, categorías y productos destacados.
- `/catalogo` — catálogo completo con filtro por categoría.
- `/producto/[id]` — detalle, galería, tallas, dorsales y compartir por WhatsApp.
- `/carrito` — cantidades, total y generación del pedido por WhatsApp.

## Scripts

```bash
pnpm dev        # servidor de desarrollo
pnpm lint       # revisión de ESLint
pnpm typecheck  # comprobación de tipos
```

## Estructura

```text
src/
  app/            páginas y layout
  components/     cabecera, footer, tarjetas, carrito, detalle
  data/           config.json con tienda, categorías y productos
  lib/            tipos, catálogo, formato de precios, pedido y variables de entorno
public/
  images/         imágenes de productos y hero
```

## Añadir o editar productos

1. Edita `src/data/config.json`.
2. Añade un objeto al array `productos` con este formato:

```json
{
  "id": "prod-010",
  "nombre": "Nombre de la camiseta",
  "descripcion": "Descripción breve.",
  "precio": 39.99,
  "categoria": "retro",
  "imagenes": ["/images/productos/prod-010-1.svg"],
  "tallas": ["S", "M", "L", "XL"],
  "dorsales": ["1", "7", "9", "10", "11"],
  "destacado": false
}
```

3. Sube las imágenes a `public/images/productos/`. La primera imagen es la principal.
4. Usa un `id` único y una `categoria` existente: `temporada-actual`, `retro` o
   `temporadas-antiguas`.
5. `tallas` son las tallas disponibles y `dorsales` los números que se pueden estampar. Si un
   producto no tiene dorsales, deja el array vacío.

Las imágenes actuales son placeholders SVG. Puedes sustituirlas por fotos optimizadas en `.webp`
manteniendo la misma ruta o actualizando el array `imagenes`.

## Carrito y pedido

El carrito se guarda en `localStorage` con la clave `la-camiseta-carrito-v1`. Cada línea es única
por combinación de producto, talla y dorsal.

El botón **Generar pedido por WhatsApp** construye un mensaje con este formato:

```text
Hola, quiero hacer el siguiente pedido:

- 2x Camiseta Real Madrid Local 2024/25 (Talla M · Dorsal 7) — 99,98 €
- 1x Camiseta Retro Barcelona 1992 (Talla L · Dorsal 10) — 39,99 €

Total: 139,97 €
```

Después abre `https://wa.me/{NEXT_PUBLIC_WHATSAPP_NUMBER}?text={mensaje}`. El envío siempre lo
confirma el usuario en su propia aplicación.

## Build y despliegue

Los pasos de build (`pnpm build`) y despliegue en Netlify se añadirán cuando se soliciten. En esta
fase el proyecto está preparado para desarrollo local y revisión.

Solo debe existir `pnpm-lock.yaml` como archivo de lock.
