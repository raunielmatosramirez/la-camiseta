const formateadorNumero = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function redondear(valor: number): number {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

export function formatearPrecio(valor: number, simbolo: string): string {
  return `${formateadorNumero.format(redondear(valor))} ${simbolo}`;
}
