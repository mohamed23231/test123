export interface Service {
  company: string;
  product: string;
  quantity: string;
  unit: string;
  customer_location: string;
  delivery_start_date: string;
  delivery_end_date: string;
  companyLogo: string;
  serviceLogo: string;
  companyTitle: string;
  note: string;
}

export interface Company {
  services: Service[];
}

export interface CartState {
  [companyId: string]: Company;
}
