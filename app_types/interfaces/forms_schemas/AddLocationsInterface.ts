export interface AddLocationsInterface {
  title: string;
  address: string;
  phone: string;
  gate: string;
  type: "loading" | "unloading"; // Specify the allowed values for type
  details?: string | null;
}
