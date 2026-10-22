import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ProductDetail } from "@/components/ProductDetail";
import { getProducto, productos } from "@/lib/catalog";

interface ProductoPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return productos.map((producto) => ({ id: producto.id }));
}

export async function generateMetadata({
  params,
}: ProductoPageProps): Promise<Metadata> {
  const { id } = await params;
  const producto = getProducto(id);

  if (!producto) {
    return { title: "Producto no encontrado" };
  }

  return {
    title: producto.nombre,
    description: producto.descripcion,
  };
}

export default async function ProductoPage({ params }: ProductoPageProps) {
  const { id } = await params;
  const producto = getProducto(id);

  if (!producto) {
    notFound();
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <Container>
        <ProductDetail producto={producto} />
      </Container>
    </section>
  );
}
