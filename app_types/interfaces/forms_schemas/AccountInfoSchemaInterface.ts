export interface AccountInfoSchemaInterface {
  organization: string;
  register_number: string;
  tax_number: string;
  city: string;
  street: string;
  phone: string;
  bio: string;
}

// Company Account Interface
export interface CompanyAccount {
  organization: string;
  register_number: string;
  tax_number: string;
  bio: string;
  phone: string;
  address: string;
  logo?: string; // Optional property
}

// Manager Account Interface
export interface ManagerAccount {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
}

// Driver Account Interface
export interface DriverAccount {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  national_id: string;
  license_number: string;
  license_expiry_date: string; // Format: YYYY-MM-DD
}

export interface AddEmployees {
  email: string;
  role: "manager" | "driver";
}
