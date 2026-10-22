import type { Metadata, Viewport } from "next";
import "../app/globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { tienda } from "@/lib/catalog";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOSTING_URL || tienda.hosting),
  title: {
    default: `${tienda.nombre} — ${tienda.descripcion}`,
    template: `%s · ${tienda.nombre}`,
  },
  description: `${tienda.descripcion}. ${tienda.eslogan}`,
  applicationName: tienda.nombre,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: tienda.nombre,
    title: `${tienda.nombre} — ${tienda.descripcion}`,
    description: `${tienda.descripcion}. ${tienda.eslogan}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1B3A2F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body>
        <CartProvider>
          <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
