"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { useCart } from "@/components/CartProvider";

const enlaces = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#como-funciona", label: "Cómo comprar" },
];

function claseEnlace(activo: boolean): string {
  return `flex min-h-9 items-center px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lc-azul ${
    activo ? "text-lc-negro" : "text-lc-negro/60 hover:text-lc-negro"
  }`;
}

export function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const pathname = usePathname();
  const { totalItems, hydrated } = useCart();
  const botonMenuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuAbierto(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuAbierto) return;

    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuAbierto(false);
        botonMenuRef.current?.focus();
      }
    };

    document.addEventListener("keydown", cerrarConEscape);
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [menuAbierto]);

  return (
    <header className='sticky top-0 z-50 bg-lc-blanco text-lc-negro'>
      {/* Franja deportiva de rayas rosadas */}
      <div aria-hidden='true' className='flex h-1.5 w-full'>
        <span className='h-full flex-1 bg-lc-rosa' />
        <span className='h-full flex-1 bg-lc-negro' />
        <span className='h-full flex-1 bg-lc-rosa' />
        <span className='h-full flex-1 bg-lc-negro' />
        <span className='h-full flex-1 bg-lc-rosa' />
      </div>

      <Container>
        <div className='flex h-14 items-center justify-between gap-4 md:h-16'>
          {/* Logo limpio */}
          <Link
            href='/'
            aria-label='La Camiseta, ir al inicio'
            className='flex min-h-9 flex-col justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lc-azul'
          >
            <span className='text-base font-bold tracking-tight sm:text-lg'>
              La Camiseta
            </span>
            <span className='text-[9px] uppercase tracking-[0.2em] text-lc-azul'>
              Fútbol · Todas las épocas
            </span>
          </Link>

          <div className='flex items-center gap-1 sm:gap-2'>
            {/* Navegación escritorio */}
            <nav
              className='hidden items-center gap-1 md:flex'
              aria-label='Navegación principal'
            >
              {enlaces.map((enlace) => (
                <Link
                  key={enlace.href}
                  href={enlace.href}
                  aria-current={pathname === enlace.href ? "page" : undefined}
                  className={claseEnlace(pathname === enlace.href)}
                >
                  {enlace.label}
                </Link>
              ))}
            </nav>

            {/* Carrito */}
            <Link
              href='/carrito'
              aria-label={
                totalItems > 0
                  ? `Carrito, ${totalItems} artículos`
                  : "Carrito, vacío"
              }
              className='relative flex h-9 w-9 items-center justify-center text-lc-negro/70 transition-colors hover:text-lc-negro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lc-azul'
            >
              <svg
                aria-hidden='true'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.6'
                className='h-5 w-5'
              >
                <path d='M6 8h12l-1 12H7L6 8Z' />
                <path d='M9 9V6a3 3 0 0 1 6 0v3' />
              </svg>
              {hydrated && totalItems > 0 ? (
                <span className='absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-lc-rosa px-1 text-[10px] font-bold leading-none text-lc-negro'>
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              ) : null}
            </Link>

            {/* Botón menú móvil */}
            <button
              ref={botonMenuRef}
              type='button'
              onClick={() => setMenuAbierto((abierto) => !abierto)}
              aria-expanded={menuAbierto}
              aria-controls='menu-principal-movil'
              aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
              className='flex h-9 w-9 items-center justify-center text-lc-negro/70 transition-colors hover:text-lc-negro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lc-azul md:hidden'
            >
              {menuAbierto ? (
                <svg
                  aria-hidden='true'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.6'
                  className='h-5 w-5'
                >
                  <path d='M6 6l12 12M18 6L6 18' />
                </svg>
              ) : (
                <svg
                  aria-hidden='true'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.6'
                  className='h-5 w-5'
                >
                  <path d='M4 7h16M4 12h16M4 17h16' />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Menú móvil limpio */}
      {menuAbierto ? (
        <div
          id='menu-principal-movil'
          className='border-t border-lc-negro/10 bg-lc-blanco md:hidden'
        >
          <Container>
            <nav aria-label='Navegación móvil'>
              <ul className='flex flex-col py-1'>
                {enlaces.map((enlace) => (
                  <li key={enlace.href}>
                    <Link
                      href={enlace.href}
                      onClick={() => setMenuAbierto(false)}
                      className='flex min-h-10 items-center px-1 text-sm font-medium text-lc-negro/70 transition-colors hover:text-lc-negro'
                    >
                      {enlace.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href='/carrito'
                    onClick={() => setMenuAbierto(false)}
                    className='flex min-h-10 items-center px-1 text-sm font-medium text-lc-negro/70 transition-colors hover:text-lc-negro'
                  >
                    Carrito{totalItems > 0 ? ` (${totalItems})` : ""}
                  </Link>
                </li>
              </ul>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
