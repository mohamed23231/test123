export interface SignupSchemaInterface {
  email: string;
  password: string;
  role: "company" | "manager" | "driver"; // Restricting role to specific values
  confirmPassword: string;
}
