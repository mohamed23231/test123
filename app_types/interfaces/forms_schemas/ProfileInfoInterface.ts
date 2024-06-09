// Interface for Company Account
export interface CompanyAccount {
  organization: string;
  register_number: string;
  tax_number: string;
  bio: string;
  phone: string;
  address: string;
  role: string;

  logo: string | null; // Image URL or null
}
export interface EditCompanyAccount {
  organization: string;
  register_number: string;
  tax_number: string;
  bio: string;
  phone: string;
  address: string;
  logo?: File | null; // Make logo property optional
}

// Interface for Manager Account
export interface ManagerAccount {
  first_name: string;
  last_name: string;
  phone: string;
  role: string;

  address: string;
}

// Interface for Driver Account
export interface DriverAccount {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  national_id: string;
  license_number: string;
  role: string;
  license_expiry_date: string;
}
