export interface Employee {
  created_at: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  national_id: string;
  license_number: string;
  license_expiry_date: string;
  id: number;
  role: string;
}

export interface EmployeeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Employee[];
}
