"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { getCategoria, tienda } from "@/lib/catalog";
import { formatearPrecio } from "@/lib/format";
import type { Producto } from "@/lib/types";

export function ProductCard({ producto }: { producto: Producto }) {
  // Ya no se usa addItem aquí: la talla y el dorsal se eligen en el detalle.
  useCart();
  const categoria = getCategoria(producto.categoria);

  return (
    <article className='group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-lc-negro/5 transition-colors duration-200'>
      <Link
        href={`/producto/${producto.id}`}
        className='relative block aspect-square overflow-hidden bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lc-verde sm:aspect-[6/5]'
        aria-label={`Ver ${producto.nombre}`}
      >
        <img
          src={producto.imagenes[0]}
          alt={producto.nombre}
          loading='lazy'
          className='h-full w-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-[1.03] sm:p-2'
        />
        {producto.destacado ? (
          <span className='absolute left-1.5 top-1.5 rounded-full bg-lc-rosa px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-lc-negro sm:left-2 sm:top-2 sm:px-2 sm:text-[9px] sm:tracking-[0.12em]'>
            Destacada
          </span>
        ) : null}
      </Link>

      <div className='flex flex-1 flex-col p-2 sm:p-3'>
        {categoria ? (
          <span className='mb-1 inline-flex w-fit max-w-full truncate rounded-full bg-lc-verde/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-lc-verde sm:mb-1.5 sm:px-2 sm:text-[9px] sm:tracking-[0.12em]'>
            {categoria.nombre}
          </span>
        ) : null}

        <h3 className='text-[11px] font-semibold leading-snug sm:text-xs md:text-sm'>
          <Link
            href={`/producto/${producto.id}`}
            className='line-clamp-2 transition-colors hover:text-lc-verde'
          >
            {producto.nombre}
          </Link>
        </h3>

        <p className='mt-1 text-xs font-bold text-lc-verde sm:mt-1.5 sm:text-sm md:text-base'>
          {formatearPrecio(producto.precio, tienda.simboloMoneda)}
        </p>

        <div className='mt-auto pt-2 sm:pt-3'>
          <Link
            href={`/producto/${producto.id}`}
            className='inline-flex min-h-8 w-full items-center justify-center rounded-full bg-lc-verde px-2 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-lc-verde/90 active:scale-[0.98] sm:min-h-9 sm:px-3 sm:text-xs'
          >
            Ver producto
          </Link>
        </div>
      </div>
    </article>
  );
}
