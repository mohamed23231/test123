export interface TripSchemaInterface {
  product: string; // Required
  quantity: string; // Required, minimum value is 1
  unit: string; // Required
  driver: string | number; // Required
  vehicle: string | number; // Required
  load_location: string | number; // Required
  delivery_date: string; // Required, formatted as date
  trip_count: string; // Required, minimum value is 1
}
