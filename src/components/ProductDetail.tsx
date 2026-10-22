"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import {
  getCategoria,
  getTallasDisponibles,
  getTallasPorDorsal,
  tienda,
} from "@/lib/catalog";
import { obtenerUrlHosting } from "@/lib/env";
import { formatearPrecio } from "@/lib/format";
import { construirEnlaceCompartir, construirUrlProducto } from "@/lib/order";
import type { Producto } from "@/lib/types";

export function ProductDetail({ producto }: { producto: Producto }) {
  const { addItem } = useCart();
  const [imagenActiva, setImagenActiva] = useState(0);
  const [anadido, setAnadido] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  const categoria = getCategoria(producto.categoria);
  const hosting = obtenerUrlHosting();
  const urlProducto = construirUrlProducto(hosting, producto.id);
  const enlaceCompartir = construirEnlaceCompartir(
    producto.nombre,
    urlProducto,
  );

  const tieneDorsales = producto.dorsales.length > 0;

  const [dorsal, setDorsal] = useState(
    tieneDorsales ? producto.dorsales[0].numero : "",
  );

  const tallasDisponibles = useMemo(() => {
    if (tieneDorsales) {
      return getTallasPorDorsal(producto, dorsal);
    }
    return getTallasDisponibles(producto);
  }, [producto, dorsal, tieneDorsales]);

  const [talla, setTalla] = useState(tallasDisponibles[0] ?? "");

  useEffect(() => {
    return () => {
      if (temporizador.current) {
        clearTimeout(temporizador.current);
      }
    };
  }, []);

  function cambiarDorsal(nuevoDorsal: string) {
    setDorsal(nuevoDorsal);
    const nuevasTallas = getTallasPorDorsal(producto, nuevoDorsal);
    if (!nuevasTallas.includes(talla)) {
      setTalla(nuevasTallas[0] ?? "");
    }
  }

  function anadirAlCarrito() {
    if (!talla) return;
    addItem(producto.id, talla, dorsal);
    setAnadido(true);

    if (temporizador.current) {
      clearTimeout(temporizador.current);
    }

    temporizador.current = setTimeout(() => setAnadido(false), 2500);
  }

  return (
    <div>
      {/* Migas de pan compactas */}
      <nav
        aria-label='Migas de pan'
        className='mb-5 flex flex-wrap items-center gap-1.5 text-[11px] text-black/45'
      >
        <Link
          href='/'
          className='inline-flex min-h-8 items-center hover:text-lc-verde'
        >
          Inicio
        </Link>
        <span aria-hidden='true'>/</span>
        <Link
          href='/catalogo'
          className='inline-flex min-h-8 items-center hover:text-lc-verde'
        >
          Catálogo
        </Link>
        <span aria-hidden='true'>/</span>
        <span aria-current='page' className='max-w-full truncate text-black/65'>
          {producto.nombre}
        </span>
      </nav>

      <div className='grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] md:gap-8 lg:gap-12'>
        {/* Imagen compacta */}
        <div>
          <div className='overflow-hidden rounded-xl border border-black/10 bg-white'>
            <img
              src={producto.imagenes[imagenActiva]}
              alt={`${producto.nombre} — imagen ${imagenActiva + 1}`}
              loading='eager'
              className='aspect-square h-full w-full object-contain p-3 sm:aspect-[4/3] sm:p-4'
            />
          </div>

          {producto.imagenes.length > 1 ? (
            <div
              role='group'
              aria-label='Miniaturas del producto'
              className='mt-2 flex gap-1.5 overflow-x-auto pb-1'
            >
              {producto.imagenes.map((imagen, indice) => (
                <button
                  key={imagen}
                  type='button'
                  onClick={() => setImagenActiva(indice)}
                  aria-label={`Ver imagen ${indice + 1} de ${producto.imagenes.length}`}
                  aria-pressed={imagenActiva === indice}
                  className={`aspect-square w-14 shrink-0 overflow-hidden rounded-md border-2 bg-white transition-colors ${
                    imagenActiva === indice
                      ? "border-lc-verde"
                      : "border-transparent hover:border-black/15"
                  }`}
                >
                  <img
                    src={imagen}
                    alt=''
                    loading='lazy'
                    className='h-full w-full object-contain p-1'
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Información */}
        <div className='flex flex-col'>
          {categoria ? (
            <span className='inline-flex w-fit rounded-full bg-lc-verde/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-lc-verde'>
              {categoria.nombre}
            </span>
          ) : null}

          <h1 className='mt-2 text-xl font-bold leading-tight tracking-tight sm:text-2xl lg:text-3xl'>
            {producto.nombre}
          </h1>

          <p className='mt-2 text-lg font-bold text-lc-verde sm:text-xl'>
            {formatearPrecio(producto.precio, tienda.simboloMoneda)}
          </p>

          <p className='mt-3 text-xs leading-relaxed text-black/60 sm:text-sm'>
            {producto.descripcion}
          </p>

          {/* Dorsal */}
          {tieneDorsales ? (
            <div className='mt-5 border-t border-black/10 pt-4'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-black/55'>
                Dorsal
                {dorsal ? (
                  <span className='ml-1.5 text-lc-verde'>({dorsal})</span>
                ) : null}
              </p>
              <div className='mt-2 flex flex-wrap gap-1.5'>
                {producto.dorsales.map((d) => (
                  <button
                    key={d.numero}
                    type='button'
                    onClick={() => cambiarDorsal(d.numero)}
                    aria-pressed={dorsal === d.numero}
                    className={`inline-flex h-8 min-w-9 items-center justify-center rounded-full border px-2.5 text-xs font-semibold transition-colors ${
                      dorsal === d.numero
                        ? "border-lc-verde bg-lc-verde text-white"
                        : "border-black/15 bg-white text-lc-negro hover:border-lc-verde hover:text-lc-verde"
                    }`}
                  >
                    {d.numero}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Talla */}
          <div className='mt-4 border-t border-black/10 pt-4'>
            {tallasDisponibles.length > 0 ? (
              <>
                <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-black/55'>
                  Talla
                  {talla ? (
                    <span className='ml-1.5 text-lc-verde'>({talla})</span>
                  ) : null}
                </p>
                <div className='mt-2 flex flex-wrap gap-1.5'>
                  {tallasDisponibles.map((tallaDisponible) => (
                    <button
                      key={tallaDisponible}
                      type='button'
                      onClick={() => setTalla(tallaDisponible)}
                      aria-pressed={talla === tallaDisponible}
                      className={`inline-flex h-8 min-w-9 items-center justify-center rounded-full border px-2.5 text-xs font-semibold transition-colors ${
                        talla === tallaDisponible
                          ? "border-lc-verde bg-lc-verde text-white"
                          : "border-black/15 bg-white text-lc-negro hover:border-lc-verde hover:text-lc-verde"
                      }`}
                    >
                      {tallaDisponible}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className='text-xs text-black/55'>
                Este producto es de talla única.
              </p>
            )}
          </div>

          {/* Acciones */}
          <div className='mt-5 flex flex-col gap-2 sm:flex-row'>
            <button
              type='button'
              onClick={anadirAlCarrito}
              disabled={!talla}
              className='inline-flex min-h-10 flex-1 items-center justify-center rounded-full bg-lc-verde px-4 text-sm font-semibold text-white transition-colors hover:bg-lc-verde/90 disabled:cursor-not-allowed disabled:opacity-50'
            >
              {anadido ? "Añadido ✓" : "Añadir al carrito"}
            </button>

            <a
              href={enlaceCompartir}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex min-h-10 flex-1 items-center justify-center rounded-full border border-lc-verde px-4 text-sm font-semibold text-lc-verde transition-colors hover:bg-lc-verde hover:text-white'
            >
              Compartir
            </a>
          </div>

          <div
            className='mt-2 min-h-5 text-xs'
            role='status'
            aria-live='polite'
          >
            {anadido ? (
              <p className='text-lc-verde'>
                Producto añadido.{" "}
                <Link
                  href='/carrito'
                  className='font-semibold underline hover:text-lc-rosa'
                >
                  Ver carrito
                </Link>
              </p>
            ) : null}
          </div>

          <div className='mt-4 border-t border-black/10 pt-3 text-[11px] leading-relaxed text-black/45'>
            <p>Pedido y envío se acuerdan directamente por WhatsApp.</p>
            <p className='mt-0.5'>
              Consulta disponibilidad de otras tallas al hacer tu pedido.
            </p>
          </div>
        </div>
      </div>

      {/* Volver */}
      <div className='mt-6 border-t border-black/10 pt-4'>
        <Link
          href='/catalogo'
          className='inline-flex min-h-9 items-center text-xs font-semibold text-lc-verde underline-offset-4 hover:text-lc-rosa hover:underline'
        >
          ← Volver al catálogo
        </Link>
      </div>
    </div>
  );
}
