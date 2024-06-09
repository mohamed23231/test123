export interface VehicleSchemaInterface {
  plate_number: string;
  type: string; // Add other vehicle types if needed
  model: string;
  examination_date: string; // Date format: "YYYY-MM-DD"
  application_date: string; // Date format: "YYYY-MM-DD"
  insurance_date: string; // Date format: "YYYY-MM-DD"
}

export interface getAllVehicleSchemaInterface {
  id: number;
  plate_number: string;
  type: "truck" | "car"; // Add other vehicle types if needed
  model: string;
  examination_date: string; // Date format: "YYYY-MM-DD"
  application_date: string; // Date format: "YYYY-MM-DD"
  insurance_date: string; // Date format: "YYYY-MM-DD"
  created_at: string; // Date-time format: "YYYY-MM-DDTHH:MM:SS.SSSZ"
}
