export interface Service {
  id: number;
  title: string;
  description: string;
  unit: string;
  created_at: string;
}

export interface MyServicesInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: Service[];
}
export interface Company {
  id: number;
  organization: string;
  register_number: string;
  tax_number: string;
  bio: string;
  phone: string;
  address: string;
  logo: string | null;
}

export interface CompaniesList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Company[];
}
