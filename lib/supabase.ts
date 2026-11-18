import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Order } from "@/types";

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set.");
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export async function createOrder(
  orderData: Omit<Order, "id" | "created_at">
): Promise<Order> {
  const { data, error } = await getSupabase()
    .from("orders")
    .insert([orderData])
    .select()
    .single();

  if (error) throw new Error(`Error creating order: ${error.message}`);
  return data;
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
  mpPaymentId?: string
): Promise<void> {
  const updateData: Partial<Order> = { status };
  if (mpPaymentId) updateData.mp_payment_id = mpPaymentId;

  const { error } = await getSupabase()
    .from("orders")
    .update(updateData)
    .eq("id", orderId);

  if (error) throw new Error(`Error updating order: ${error.message}`);
}

export async function getOrderById(id: string): Promise<Order | null> {
  const { data, error } = await getSupabase()
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await getSupabase()
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Error fetching orders: ${error.message}`);
  return data || [];
}

export async function getOrderByMpPreferenceId(
  preferenceId: string
): Promise<Order | null> {
  const { data, error } = await getSupabase()
    .from("orders")
    .select("*")
    .eq("mp_preference_id", preferenceId)
    .single();

  if (error) return null;
  return data;
}

// Named export for direct access when needed
export { getSupabase as supabase };
