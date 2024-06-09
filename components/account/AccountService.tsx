import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Spinner } from "@nextui-org/spinner";
import GenericFormControl from "@components/form/GenericInput";
import { AccountServiceSchemaInterface } from "@app_types/interfaces/forms_schemas/AccountServiceSchemaInterface";

interface AccountServiceProp {
  isLoading: boolean;
  errors: FieldErrors<AccountServiceSchemaInterface>;
  register: UseFormRegister<AccountServiceSchemaInterface>;
  handleSubmit: UseFormHandleSubmit<AccountServiceSchemaInterface, undefined>;
  accountServiceSubmitHandler: (data: AccountServiceSchemaInterface) => void;
}

const AccountService = ({
  accountServiceSubmitHandler,
  register,
  handleSubmit,
  errors,
  isLoading,
}: AccountServiceProp) => {
  console.log("AccountService component rendered");
  console.log(errors);
  return (
    <>
      <div className="mt-20 flex justify-center items-center">
        <form
          noValidate
          className="max-w-sm mx-auto grow"
          onSubmit={handleSubmit(accountServiceSubmitHandler)}
        >
          <GenericFormControl<AccountServiceSchemaInterface>
            label="Enter your Service Name"
            name="title"
            placeholder="Service title"
            type="string"
            register={register}
            errors={errors.title?.message ? [errors.title.message] : []}
            valueAsNumber={false}
          />
          <GenericFormControl<AccountServiceSchemaInterface>
            label="Enter Service Description"
            name="description"
            placeholder="description"
            type="string"
            register={register}
            errors={
              errors.description?.message ? [errors.description.message] : []
            }
            valueAsNumber={false}
          />
          <GenericFormControl<AccountServiceSchemaInterface>
            label="unit"
            name="unit"
            placeholder="unite"
            type="string"
            register={register}
            errors={errors.unit?.message ? [errors.unit.message] : []}
            valueAsNumber={false}
          />
          {/* <GenericFormControl<AccountServiceSchemaInterface>
            label="Enter your Service price"
            name="price"
            placeholder="city"
            type="string"
            register={register}
            errors={errors.price?.message ? [errors.price.message] : []}
            valueAsNumber={false}
          />
          <div className="mb-5">
            <label
              htmlFor="available"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Available
            </label>
            <select
              id="available"
              {...register("available")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div> */}

          <button
            disabled={isLoading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2.5"
          >
            {isLoading ? <Spinner size="sm" color="success" /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};
export default AccountService;
