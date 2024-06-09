import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Spinner } from "@nextui-org/spinner";
import GenericFormControl from "@components/form/GenericInput";
import { ManagerAccount } from "@app_types/interfaces/forms_schemas/AccountInfoSchemaInterface";

interface AccountInfoProp {
  isLoading: boolean;
  errors: FieldErrors<ManagerAccount>;
  register: UseFormRegister<ManagerAccount>;
  handleSubmit: UseFormHandleSubmit<ManagerAccount, undefined>;
  accountInfoSubmitHandler: (data: ManagerAccount) => void;
}

function CompleteProfileManager({
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
        <GenericFormControl<ManagerAccount>
          label="Enter your first name"
          name="first_name"
          placeholder="Enter your first name"
          type="string"
          register={register}
          errors={errors.first_name?.message ? [errors.first_name.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<ManagerAccount>
          label="Enter your last number"
          name="last_name"
          placeholder="Enter your last name"
          type="string"
          register={register}
          errors={errors.last_name?.message ? [errors.last_name.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<ManagerAccount>
          label="Enter your phone number"
          name="phone"
          placeholder="phone number"
          type="string"
          register={register}
          errors={errors.phone?.message ? [errors.phone.message] : []}
          valueAsNumber={false}
        />
        <GenericFormControl<ManagerAccount>
          label="Write your address"
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

export default CompleteProfileManager;
