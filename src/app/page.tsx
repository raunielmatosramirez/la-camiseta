"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import {
  categorias,
  contarProductosPorCategoria,
  getProductosDestacados,
  tienda,
} from "@/lib/catalog";

export default function HomePage() {
  const destacados = getProductosDestacados().slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className='bg-lc-blanco'>
        <Container>
          <div className='grid min-h-[55vh] gap-10 py-12 md:grid-cols-2 md:items-center md:gap-12 md:py-16 lg:min-h-[65vh] lg:gap-16 lg:py-20'>
            <div className='max-w-xl'>
              {/* Franja deportiva rosada */}
              <div className='flex items-center gap-3'>
                <div
                  aria-hidden='true'
                  className='flex h-1.5 w-16 overflow-hidden rounded-full'
                >
                  <span className='h-full flex-1 bg-lc-rosa' />
                  <span className='h-full flex-1 bg-lc-verde' />
                  <span className='h-full flex-1 bg-lc-rosa' />
                  <span className='h-full flex-1 bg-lc-verde' />
                </div>
                <p className='text-[10px] font-semibold uppercase tracking-[0.22em] text-lc-verde sm:text-xs'>
                  Fútbol · Todas las épocas
                </p>
              </div>

              <h1 className='mt-6 text-balance text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl'>
                <span className='text-lc-verde'>La</span>{" "}
                <span className='text-lc-rosa'>Camiseta</span>
              </h1>

              <p className='mt-5 text-xl font-semibold text-lc-verde sm:text-2xl'>
                {tienda.eslogan}
              </p>

              <p className='mt-4 max-w-lg text-sm leading-relaxed text-lc-negro/65 sm:text-base'>
                {tienda.descripcion}. De la temporada actual a las camisetas que
                marcaron una época, con un pedido sencillo por WhatsApp.
              </p>

              <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                <Link
                  href='/catalogo'
                  className='inline-flex min-h-10 items-center justify-center rounded-full bg-lc-verde px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-lc-verde/90 hover:shadow-md active:scale-[0.98]'
                >
                  Ver catálogo completo
                </Link>
                <Link
                  href='#categorias'
                  className='inline-flex min-h-10 items-center justify-center rounded-full border border-lc-negro/15 bg-transparent px-6 text-sm font-semibold text-lc-negro transition-all duration-200 hover:scale-[1.02] hover:border-lc-verde hover:text-lc-verde active:scale-[0.98]'
                >
                  Explorar categorías
                </Link>
              </div>

              <dl className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3'>
                {[
                  { dt: "Épocas", dd: "Todas las temporadas" },
                  { dt: "Equipos", dd: "De todo el mundo" },
                  { dt: "Pedido", dd: "Directo por WhatsApp" },
                ].map((item) => (
                  <div
                    key={item.dt}
                    className='rounded-xl bg-lc-blanco px-4 py-3 shadow-sm ring-1 ring-lc-negro/5 transition-shadow duration-200 hover:shadow-md'
                  >
                    <dt className='text-[10px] font-semibold uppercase tracking-[0.18em] text-lc-negro/45'>
                      {item.dt}
                    </dt>
                    <dd className='mt-1 text-sm font-semibold'>{item.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Imagen hero redondeada */}
            <div className='relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-lc-verde/10 shadow-md md:aspect-auto md:h-full md:min-h-[480px]'>
              <img
                src='/images/hero.svg'
                alt='Camisetas de fútbol de La Camiseta'
                loading='lazy'
                className='absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105'
              />
              <div className='absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-lc-verde/90 px-4 py-2 backdrop-blur-sm'>
                <span
                  aria-hidden='true'
                  className='h-1.5 w-1.5 rounded-full bg-lc-rosa'
                />
                <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-white'>
                  Todas las épocas · Todos los equipos
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CATEGORÍAS */}
      <section id='categorias' className='bg-lc-blanco py-12 sm:py-16'>
        <Container>
          <Reveal>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
              <div>
                <p className='text-[10px] font-semibold uppercase tracking-[0.22em] text-lc-rosa'>
                  Encuentra tu época
                </p>
                <h2 className='mt-1.5 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl'>
                  Explora por categoría
                </h2>
              </div>
              <Link
                href='/catalogo'
                className='inline-flex min-h-8 items-center text-sm font-semibold text-lc-verde underline-offset-4 transition-colors hover:underline'
              >
                Ver todo el catálogo →
              </Link>
            </div>
          </Reveal>

          <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4'>
            {categorias.map((categoria, indice) => (
              <Reveal key={categoria.id} delay={indice * 80}>
                <Link
                  href={`/catalogo#${categoria.id}`}
                  className='group flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3.5 shadow-sm ring-1 ring-lc-negro/5 transition-colors duration-200 hover:ring-lc-verde/30'
                >
                  <div className='flex min-w-0 items-center gap-3'>
                    <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lc-rosa/10 text-[11px] font-bold text-lc-rosa'>
                      {String(indice + 1).padStart(2, "0")}
                    </span>
                    <div className='min-w-0'>
                      <h3 className='truncate text-sm font-semibold tracking-tight transition-colors duration-200 group-hover:text-lc-verde'>
                        {categoria.nombre}
                      </h3>
                      <p className='text-[11px] text-lc-negro/45'>
                        {contarProductosPorCategoria(categoria.id)} productos
                      </p>
                    </div>
                  </div>
                  <span
                    aria-hidden='true'
                    className='shrink-0 text-sm font-semibold text-lc-verde'
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* DESTACADOS */}
      <section className='bg-lc-blanco py-12 sm:py-16'>
        <Container>
          <Reveal>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
              <div>
                <p className='text-[10px] font-semibold uppercase tracking-[0.22em] text-lc-rosa'>
                  Selección de la casa
                </p>
                <h2 className='mt-1.5 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl'>
                  Camisetas destacadas
                </h2>
              </div>
              <Link
                href='/catalogo'
                className='inline-flex min-h-8 items-center text-sm font-semibold text-lc-verde underline-offset-4 transition-colors hover:underline'
              >
                Ver catálogo completo →
              </Link>
            </div>
          </Reveal>

          <div className='mt-6 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-4'>
            {destacados.map((producto, indice) => (
              <Reveal
                key={producto.id}
                delay={indice * 80}
                className={indice >= 2 ? "hidden md:block" : ""}
              >
                <ProductCard producto={producto} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id='como-funciona' className='bg-lc-blanco py-12 sm:py-16'>
        <Container>
          <Reveal>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
              <div>
                <p className='text-[10px] font-semibold uppercase tracking-[0.22em] text-lc-rosa'>
                  Sencillo y directo
                </p>
                <h2 className='mt-1.5 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl'>
                  Cómo hacer tu pedido
                </h2>
              </div>
              <p className='max-w-xs text-xs leading-relaxed text-lc-negro/55 sm:text-right sm:text-sm'>
                Sin registros ni pagos online. El pedido llega directamente por
                WhatsApp.
              </p>
            </div>
          </Reveal>

          <div className='mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4'>
            {[
              {
                titulo: "Elige tus camisetas",
                texto:
                  "Explora el catálogo por temporada, equipo o época y selecciona tu talla.",
                icono: (
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
                    <path d='M9 3l3 2 3-2 5 3-2 4-2-1v11H8V9L6 10 4 6l5-3Z' />
                  </svg>
                ),
              },
              {
                titulo: "Revisa el carrito",
                texto:
                  "Ajusta cantidades, elimina lo que no quieras y comprueba el total.",
                icono: (
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
                    <path d='M6 8h12l-1 12H7L6 8Z' />
                    <path d='M9 9V6a3 3 0 0 1 6 0v3' />
                  </svg>
                ),
              },
              {
                titulo: "Envía por WhatsApp",
                texto:
                  "Genera el pedido y confirma el envío desde tu propia aplicación.",
                icono: (
                  <svg
                    aria-hidden='true'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-4 w-4'
                  >
                    <path d='M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14 0-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z' />
                  </svg>
                ),
              },
            ].map((paso, indice) => (
              <Reveal key={paso.titulo} delay={indice * 80}>
                <div className='flex h-full items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-lc-negro/5'>
                  <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lc-rosa/10 text-lc-rosa'>
                    {paso.icono}
                  </span>
                  <div className='min-w-0'>
                    <h3 className='text-sm font-semibold leading-snug'>
                      {paso.titulo}
                    </h3>
                    <p className='mt-1 text-xs leading-relaxed text-lc-negro/55'>
                      {paso.texto}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      {/* CTA FINAL */}
      {/* CTA FINAL */}
      <section className='bg-lc-verde py-12 sm:py-16'>
        <Container>
          <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
            <div className='max-w-xl'>
              <div className='flex items-center gap-3'>
                <span
                  aria-hidden='true'
                  className='h-1 w-8 rounded-full bg-lc-rosa'
                />
                <p className='text-[10px] font-semibold uppercase tracking-[0.22em] text-lc-rosa'>
                  Tu historia, tu equipo
                </p>
              </div>
              <h2 className='mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl'>
                ¿Buscas una camiseta concreta?
              </h2>
              <p className='mt-2 text-sm leading-relaxed text-white/70'>
                Cuéntanos qué equipo y qué temporada buscas. Te ayudamos a
                encontrarla y a cerrar el pedido por WhatsApp.
              </p>
            </div>
            <Link
              href='/catalogo'
              className='inline-flex min-h-10 shrink-0 items-center justify-center rounded-full bg-lc-rosa px-6 text-sm font-semibold text-lc-negro transition-colors duration-200 hover:bg-lc-rosa/90'
            >
              Empezar a elegir
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
