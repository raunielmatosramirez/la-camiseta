import type { Metadata } from "next";
import { CatalogView } from "@/components/CatalogView";
import { Container } from "@/components/Container";
import { tienda } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Todas las camisetas de fútbol disponibles: temporada actual, retro y temporadas antiguas.",
};

export default function CatalogoPage() {
  return (
    <section className='py-8 sm:py-12'>
      <Container>
        <div className='mb-6 max-w-2xl'>
          <div className='flex items-center gap-2'>
            <span
              aria-hidden='true'
              className='h-1 w-6 rounded-full bg-lc-rosa'
            />
            <p className='text-[10px] font-semibold uppercase tracking-[0.22em] text-lc-rosa'>
              {tienda.nombre} · Catálogo
            </p>
          </div>
          <h1 className='mt-1.5 text-2xl font-bold tracking-tight sm:text-3xl'>
            Todas las camisetas
          </h1>
          <p className='mt-2 text-xs leading-relaxed text-black/55 sm:text-sm'>
            Temporada actual, diseños retro y camisetas de temporadas pasadas.
            Filtra por categoría y elige tu talla.
          </p>
        </div>

        <CatalogView />
      </Container>
    </section>
  );
}
