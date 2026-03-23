export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  weight: number; // en gramos
  stock: number;
  variants?: ProductVariant[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface ShippingAddress {
  calle: string;
  numero: string;
  piso?: string;
  depto?: string;
  ciudad: string;
  provincia: string;
  cp: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

export interface Order {
  id: string;
  created_at: string;
  status: OrderStatus;
  mp_payment_id?: string;
  mp_preference_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  shipping_cost: number;
  total: number;
}

export interface AndreanQuoteResponse {
  price: number;
  estimatedDays: string;
  service: string;
}
