import { tienda } from "@/lib/catalog";

// Lee el número desde las variables de entorno públicas de Next.js.
// Si falta, avisa en consola y devuelve null para no romper la interfaz.
export function obtenerNumeroWhatsApp(): string | null {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

  if (!numero) {
    console.error(
      "[La Camiseta] Falta NEXT_PUBLIC_WHATSAPP_NUMBER. Define un número con prefijo de país, por ejemplo 34600000000.",
    );
    return null;
  }

  return numero;
}

// La URL de hosting se usa para compartir productos y construir enlaces absolutos.
export function obtenerUrlHosting(): string {
  const url = process.env.NEXT_PUBLIC_HOSTING_URL?.trim();

  if (!url) {
    console.error(
      "[La Camiseta] Falta NEXT_PUBLIC_HOSTING_URL. Se usará la URL de respaldo del JSON de configuración.",
    );
    return tienda.hosting.replace(/\/+$/, "");
  }

  return url.replace(/\/+$/, "");
}
