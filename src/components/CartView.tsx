"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { tienda } from "@/lib/catalog";
import { obtenerNumeroWhatsApp } from "@/lib/env";
import { formatearPrecio } from "@/lib/format";
import {
  calcularTotal,
  construirEnlaceWhatsApp,
  construirMensajePedido,
  obtenerLineasPedido,
} from "@/lib/order";

export function CartView() {
  const { items, hydrated, actualizarCantidad, eliminarItem } = useCart();
  const lineas = obtenerLineasPedido(items);
  const total = calcularTotal(items);
  const numeroWhatsApp = obtenerNumeroWhatsApp();
  const mensaje = construirMensajePedido(items, tienda.simboloMoneda);
  const enlacePedido = numeroWhatsApp
    ? construirEnlaceWhatsApp(numeroWhatsApp, mensaje)
    : null;

  if (!hydrated) {
    return (
      <div
        className='rounded-xl border border-black/10 bg-lc-blanco p-6 text-sm text-black/60'
        aria-busy='true'
        aria-live='polite'
      >
        Cargando carrito…
      </div>
    );
  }

  if (lineas.length === 0) {
    return (
      <div className='rounded-2xl border border-black/10 bg-lc-blanco px-6 py-12 text-center'>
        <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-lc-rosa'>
          Carrito vacío
        </p>
        <h2 className='mt-2 text-xl font-bold tracking-tight sm:text-2xl'>
          Todavía no has elegido tu camiseta
        </h2>
        <p className='mx-auto mt-2 max-w-md text-xs leading-relaxed text-black/60 sm:text-sm'>
          Explora el catálogo, elige tu talla y añade tus camisetas favoritas.
          Después podrás enviar el pedido por WhatsApp.
        </p>
        <Link
          href='/catalogo'
          className='mt-5 inline-flex min-h-10 items-center justify-center rounded-full bg-lc-verde px-5 text-sm font-semibold text-white transition-colors hover:bg-lc-verde/90'
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  const totalArticulos = lineas.reduce(
    (acc, linea) => acc + linea.item.cantidad,
    0,
  );

  return (
    <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start'>
      {/* Lista de líneas */}
      <div>
        <ul className='space-y-3'>
          {lineas.map(({ item, producto, subtotal }) => (
            <li
              key={`${item.productoId}-${item.talla}-${item.dorsal}`}
              className='rounded-xl border border-black/10 bg-white p-3 sm:p-4'
            >
              <div className='flex gap-3'>
                {/* Imagen compacta */}
                <Link
                  href={`/producto/${producto.id}`}
                  className='w-16 shrink-0 overflow-hidden rounded-lg border border-black/10 bg-white sm:w-20'
                  aria-label={`Ver ${producto.nombre}`}
                >
                  <img
                    src={producto.imagenes[0]}
                    alt={producto.nombre}
                    loading='lazy'
                    className='aspect-square h-full w-full object-contain p-1'
                  />
                </Link>

                <div className='flex min-w-0 flex-1 flex-col'>
                  {/* Nombre + eliminar */}
                  <div className='flex items-start justify-between gap-2'>
                    <h3 className='text-xs font-semibold leading-snug sm:text-sm'>
                      <Link
                        href={`/producto/${producto.id}`}
                        className='line-clamp-2 transition-colors hover:text-lc-verde'
                      >
                        {producto.nombre}
                      </Link>
                    </h3>
                    <button
                      type='button'
                      onClick={() =>
                        eliminarItem(producto.id, item.talla, item.dorsal)
                      }
                      aria-label={`Eliminar ${producto.nombre} del carrito`}
                      className='shrink-0 rounded-full p-1 text-black/40 transition-colors hover:bg-lc-rosa/10 hover:text-lc-rosa'
                    >
                      <svg
                        aria-hidden='true'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1.7'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='h-4 w-4'
                      >
                        <path d='M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6' />
                      </svg>
                    </button>
                  </div>

                  {/* Variantes: talla y dorsal en píldoras */}
                  <div className='mt-1.5 flex flex-wrap gap-1'>
                    {item.talla ? (
                      <span className='inline-flex items-center rounded-full bg-lc-verde/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-lc-verde'>
                        Talla {item.talla}
                      </span>
                    ) : null}
                    {item.dorsal ? (
                      <span className='inline-flex items-center rounded-full bg-lc-rosa/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-lc-rosa'>
                        Dorsal {item.dorsal}
                      </span>
                    ) : null}
                  </div>

                  {/* Cantidad + subtotal */}
                  <div className='mt-2.5 flex flex-wrap items-center justify-between gap-2'>
                    <div className='inline-flex items-center rounded-full border border-black/15 bg-white'>
                      <button
                        type='button'
                        onClick={() =>
                          actualizarCantidad(
                            producto.id,
                            item.talla,
                            item.dorsal,
                            item.cantidad - 1,
                          )
                        }
                        disabled={item.cantidad <= 1}
                        aria-label={`Reducir cantidad de ${producto.nombre}`}
                        className='flex h-8 w-8 items-center justify-center rounded-l-full text-sm font-medium transition-colors hover:bg-lc-verde hover:text-white disabled:cursor-not-allowed disabled:text-black/25 disabled:hover:bg-transparent disabled:hover:text-black/25'
                      >
                        −
                      </button>
                      <span
                        className='flex h-8 min-w-8 items-center justify-center border-x border-black/10 px-1 text-xs font-semibold'
                        aria-label={`Cantidad: ${item.cantidad}`}
                      >
                        {item.cantidad}
                      </span>
                      <button
                        type='button'
                        onClick={() =>
                          actualizarCantidad(
                            producto.id,
                            item.talla,
                            item.dorsal,
                            item.cantidad + 1,
                          )
                        }
                        disabled={item.cantidad >= 99}
                        aria-label={`Aumentar cantidad de ${producto.nombre}`}
                        className='flex h-8 w-8 items-center justify-center rounded-r-full text-sm font-medium transition-colors hover:bg-lc-verde hover:text-white disabled:cursor-not-allowed disabled:text-black/25 disabled:hover:bg-transparent disabled:hover:text-black/25'
                      >
                        +
                      </button>
                    </div>

                    <p className='text-sm font-bold text-lc-verde'>
                      {formatearPrecio(subtotal, tienda.simboloMoneda)}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href='/catalogo'
          className='mt-4 inline-flex min-h-9 items-center text-xs font-semibold text-lc-verde underline-offset-4 hover:text-lc-rosa hover:underline'
        >
          ← Seguir comprando
        </Link>
      </div>

      {/* Resumen */}
      <aside className='rounded-2xl border border-black/10 bg-white p-4 sm:p-5 lg:sticky lg:top-24'>
        <h2 className='text-base font-bold tracking-tight sm:text-lg'>
          Resumen del pedido
        </h2>

        <dl className='mt-3 space-y-2 border-b border-black/10 pb-3 text-xs sm:text-sm'>
          <div className='flex items-center justify-between gap-3'>
            <dt className='text-black/60'>Artículos</dt>
            <dd className='font-semibold'>{totalArticulos}</dd>
          </div>
          <div className='flex items-center justify-between gap-3'>
            <dt className='text-black/60'>Envío</dt>
            <dd className='font-medium'>A convenir</dd>
          </div>
        </dl>

        <div className='flex items-center justify-between gap-3 py-3'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60'>
            Total
          </p>
          <p className='text-lg font-bold text-lc-verde sm:text-xl'>
            {formatearPrecio(total, tienda.simboloMoneda)}
          </p>
        </div>

        <p className='text-[11px] leading-relaxed text-black/55'>
          El pago y el envío se acuerdan directamente por WhatsApp. Al pulsar el
          botón se abrirá tu aplicación con el pedido ya escrito.
        </p>

        {enlacePedido ? (
          <a
            href={enlacePedido}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-4 flex min-h-10 w-full items-center justify-center rounded-full bg-lc-verde px-4 text-sm font-semibold text-white transition-colors hover:bg-lc-verde/90'
          >
            Generar pedido por WhatsApp
          </a>
        ) : (
          <p
            role='alert'
            className='mt-4 rounded-lg border border-red-300 bg-red-50 p-2.5 text-[11px] leading-relaxed text-red-800'
          >
            Falta configurar NEXT_PUBLIC_WHATSAPP_NUMBER. Añade tu número con
            prefijo de país en el archivo .env.local.
          </p>
        )}

        <p className='mt-2 text-center text-[10px] text-black/45'>
          No se realiza ningún cobro en esta web.
        </p>
      </aside>
    </div>
  );
}
