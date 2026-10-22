export interface Tienda {
  nombre: string;
  descripcion: string;
  eslogan: string;
  whatsapp: string;
  hosting: string;
  moneda: string;
  simboloMoneda: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
}

// Cada dorsal tiene sus propias tallas disponibles
export interface Dorsal {
  numero: string;
  tallas: string[];
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagenes: string[];
  // Lista de dorsales con sus tallas. Si el producto no tiene dorsales,
  // se puede usar `tallas` como fallback (ver abajo).
  dorsales: Dorsal[];
  // Tallas generales para productos sin dorsal (ej. retro sin número)
  tallas: string[];
  destacado: boolean;
}

export interface ConfiguracionTienda {
  tienda: Tienda;
  categorias: Categoria[];
  productos: Producto[];
}

export interface CartItem {
  productoId: string;
  talla: string;
  dorsal: string;
  cantidad: number;
}

export interface LineaPedido {
  item: CartItem;
  producto: Producto;
  subtotal: number;
}
