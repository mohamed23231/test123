import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Spinner } from "@nextui-org/spinner";
import GenericFormControl from "@components/form/GenericInput";
import { AddEmployees } from "@app_types/interfaces/forms_schemas/AccountInfoSchemaInterface";

interface AccountInfoProp {
  isLoading: boolean;
  errors: FieldErrors<AddEmployees>;
  register: UseFormRegister<AddEmployees>;
  handleSubmit: UseFormHandleSubmit<AddEmployees, undefined>;
  accountInfoSubmitHandler: (data: AddEmployees) => void;
}

function AddEmplyees({
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
        <GenericFormControl<AddEmployees>
          label="Enter your Employee Name"
          name="email"
          placeholder="email@y.com"
          type="email"
          register={register}
          errors={errors.email?.message ? [errors.email.message] : []}
          valueAsNumber={false}
        />
        <div className="mb-5">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role
          </label>
          <select
            id="role"
            {...register("role")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected disabled hidden>
              Choose here
            </option>

            <option value="manager">Manager</option>
            <option value="driver">Driver </option>
          </select>
        </div>

        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2.5">
          {isLoading ? <Spinner size="sm" color="success" /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddEmplyees;
