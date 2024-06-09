interface LoadLocation {
  id: string;
  type: string;
  title: string;
  address: string;
  gate: string;
  phone: string;
  details: string;
  created_at: string;
}

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

export interface Trip {
  id: number;
  uid: string;
  status: string;
  product: string;
  quantity: number;
  unit: string;
  driver: string;
  vehicle: string;
  load_location: LoadLocation;
  customer_id: number;
  customer_name: string;
  customer_location: CustomerLocation;
  delivery_date: string;
  note: string | null;
  created_at: string;
  trip_count: number;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Trip[];
}
