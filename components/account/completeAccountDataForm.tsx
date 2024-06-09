import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Spinner } from "@nextui-org/spinner";
import GenericFormControl from "@components/form/GenericInput";
import { AccountInfoSchemaInterface } from "@app_types/interfaces/forms_schemas/AccountInfoSchemaInterface";

interface AccountInfoProp {
  isLoading: boolean;
  errors: FieldErrors<AccountInfoSchemaInterface>;
  register: UseFormRegister<AccountInfoSchemaInterface>;
  handleSubmit: UseFormHandleSubmit<AccountInfoSchemaInterface, undefined>;
  accountInfoSubmitHandler: (data: AccountInfoSchemaInterface) => void;
}

function CompleteAccountDataForm({
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
        <GenericFormControl<AccountInfoSchemaInterface>
          label="Enter your organization"
          name="organization"
          placeholder="organization name"
          type="string"
          register={register}
          errors={
            errors.organization?.message ? [errors.organization.message] : []
          }
          valueAsNumber={false}
        />
        <GenericFormControl<AccountInfoSchemaInterface>
          label="Enter your register number"
          name="register_number"
          placeholder="register number"
          type="string"
          register={register}
          errors={
            errors.register_number?.message
              ? [errors.register_number.message]
              : []
          }
          valueAsNumber={false}
        />
        <GenericFormControl<AccountInfoSchemaInterface>
          label="Enter your tax number"
          name="tax_number"
          placeholder="tax number"
          type="string"
          register={register}
          errors={errors.tax_number?.message ? [errors.tax_number.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<AccountInfoSchemaInterface>
          label="Enter your city"
          name="city"
          placeholder="city"
          type="string"
          register={register}
          errors={errors.city?.message ? [errors.city.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<AccountInfoSchemaInterface>
          label="Enter your street"
          name="street"
          placeholder="street"
          type="string"
          register={register}
          errors={errors.street?.message ? [errors.street.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<AccountInfoSchemaInterface>
          label="Enter your street"
          name="phone"
          placeholder="phone"
          type="string"
          register={register}
          errors={errors.phone?.message ? [errors.phone.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<AccountInfoSchemaInterface>
          label="bio ..."
          name="bio"
          placeholder="bio"
          type="string"
          register={register}
          errors={errors.bio?.message ? [errors.bio.message] : []}
          valueAsNumber={false}
        />
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2.5">
          {isLoading ? <Spinner size="sm" color="success" /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CompleteAccountDataForm;
