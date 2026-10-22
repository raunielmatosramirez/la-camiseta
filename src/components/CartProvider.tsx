"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProducto, getTallasPorDorsal } from "@/lib/catalog";
import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "la-camiseta-carrito-v1";
const CANTIDAD_MAXIMA = 99;

interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  totalItems: number;
  addItem: (
    productoId: string,
    talla: string,
    dorsal: string,
    cantidad?: number,
  ) => void;
  actualizarCantidad: (
    productoId: string,
    talla: string,
    dorsal: string,
    cantidad: number,
  ) => void;
  eliminarItem: (productoId: string, talla: string, dorsal: string) => void;
  vaciarCarrito: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function normalizarCantidad(valor: unknown): number {
  if (typeof valor !== "number" || !Number.isFinite(valor)) {
    return 1;
  }
  return Math.min(CANTIDAD_MAXIMA, Math.max(1, Math.floor(valor)));
}

// Convierte cualquier cosa a string seguro (nunca "[object Object]")
function aString(valor: unknown): string {
  if (typeof valor === "string") return valor;
  if (typeof valor === "number") return String(valor);
  if (valor && typeof valor === "object" && "numero" in valor) {
    // Por si llega un objeto Dorsal desde un carrito viejo
    return String((valor as { numero: unknown }).numero);
  }
  return "";
}

function claveItem(productoId: string, talla: string, dorsal: string): string {
  return `${productoId}::${talla}::${dorsal}`;
}

/**
 * Normaliza talla y dorsal según el producto.
 * - `dorsales` es un array de objetos { numero, tallas }.
 * - Si el dorsal no existe, se usa el primero disponible.
 * - La talla se valida contra las tallas de ESE dorsal (o las tallas generales si no hay dorsales).
 */
function normalizarVariantes(
  productoId: string,
  talla: string,
  dorsal: string,
): { talla: string; dorsal: string } {
  const producto = getProducto(productoId);
  if (!producto) return { talla: "", dorsal: "" };

  const tallaSegura = aString(talla);
  const dorsalSeguro = aString(dorsal);

  // Productos con dorsales
  if (producto.dorsales.length > 0) {
    const dorsalEncontrado = producto.dorsales.find(
      (d) => d.numero === dorsalSeguro,
    );
    const dorsalFinal = dorsalEncontrado ?? producto.dorsales[0];
    const tallasDisponibles = dorsalFinal.tallas;

    return {
      dorsal: dorsalFinal.numero,
      talla: tallasDisponibles.includes(tallaSegura)
        ? tallaSegura
        : (tallasDisponibles[0] ?? ""),
    };
  }

  // Productos sin dorsales: solo tallas generales
  return {
    dorsal: "",
    talla: producto.tallas.includes(tallaSegura)
      ? tallaSegura
      : (producto.tallas[0] ?? ""),
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Rehidratar desde localStorage
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        const parseado: unknown = JSON.parse(guardado);
        if (Array.isArray(parseado)) {
          const validos = parseado.flatMap((item): CartItem[] => {
            if (!item || typeof item !== "object") return [];
            const candidato = item as Record<string, unknown>;

            if (
              typeof candidato.productoId !== "string" ||
              typeof candidato.cantidad !== "number" ||
              candidato.cantidad <= 0 ||
              !getProducto(candidato.productoId)
            ) {
              return [];
            }

            const variantes = normalizarVariantes(
              candidato.productoId,
              aString(candidato.talla),
              aString(candidato.dorsal),
            );

            return [
              {
                productoId: candidato.productoId,
                talla: variantes.talla,
                dorsal: variantes.dorsal,
                cantidad: normalizarCantidad(candidato.cantidad),
              },
            ];
          });

          const unicos = new Map<string, CartItem>();
          for (const item of validos) {
            const clave = claveItem(item.productoId, item.talla, item.dorsal);
            const existente = unicos.get(clave);
            if (existente) {
              existente.cantidad = Math.min(
                CANTIDAD_MAXIMA,
                existente.cantidad + normalizarCantidad(item.cantidad),
              );
            } else {
              unicos.set(clave, item);
            }
          }

          setItems([...unicos.values()]);
        }
      }
    } catch (error) {
      console.error(
        "[La Camiseta] No se pudo leer el carrito guardado.",
        error,
      );
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persistir cambios
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("[La Camiseta] No se pudo guardar el carrito.", error);
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (productoId: string, talla: string, dorsal: string, cantidad = 1) => {
      if (!getProducto(productoId)) return;

      const cantidadAgregada = normalizarCantidad(cantidad);
      const variantes = normalizarVariantes(productoId, talla, dorsal);

      setItems((anteriores) => {
        const indice = anteriores.findIndex(
          (item) =>
            item.productoId === productoId &&
            item.talla === variantes.talla &&
            item.dorsal === variantes.dorsal,
        );

        if (indice >= 0) {
          const siguientes = anteriores.slice();
          siguientes[indice] = {
            ...siguientes[indice],
            cantidad: Math.min(
              CANTIDAD_MAXIMA,
              siguientes[indice].cantidad + cantidadAgregada,
            ),
          };
          return siguientes;
        }

        return [
          ...anteriores,
          {
            productoId,
            talla: variantes.talla,
            dorsal: variantes.dorsal,
            cantidad: cantidadAgregada,
          },
        ];
      });
    },
    [],
  );

  const actualizarCantidad = useCallback(
    (productoId: string, talla: string, dorsal: string, cantidad: number) => {
      setItems((anteriores) =>
        anteriores.map((item) =>
          item.productoId === productoId &&
          item.talla === talla &&
          item.dorsal === dorsal
            ? { ...item, cantidad: normalizarCantidad(cantidad) }
            : item,
        ),
      );
    },
    [],
  );

  const eliminarItem = useCallback(
    (productoId: string, talla: string, dorsal: string) => {
      setItems((anteriores) =>
        anteriores.filter(
          (item) =>
            !(
              item.productoId === productoId &&
              item.talla === talla &&
              item.dorsal === dorsal
            ),
        ),
      );
    },
    [],
  );

  const vaciarCarrito = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.cantidad, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      hydrated,
      totalItems,
      addItem,
      actualizarCantidad,
      eliminarItem,
      vaciarCarrito,
    }),
    [
      items,
      hydrated,
      totalItems,
      addItem,
      actualizarCantidad,
      eliminarItem,
      vaciarCarrito,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const contexto = useContext(CartContext);
  if (!contexto) {
    throw new Error("useCart debe usarse dentro de CartProvider.");
  }
  return contexto;
}
