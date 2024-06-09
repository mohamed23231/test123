interface CustomerLocation {
  id: number;
  type: string;
  title: string;
  address: string;
  gate: string;
  phone: string;
  details: string;
  created_at: string;
}

export interface RequestedOrder {
  id: number | string;
  uid: string;
  status: string;
  customer_id?: number; // Optional
  customer_name?: string; // Optional
  company_id?: string; // Optional
  company_name?: number; // Optional
  product: string;
  quantity: number;
  unit: string;
  customer_location: CustomerLocation;
  note: string | null;
  created_at: string;
  delivery_start_date: string;
  delivery_end_date: string;
  trip_count: number | string;
  rejection_reason?: string | null; // Optional
}
export interface Status {
  status: "accepted" | "rejected" | "cancelled"; // Enum for status field
  rejection_reason?: string; // Optional field for rejection reason
}
