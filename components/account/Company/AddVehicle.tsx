import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Spinner } from "@nextui-org/spinner";
import GenericFormControl from "@components/form/GenericInput";
import { VehicleSchemaInterface } from "@app_types/interfaces/forms_schemas/VehicleSchemaInterface";

interface AccountInfoProp {
  isLoading: boolean;
  errors: FieldErrors<VehicleSchemaInterface>;
  register: UseFormRegister<VehicleSchemaInterface>;
  handleSubmit: UseFormHandleSubmit<VehicleSchemaInterface, undefined>;
  addVehicleHandler: (data: VehicleSchemaInterface) => void;
}

function AddVehicle({
  addVehicleHandler,
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
        onSubmit={handleSubmit(addVehicleHandler)}
      >
        <GenericFormControl<VehicleSchemaInterface>
          label="Enter your plate number"
          name="plate_number"
          placeholder="plate number"
          type="email"
          register={register}
          errors={
            errors.plate_number?.message ? [errors.plate_number.message] : []
          }
          valueAsNumber={false}
        />
        <div className="mb-5">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Vehicle Type
          </label>
          <select
            id="type"
            {...register("type")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected disabled hidden>
              Choose here
            </option>

            <option value="truck">truck</option>
            <option value="car">Car </option>
            {/* <option value="car">car</option>
            <option value="motorcycle">motorcycle </option> */}
          </select>
        </div>

        {/* <GenericFormControl<VehicleSchemaInterface>
          label="Enter your Vehicle Type"
          name="type"
          placeholder="Vehicle Type"
          type="email"
          register={register}
          errors={errors.type?.message ? [errors.type.message] : []}
          valueAsNumber={false}
        /> */}
        <GenericFormControl<VehicleSchemaInterface>
          label="Enter your Vehicle Model"
          name="model"
          placeholder="Vehicle model"
          type="email"
          register={register}
          errors={errors.model?.message ? [errors.model.message] : []}
          valueAsNumber={false}
        />
        <label
          htmlFor={"examination_date"}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter your vehicle examination Date
        </label>

        <div className="relative max-w-sm mb-5">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            id={"examination_date"}
            type="date"
            {...register("examination_date", { valueAsNumber: false })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
          />
        </div>
        <label
          htmlFor={"application_date"}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter your vehicle Application Date
        </label>

        <div className="relative max-w-sm mb-5">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            id={"application_date"}
            type="date"
            {...register("application_date", { valueAsNumber: false })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
          />
        </div>
        <label
          htmlFor={"insurance_date"}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter your vehicle Insurance Date
        </label>

        <div className="relative max-w-sm mb-5">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            id={"insurance_date"}
            type="date"
            {...register("insurance_date", { valueAsNumber: false })}
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

export default AddVehicle;
