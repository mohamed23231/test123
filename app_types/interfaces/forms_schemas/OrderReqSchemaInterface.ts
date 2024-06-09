export interface OrderReqSchemaInterface {
  product?: string;
  quantity: string;
  unit?: string;
  customer_location: string;
  note?: string;
  delivery_start_date: string;
  delivery_end_date: string;
}
