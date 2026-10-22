import Link from "next/link";
import { Container } from "@/components/Container";
import { categorias, tienda } from "@/lib/catalog";
import { obtenerNumeroWhatsApp } from "@/lib/env";

export function Footer() {
  const numero = obtenerNumeroWhatsApp();
  const enlaceWhatsApp = numero ? `https://wa.me/${numero}` : "/carrito";
  const anio = new Date().getFullYear();

  return (
    <footer className='mt-auto bg-lc-verde text-lc-blanco'>
      <Container>
        <div className='grid gap-6 py-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6'>
          {/* Marca */}
          <div className='sm:col-span-2 lg:col-span-1'>
            <div className='flex items-center gap-2.5'>
              <span className='text-base font-bold tracking-tight'>
                {tienda.nombre}
              </span>
            </div>
            <p className='mt-3 max-w-xs text-xs leading-relaxed text-white/65'>
              {tienda.descripcion}. Encuentra tu equipo, tu temporada y tu
              historia.
            </p>
            <p className='mt-3 text-[10px] uppercase tracking-[0.2em] text-lc-rosa'>
              {tienda.eslogan}
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h2 className='text-[10px] font-semibold uppercase tracking-[0.2em] text-lc-rosa'>
              Navegación
            </h2>
            <ul className='mt-2.5 space-y-0.5'>
              <li>
                <Link
                  href='/'
                  className='inline-flex min-h-8 items-center text-xs text-white/75 transition-colors hover:text-lc-rosa focus-visible:outline-lc-rosa'
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href='/catalogo'
                  className='inline-flex min-h-8 items-center text-xs text-white/75 transition-colors hover:text-lc-rosa focus-visible:outline-lc-rosa'
                >
                  Catálogo completo
                </Link>
              </li>
              <li>
                <Link
                  href='/carrito'
                  className='inline-flex min-h-8 items-center text-xs text-white/75 transition-colors hover:text-lc-rosa focus-visible:outline-lc-rosa'
                >
                  Mi carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h2 className='text-[10px] font-semibold uppercase tracking-[0.2em] text-lc-rosa'>
              Categorías
            </h2>
            <ul className='mt-2.5 space-y-0.5'>
              {categorias.map((categoria) => (
                <li key={categoria.id}>
                  <Link
                    href={`/catalogo#${categoria.id}`}
                    className='inline-flex min-h-8 items-center text-xs text-white/75 transition-colors hover:text-lc-rosa focus-visible:outline-lc-rosa'
                  >
                    {categoria.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pedidos */}
          <div>
            <h2 className='text-[10px] font-semibold uppercase tracking-[0.2em] text-lc-rosa'>
              Pedidos
            </h2>
            <p className='mt-2.5 text-xs leading-relaxed text-white/65'>
              El pago y el envío se acuerdan directamente por WhatsApp.
            </p>
            <a
              href={enlaceWhatsApp}
              target={numero ? "_blank" : undefined}
              rel={numero ? "noopener noreferrer" : undefined}
              className='mt-3 inline-flex min-h-9 items-center rounded-full border border-white/30 px-4 text-xs font-semibold text-white transition-colors hover:border-lc-rosa hover:bg-lc-rosa hover:text-lc-negro focus-visible:outline-lc-rosa'
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>

        {/* Barra inferior */}
        <div className='flex flex-col gap-2 border-t border-white/15 py-4 text-[11px] text-white/50 sm:flex-row sm:items-center sm:justify-between'>
          <p>
            © {anio} {tienda.nombre}. Todos los derechos reservados.
          </p>
          <p>Catálogo sin afiliación oficial a clubes ni marcas deportivas.</p>
        </div>
      </Container>
    </footer>
  );
}
