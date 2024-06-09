export interface LoadingLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  title: string;
  gate: string;
  details?: string; // Optional field
  created_at?: string; // Optional field
}

export interface AddressInterface {
  count: number;
  next: string | null; // URI or null
  previous: string | null; // URI or null
  results: LoadingLocation[];
}
