export interface CompanyInfo {
  id: number;
  organization: string;
  register_number: string;
  tax_number: string;
  bio: string;
  phone: string;
  address: string;
  logo: string | null; // Assuming logo can be a URL or null
}
