import { formatearPrecio, redondear } from "@/lib/format";
import { getProducto } from "@/lib/catalog";
import type { CartItem, Producto } from "@/lib/types";

export function obtenerLineasPedido(items: CartItem[]): Array<{
  item: CartItem;
  producto: Producto;
  subtotal: number;
}> {
  return items.flatMap((item) => {
    const producto = getProducto(item.productoId);

    if (!producto) {
      return [];
    }

    return [
      {
        item,
        producto,
        subtotal: redondear(producto.precio * item.cantidad),
      },
    ];
  });
}

export function calcularTotal(items: CartItem[]): number {
  return redondear(
    items.reduce((total, item) => {
      const producto = getProducto(item.productoId);
      return producto ? total + producto.precio * item.cantidad : total;
    }, 0),
  );
}

// Genera el texto exacto que se enviará por WhatsApp, con una línea por producto.
export function construirMensajePedido(items: CartItem[], simbolo: string): string {
  const lineas = items.flatMap((item) => {
    const producto = getProducto(item.productoId);

    if (!producto) {
      return [];
    }

    const subtotal = formatearPrecio(producto.precio * item.cantidad, simbolo);
    const detalles = [
      item.talla ? `Talla ${item.talla}` : null,
      item.dorsal ? `Dorsal ${item.dorsal}` : null,
    ]
      .filter(Boolean)
      .join(" · ");
    const variantes = detalles ? ` (${detalles})` : "";

    return [`- ${item.cantidad}x ${producto.nombre}${variantes} — ${subtotal}`];
  });

  const total = formatearPrecio(calcularTotal(items), simbolo);

  return `Hola, quiero hacer el siguiente pedido:\n\n${lineas.join("\n")}\n\nTotal: ${total}`;
}

export function construirEnlaceWhatsApp(numero: string, mensaje: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

export function construirUrlProducto(hosting: string, productoId: string): string {
  return `${hosting.replace(/\/+$/, "")}/producto/${productoId}/`;
}

export function construirEnlaceCompartir(nombre: string, urlProducto: string): string {
  return `https://wa.me/?text=${encodeURIComponent(`${nombre} — ${urlProducto}`)}`;
}
