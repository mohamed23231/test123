import {
  CompanyAccount,
  ManagerAccount,
  DriverAccount,
  AccountInfoSchemaInterface,
} from "@app_types/interfaces/forms_schemas/AccountInfoSchemaInterface";
import { EditCompanyAccount } from "@app_types/interfaces/forms_schemas/ProfileInfoInterface";

import { z, ZodType } from "zod";

// TODO: please delete unused code
const accountInfoSchemaObject = {
  organization: z.string(),
  register_number: z.string(),
  tax_number: z.string(),
  city: z.string(),
  street: z.string(),
  phone: z.string(),
  bio: z.string(),
  // logo: z.string()
};

const accountInfoSchema: ZodType<AccountInfoSchemaInterface> = z.object(
  accountInfoSchemaObject
);
export { accountInfoSchema };
///////////////////////
const companyAccountSchemaObject = z.object({
  organization: z.string().min(4),
  register_number: z.string().min(4),
  tax_number: z
    .string()
    .regex(
      /^3\d{13}3$/,
      "Tax number must be 15 digits long and start and end with 3"
    ),
  bio: z.string().min(15).max(500),
  phone: z
    .string()
    .regex(/^\+[1-9]\d{1,14}$/, "Phone number must be in international format"),
  address: z.string().min(10),
  logo: z.string().optional(), // Assuming logo is optional
});

const companyAccountSchema: ZodType<CompanyAccount> =
  companyAccountSchemaObject;
export { companyAccountSchema };
//////////////////////////////
const editCompanyAccountSchemaObject = z
  .object({
    organization: z.string().min(4),
    register_number: z.string().min(4),
    tax_number: z
      .string()
      .regex(
        /^3\d{13}3$/,
        "Tax number must be 15 digits long and start and end with 3"
      ),
    bio: z.string().min(15).max(500),
    phone: z
      .string()
      .regex(
        /^\+[1-9]\d{1,14}$/,
        "Phone number must be in international format"
      ),
    address: z.string().min(10),
    logo: z.any().nullable(), // Allow any type and null
  })
  .nullable(); // Allow the entire object to be null

const editCompanyAccountSchema: z.ZodType<EditCompanyAccount | null> =
  editCompanyAccountSchemaObject;

export { editCompanyAccountSchema };

// Define Zod schema for Manager Account
const managerAccountSchemaObject = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  phone: z
    .string()
    .regex(/^\+[1-9]\d{1,14}$/, "Phone number must be in international format"),
  address: z.string().min(10),
});

const managerAccountSchema: ZodType<ManagerAccount> =
  managerAccountSchemaObject;
export { managerAccountSchema };

// Define Zod schema for Driver Account
const driverAccountSchemaObject = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  phone: z
    .string()
    .regex(/^\+[1-9]\d{1,14}$/, "Phone number must be in international format"),
  address: z.string().min(10),
  national_id: z.string().min(6).max(20),
  license_number: z.string().min(6).max(20),
  license_expiry_date: z.string(), // Format: YYYY-MM-DD
});

const driverAccountSchema: ZodType<DriverAccount> = driverAccountSchemaObject;
export { driverAccountSchema };
