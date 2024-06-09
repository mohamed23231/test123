export interface ExportOrder {
  id: number;
  uid: string;
  status: string;
  customer_id: number;
  customer_name: string;
  product: string;
  quantity: number;
  unit: string;
  customer_location: CustomerLocation;
  note: string | null;
  created_at: string;
  delivery_start_date: string;
  delivery_end_date: string;
  trip_count: number;
  rejection_reason: string | null;
}

export interface CustomerLocation {
  id: number;
  type: string;
  title: string;
  address: string;
  gate: string;
  [key: string]: any; // to allow any additional properties
}

export interface ExportOrdersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ExportOrder[];
}

// Example usage
export const exampleResponse: ExportOrdersResponse = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 5,
      uid: "OR2405045",
      status: "requested",
      customer_id: 12,
      customer_name: "HIET KFS",
      product: "حديد",
      quantity: 2,
      unit: "طن",
      customer_location: {
        id: 18,
        type: "unloading",
        title: "test",
        address: "test",
        gate: "as",
      },
      note: null,
      created_at: "2024-05-04T23:25:29.668462",
      delivery_start_date: "2024-05-05",
      delivery_end_date: "2024-05-18",
      trip_count: 0,
      rejection_reason: null,
    },
    // Add other ExportOrder objects here as needed
  ],
};
