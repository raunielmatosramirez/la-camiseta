import config from "../../src/data/config.json";
import type {
  Categoria,
  ConfiguracionTienda,
  Dorsal,
  Producto,
  Tienda,
} from "@/lib/types";

const data = config as ConfiguracionTienda;

export const tienda: Tienda = data.tienda;
export const categorias: Categoria[] = data.categorias;
export const productos: Producto[] = data.productos;

export function getProducto(id: string): Producto | undefined {
  return productos.find((p) => p.id === id);
}

export function getCategoria(id: string): Categoria | undefined {
  return categorias.find((c) => c.id === id);
}

export function getProductosPorCategoria(categoriaId: string): Producto[] {
  return productos.filter((p) => p.categoria === categoriaId);
}

export function getProductosDestacados(): Producto[] {
  return productos.filter((p) => p.destacado);
}

export function contarProductosPorCategoria(categoriaId: string): number {
  return getProductosPorCategoria(categoriaId).length;
}

/**
 * Devuelve las tallas disponibles para un producto.
 * - Si el producto tiene dorsales, devuelve la unión de todas las tallas
 *   de todos los dorsales (sin duplicados, en orden S, M, L, XL, XXL).
 * - Si no tiene dorsales, devuelve `producto.tallas`.
 */
export function getTallasDisponibles(producto: Producto): string[] {
  if (producto.dorsales.length > 0) {
    const orden = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
    const unicas = new Set<string>();
    producto.dorsales.forEach((d) => d.tallas.forEach((t) => unicas.add(t)));
    return Array.from(unicas).sort(
      (a, b) => orden.indexOf(a) - orden.indexOf(b),
    );
  }
  return producto.tallas;
}

/**
 * Devuelve las tallas disponibles para un dorsal concreto.
 */
export function getTallasPorDorsal(
  producto: Producto,
  numeroDorsal: string,
): string[] {
  const dorsal = producto.dorsales.find((d) => d.numero === numeroDorsal);
  return dorsal ? dorsal.tallas : [];
}

/**
 * Devuelve los dorsales que tienen disponible una talla concreta.
 */
export function getDorsalesPorTalla(
  producto: Producto,
  talla: string,
): Dorsal[] {
  return producto.dorsales.filter((d) => d.tallas.includes(talla));
}

/**
 * Comprueba si una combinación dorsal + talla es válida.
 */
export function combinacionValida(
  producto: Producto,
  dorsal: string,
  talla: string,
): boolean {
  if (!dorsal) {
    return producto.tallas.includes(talla);
  }
  const d = producto.dorsales.find((x) => x.numero === dorsal);
  return d ? d.tallas.includes(talla) : false;
}
