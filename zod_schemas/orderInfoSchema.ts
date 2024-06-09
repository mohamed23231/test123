import { z, ZodType } from "zod";

interface OrderItem {
  service: number;
  quantity: number;
}

interface OrderUnloadingLocation {
  name: string;
  address: string;
  phone: string;
  details: string | null;
}

interface OrderInfoSchemaInterface {
  items: OrderItem[];
  unloading_location: OrderUnloadingLocation;
  note: string | null;
}

const orderItemSchemaObject = {
  service: z.number(),
  quantity: z.number(),
};

const orderUnloadingLocationSchemaObject = {
  name: z.string().min(1).max(255),
  address: z.string().min(1).max(255),
  phone: z.string().min(1).max(30),
  details: z.string().nullable(),
};

const orderInfoSchemaObject = {
  items: z.array(z.object(orderItemSchemaObject)),
  unloading_location: z.object(orderUnloadingLocationSchemaObject),
  note: z.string().nullable(),
};

const orderInfoSchema: ZodType<OrderInfoSchemaInterface> = z.object(
  orderInfoSchemaObject
);

export { orderInfoSchema };
