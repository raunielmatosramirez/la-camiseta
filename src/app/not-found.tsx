import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className='py-16 sm:py-24'>
      <Container>
        <div className='mx-auto max-w-xl border border-black/10 bg-lc-verde/5 px-6 py-14 text-center'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-lc-rosa'>
            Error 404
          </p>
          <h1 className='mt-3 text-3xl font-bold tracking-tight sm:text-4xl'>
            Esta camiseta no está en el catálogo
          </h1>
          <p className='mt-3 text-sm leading-relaxed text-black/60'>
            Puede que el enlace ya no exista o que el producto haya cambiado de
            nombre.
          </p>
          <Link
            href='/catalogo'
            className='mt-7 inline-flex min-h-12 items-center justify-center border border-lc-verde bg-lc-verde px-6 text-sm font-semibold text-lc-blanco transition-colors hover:border-lc-rosa hover:bg-lc-rosa hover:text-lc-negro'
          >
            Volver al catálogo
          </Link>
        </div>
      </Container>
    </section>
  );
}
