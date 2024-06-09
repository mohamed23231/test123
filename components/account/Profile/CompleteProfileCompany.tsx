import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Spinner } from "@nextui-org/spinner";
import GenericFormControl from "@components/form/GenericInput";
import { CompanyAccount } from "@app_types/interfaces/forms_schemas/AccountInfoSchemaInterface";

interface AccountInfoProp {
  isLoading: boolean;
  errors: FieldErrors<CompanyAccount>;
  register: UseFormRegister<CompanyAccount>;
  handleSubmit: UseFormHandleSubmit<CompanyAccount, undefined>;
  accountInfoSubmitHandler: (data: CompanyAccount) => void;
}

function CompleteProfileCompany({
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
        <GenericFormControl<CompanyAccount>
          label="Enter your organization name"
          name="organization"
          placeholder="Enter your first name"
          type="string"
          register={register}
          errors={
            errors.organization?.message ? [errors.organization.message] : []
          }
          valueAsNumber={false}
        />
        <GenericFormControl<CompanyAccount>
          label="Enter your register number"
          name="register_number"
          placeholder="Enter your last name"
          type="string"
          register={register}
          errors={
            errors.register_number?.message
              ? [errors.register_number.message]
              : []
          }
          valueAsNumber={false}
        />
        <GenericFormControl<CompanyAccount>
          label="Enter your tax number"
          name="tax_number"
          placeholder="tax number"
          type="string"
          register={register}
          errors={errors.tax_number?.message ? [errors.tax_number.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<CompanyAccount>
          label="Write your bio"
          name="bio"
          placeholder="bio"
          type="string"
          register={register}
          errors={errors.bio?.message ? [errors.bio.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<CompanyAccount>
          label="Enter your phone number"
          name="phone"
          placeholder="phone"
          type="string"
          register={register}
          errors={errors.phone?.message ? [errors.phone.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<CompanyAccount>
          label="Enter your address"
          name="address"
          placeholder="address"
          type="string"
          register={register}
          errors={errors.address?.message ? [errors.address.message] : []}
          valueAsNumber={false}
        />

        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2.5">
          {isLoading ? <Spinner size="sm" color="success" /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CompleteProfileCompany;
