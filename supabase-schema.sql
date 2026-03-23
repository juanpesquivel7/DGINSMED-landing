-- Tabla de pedidos para TuTienda
-- Ejecutar en Supabase SQL Editor

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled')),
  mp_payment_id TEXT,
  mp_preference_id TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL,
  shipping_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
  total NUMERIC(12, 2) NOT NULL
);

-- Índices para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS orders_mp_preference_id_idx ON orders (mp_preference_id);
CREATE INDEX IF NOT EXISTS orders_customer_email_idx ON orders (customer_email);

-- Row Level Security (RLS) - desactivado para acceso desde server-side
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- Comentarios
COMMENT ON TABLE orders IS 'Pedidos del e-commerce TuTienda';
COMMENT ON COLUMN orders.status IS 'Estado: pending | paid | shipped | cancelled';
COMMENT ON COLUMN orders.shipping_address IS 'JSONB: {calle, numero, piso?, depto?, ciudad, provincia, cp}';
COMMENT ON COLUMN orders.items IS 'JSONB array: [{name, quantity, price, image?}]';
