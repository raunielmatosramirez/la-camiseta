"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  categorias,
  contarProductosPorCategoria,
  productos,
} from "@/lib/catalog";

const TODAS = "todas";

export function CatalogView() {
  const [categoriaActiva, setCategoriaActiva] = useState(TODAS);

  useEffect(() => {
    const aplicarHash = () => {
      const categoria = window.location.hash.replace("#", "");

      if (categoria && categorias.some((item) => item.id === categoria)) {
        setCategoriaActiva(categoria);
      } else {
        setCategoriaActiva(TODAS);
      }
    };

    aplicarHash();
    window.addEventListener("hashchange", aplicarHash);

    return () => window.removeEventListener("hashchange", aplicarHash);
  }, []);

  function seleccionarCategoria(categoriaId: string) {
    setCategoriaActiva(categoriaId);

    const url =
      categoriaId === TODAS
        ? window.location.pathname
        : `${window.location.pathname}#${categoriaId}`;

    window.history.replaceState(null, "", url);
  }

  const productosFiltrados = useMemo(
    () =>
      categoriaActiva === TODAS
        ? productos
        : productos.filter(
            (producto) => producto.categoria === categoriaActiva,
          ),
    [categoriaActiva],
  );

  const filtros = [
    { id: TODAS, nombre: "Todas", total: productos.length },
    ...categorias.map((categoria) => ({
      id: categoria.id,
      nombre: categoria.nombre,
      total: contarProductosPorCategoria(categoria.id),
    })),
  ];

  return (
    <div>
      {/* Filtros en píldoras */}
      <div
        role='group'
        aria-label='Filtrar productos por categoría'
        className='-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0'
      >
        {filtros.map((filtro) => {
          const activo = categoriaActiva === filtro.id;
          return (
            <button
              key={filtro.id}
              type='button'
              aria-pressed={activo}
              onClick={() => seleccionarCategoria(filtro.id)}
              className={`inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors ${
                activo
                  ? "border-lc-verde bg-lc-verde text-white"
                  : "border-black/10 bg-white text-lc-negro hover:border-lc-verde hover:text-lc-verde"
              }`}
            >
              {filtro.nombre}
              <span
                className={`text-[10px] font-medium ${
                  activo ? "text-white/70" : "text-black/45"
                }`}
              >
                {filtro.total}
              </span>
            </button>
          );
        })}
      </div>

      {/* Contador + línea */}
      <div className='mt-4 flex items-center justify-between border-b border-black/5 pb-2'>
        <p className='text-[11px] text-black/50' aria-live='polite'>
          {productosFiltrados.length}{" "}
          {productosFiltrados.length === 1 ? "producto" : "productos"}
        </p>
        {categoriaActiva !== TODAS ? (
          <button
            type='button'
            onClick={() => seleccionarCategoria(TODAS)}
            className='text-[11px] font-semibold text-lc-verde underline-offset-4 hover:text-lc-rosa hover:underline'
          >
            Ver todas
          </button>
        ) : null}
      </div>

      {/* Grid de productos */}
      {productosFiltrados.length === 0 ? (
        <p className='mt-8 text-center text-sm text-black/50'>
          No hay productos en esta categoría todavía.
        </p>
      ) : (
        <div className='mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}
