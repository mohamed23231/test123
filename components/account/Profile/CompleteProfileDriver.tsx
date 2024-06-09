import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Spinner } from "@nextui-org/spinner";
import GenericFormControl from "@components/form/GenericInput";
import { DriverAccount } from "@app_types/interfaces/forms_schemas/AccountInfoSchemaInterface";

interface AccountInfoProp {
  isLoading: boolean;
  errors: FieldErrors<DriverAccount>;
  register: UseFormRegister<DriverAccount>;
  handleSubmit: UseFormHandleSubmit<DriverAccount, undefined>;
  accountInfoSubmitHandler: (data: DriverAccount) => void;
}

function CompleteProfileDriver({
  accountInfoSubmitHandler,
  register,
  handleSubmit,
  errors,
  isLoading,
}: AccountInfoProp) {
  return (
    <div className="mt-20 flex justify-center items-center">
      <form
        noValidate
        className="max-w-sm mx-auto grow"
        onSubmit={handleSubmit(accountInfoSubmitHandler)}
      >
        <GenericFormControl<DriverAccount>
          label="Enter your first name"
          name="first_name"
          placeholder="Enter your first name"
          type="string"
          register={register}
          errors={errors.first_name?.message ? [errors.first_name.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<DriverAccount>
          label="Enter your last number"
          name="last_name"
          placeholder="Enter your last name"
          type="string"
          register={register}
          errors={errors.last_name?.message ? [errors.last_name.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<DriverAccount>
          label="Enter your phone number"
          name="phone"
          placeholder="phone number"
          type="string"
          register={register}
          errors={errors.phone?.message ? [errors.phone.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<DriverAccount>
          label="Write your address"
          name="address"
          placeholder="address"
          type="string"
          register={register}
          errors={errors.address?.message ? [errors.address.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<DriverAccount>
          label="Enter your national_id"
          name="national_id"
          placeholder="national_id"
          type="string"
          register={register}
          errors={
            errors.national_id?.message ? [errors.national_id.message] : []
          }
          valueAsNumber={false}
        />
        <GenericFormControl<DriverAccount>
          label="Enter your license Number"
          name="license_number"
          placeholder="license_number"
          type="string"
          register={register}
          errors={
            errors.license_number?.message
              ? [errors.license_number.message]
              : []
          }
          valueAsNumber={false}
        />

        <div className="relative max-w-sm">
          <label htmlFor="license_expiry_date">License Expiry Date</label>
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
          <input
            id={"license_expiry_date"}
            type="date"
            {...register("license_expiry_date", { valueAsNumber: false })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
          />
        </div>

        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2.5">
          {isLoading ? <Spinner size="sm" color="success" /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CompleteProfileDriver;
