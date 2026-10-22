import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisa tus camisetas y genera el pedido por WhatsApp.",
};

export default function CarritoPage() {
  return (
    <section className='py-8 sm:py-12'>
      <Container>
        <div className='mb-6 max-w-2xl'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.22em] text-lc-rosa'>
            Tu selección
          </p>
          <h1 className='mt-1.5 text-2xl font-bold tracking-tight sm:text-3xl'>
            Carrito
          </h1>
          <p className='mt-2 text-xs leading-relaxed text-black/55 sm:text-sm'>
            Revisa las tallas y cantidades. Cuando esté listo, genera el pedido
            y envíalo por WhatsApp.
          </p>
        </div>

        <CartView />
      </Container>
    </section>
  );
}
