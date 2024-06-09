export interface OrderInfoSchemaInterface {
  items: OrderItem[];
  unloading_location: OrderUnloadingLocation;
  note: string;
}

export interface OrderItem {
  service: number;
  quantity: number;
}

export interface OrderUnloadingLocation {
  name: string;
  address: string;
  phone: string;
  details: string;
}
