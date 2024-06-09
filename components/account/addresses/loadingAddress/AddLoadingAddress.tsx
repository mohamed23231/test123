import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Spinner } from "@nextui-org/spinner";
import GenericFormControl from "@components/form/GenericInput";
import { AddLocationsInterface } from "@app_types/interfaces/forms_schemas/AddLocationsInterface";

interface AddLocationProp {
  isLoading: boolean;
  errors: FieldErrors<AddLocationsInterface>;
  register: UseFormRegister<AddLocationsInterface>;
  handleSubmit: UseFormHandleSubmit<AddLocationsInterface, undefined>;
  addLocationSubmitHandler: (data: AddLocationsInterface) => void;
}

export const LoadingAddress = ({
  addLocationSubmitHandler,
  register,
  handleSubmit,
  errors,
  isLoading,
}: AddLocationProp) => {
  return (
    <>
      <div className="mt-20 flex justify-center items-center">
        <form
          noValidate
          className="max-w-sm mx-auto grow"
          onSubmit={handleSubmit(addLocationSubmitHandler)}
        >
          <GenericFormControl<AddLocationsInterface>
            label="Enter your Address Name"
            name="title"
            placeholder="Address Name"
            type="string"
            register={register}
            errors={errors.title?.message ? [errors.title.message] : []}
            valueAsNumber={false}
          />
          <GenericFormControl<AddLocationsInterface>
            label="Enter your Address URL on map"
            name="address"
            placeholder="description"
            type="string"
            register={register}
            errors={errors.address?.message ? [errors.address.message] : []}
            valueAsNumber={false}
          />
          <GenericFormControl<AddLocationsInterface>
            label="Phone Number"
            name="phone"
            placeholder="Your Phone Number"
            type="string"
            register={register}
            errors={errors.phone?.message ? [errors.phone.message] : []}
            valueAsNumber={false}
          />
          <GenericFormControl<AddLocationsInterface>
            label="Enter your Address details"
            name="details"
            placeholder="Details"
            type="string"
            register={register}
            errors={errors.details?.message ? [errors.details.message] : []}
            valueAsNumber={false}
          />
          <GenericFormControl<AddLocationsInterface>
            label="Enter your Address Gate"
            name="gate"
            placeholder="gate"
            type="string"
            register={register}
            errors={errors.gate?.message ? [errors.gate.message] : []}
            valueAsNumber={false}
          />

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
