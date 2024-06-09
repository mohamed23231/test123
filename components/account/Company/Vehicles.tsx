import { getAllVehicleSchemaInterface } from "@app_types/interfaces/forms_schemas/VehicleSchemaInterface";
import { useRouter } from "next/router";
import axios from "axios";
import { API_BASE_URL } from "@configs/envs";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import ConfirmDialog from "@components/utilities/ConfirmDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { VehicleSchemaInterface } from "@app_types/interfaces/forms_schemas/VehicleSchemaInterface";
import { vehicleSchema } from "@zod_schemas/addVehicleSchema";
import GenericFormControl from "@components/form/GenericInput";
import { Spinner } from "@nextui-org/spinner";

interface MyServicesProp {
  isLoading: boolean;
  data: getAllVehicleSchemaInterface[] | null;
  onDeleteSuccess: () => void;
}

const Vehicles = ({ isLoading, data, onDeleteSuccess }: MyServicesProp) => {
  const router = useRouter();
  const notifySuccess = (message: string) => toast.success(`${message}`);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<any>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notifyCustom = (message: string) => toast.success(`${message}`);
  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VehicleSchemaInterface>({
    resolver: zodResolver(vehicleSchema),
  });
  const formErrorHandler =
    useFormErrorHandler<VehicleSchemaInterface>(setError);

  useEffect(() => {
    if (selectedVehicle) {
      setValue("plate_number", selectedVehicle.plate_number || "");
      setValue("type", selectedVehicle.type || "");
      setValue("model", selectedVehicle.model || "");
      setValue("examination_date", selectedVehicle.examination_date || "");
      setValue("application_date", selectedVehicle.application_date || "");
      setValue("insurance_date", selectedVehicle.insurance_date || "");
    }
  }, [selectedVehicle, setValue]);

  const handleDelete = async (id: any) => {
    console.log(`clicked delete`);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.delete(
        `${API_BASE_URL}/logistics/vehicles/${id}/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      notifySuccess("Vehicle Deleted");
      onDeleteSuccess();
      console.log(response.data);
    } catch (error: any) {
      console.log("error from account info", error);
    } finally {
    }
  };

  const handleDeleteConfirmation = (id: any) => {
    setDeleteItemId(id);
    openDeleteModal();
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      await handleDelete(deleteItemId);
      closeDeleteModal();
    }
  };

  const handleUpdateClick = (vehicle: any) => {
    console.log(vehicle);
    setSelectedVehicle(vehicle);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  async function UpdateVehicleMethodHandler(data: VehicleSchemaInterface) {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/auth/login");
      throw new Error("Access token not found in local storage");
    }
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/logistics/vehicles/${selectedVehicle.id}/`,

        {
          plate_number: data.plate_number,
          type: data.type,
          model: data.model,
          examination_date: data.examination_date,
          application_date: data.application_date,
          insurance_date: data.insurance_date,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      notifyCustom("Vehicle Updated");
      closeModal();
      onDeleteSuccess();
      console.log(res);
    } catch (error: any) {
      console.log(error);
      formErrorHandler(error);
      // console.log(error);
    } finally {
    }
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                Plate Number
              </th>
              <th scope="col" className="px-6 py-3">
                Vehicle Type
              </th>
              <th scope="col" className="px-6 py-3">
                Vehicle Model
              </th>
              <th scope="col" className="px-6 py-3">
                Vehicle Examination Date
              </th>
              <th scope="col" className="px-6 py-3">
                Applicattion Date
              </th>
              <th scope="col" className="px-6 py-3">
                insurance Date
              </th>
              <th scope="col" className="px-6 py-3">
                created at{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((vehicle: getAllVehicleSchemaInterface) => (
              <tr
                key={vehicle.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center    "
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {vehicle.plate_number}
                </td>
                <td className="px-6 py-4">{vehicle.type}</td>
                <td className="px-6 py-4">{vehicle.model}</td>
                <td className="px-6 py-4">{vehicle.examination_date}</td>
                <td className="px-6 py-4">{vehicle.application_date}</td>
                <td className="px-6 py-4">{vehicle.insurance_date}</td>
                <td className="px-6 py-4">{vehicle.created_at}</td>
                <td
                  onClick={() => {
                    handleUpdateClick(vehicle);
                  }}
                  className="px-6 py-4 cursor-pointer	"
                >
                  <button
                    type="button"
                    className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
                  >
                    Update
                  </button>
                </td>

                <td
                  onClick={() => {
                    handleDeleteConfirmation(vehicle.id);
                  }}
                  className="px-6 py-4 cursor-pointer	"
                >
                  <button
                    type="button"
                    className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div
            onClick={handleModalClick}
            id="middle-center-modal"
            data-modal-placement="middle-center"
            tabIndex={-1}
            className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
          >
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-medium text-gray-900">
                Update Address
              </h3>
              <form
                noValidate
                onSubmit={handleSubmit(UpdateVehicleMethodHandler)}
              >
                <div className="input-containers flex flex-wrap">
                  <div className="w-1/2 p-2">
                    <GenericFormControl<VehicleSchemaInterface>
                      label="Enter your plate number"
                      name="plate_number"
                      placeholder="plate number"
                      type="email"
                      register={register}
                      errors={
                        errors.plate_number?.message
                          ? [errors.plate_number.message]
                          : []
                      }
                      valueAsNumber={false}
                    />
                  </div>

                  <div className="w-1/2 p-2">
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

                  <div className="w-full p-2">
                    <GenericFormControl<VehicleSchemaInterface>
                      label="Enter your Vehicle Model"
                      name="model"
                      placeholder="Vehicle model"
                      type="email"
                      register={register}
                      errors={
                        errors.model?.message ? [errors.model.message] : []
                      }
                      valueAsNumber={false}
                    />
                  </div>
                </div>

                <div className="input-containers flex w-full ">
                  <div className="w-1/2 p-2">
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
                        {...register("examination_date", {
                          valueAsNumber: false,
                        })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                      />
                    </div>{" "}
                  </div>
                  <div className="w-1/2 p-2">
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
                        {...register("application_date", {
                          valueAsNumber: false,
                        })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                      />
                    </div>{" "}
                  </div>
                </div>

                <div className="my-3 w-full">
                  <label
                    htmlFor={"insurance_date"}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter your vehicle Insurance Date
                  </label>

                  <div className="relative w-full mb-5">
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
                </div>

                <div className="flex justify-end">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    {isLoading ? (
                      <Spinner size="sm" color="success" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmDialog
          open={isDeleteModalOpen}
          message="Are you sure you want to delete this Vehicle?"
          onConfirm={handleConfirmDelete}
          onCancel={closeDeleteModal}
        />
      </div>
    </>
  );
};

export default Vehicles;
