import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import { getAllVehicleSchemaInterface } from "@app_types/interfaces/forms_schemas/VehicleSchemaInterface";
import Vehicles from "@components/account/Company/Vehicles";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Spinner } from "@nextui-org/spinner";
import GenericFormControl from "@components/form/GenericInput";
import { VehicleSchemaInterface } from "@app_types/interfaces/forms_schemas/VehicleSchemaInterface";
import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema } from "@zod_schemas/addVehicleSchema";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import toast from "react-hot-toast";

const Vehicle = () => {
  const vehicleList = useRef(0);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<getAllVehicleSchemaInterface[] | null>(null); // Initialize data state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const notifySuccess = (message: string) => toast.success(`${message}`);

  async function fetchData() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(`${API_BASE_URL}/logistics/vehicles/`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setData(() => {
        vehicleList.current = response.data.count;
        return response.data.results;
      }); // Set data to results array
    } catch (error: any) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addVehicleMethodHandler(data: VehicleSchemaInterface) {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const res = await axios.post(
        `${API_BASE_URL}/logistics/vehicles/`,
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
            "Content-Type": "application/json",
          },
        }
      );
      notifySuccess("vehicle Added");
      closeModal();
      fetchData();
      console.log(res.data);

      router.push("/account/company/vehicles");
    } catch (error) {
      console.error("error from account info", error);
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  const onDeleteSuccess = () => {
    fetchData();
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

  const addVehicleHandler = () => {
    openModal();
  };
  return (
    <>
      {/* <div className="service-btn flex justify-center mt-10	">
        <button className="	 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <Link href={"/account/company/addvehicle"}>
              <Typography textAlign="center">Add Vehicle</Typography>
            </Link>
          </span>
        </button>
      </div> */}
      <div className=" flex justify-start	 items-center bg-white container p-5 mt-10 mx-auto ">
        <div className="flex justify-start	 items-center w-1/2 flex-1">
          <button
            onClick={addVehicleHandler}
            type="button"
            className="  text-white bg-mainColor focus:ring-4 focus:outline-none hover:bg-emerald-700 font-medium rounded-lg text-lg px-2.5 py-4 text-center me-2 mb-2"
          >
            Add vehicle +
          </button>
          <form className="w-1/4 mx-4">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-2 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round" // Corrected property name
                    strokeLinejoin="round" // Corrected property name
                    strokeWidth="2" // Corrected property name
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
              />
            </div>
          </form>
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
                  Add Vehicle
                </h3>
                <form
                  noValidate
                  onSubmit={handleSubmit(addVehicleMethodHandler)}
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
                        {...register("insurance_date", {
                          valueAsNumber: false,
                        })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="text-white bg-mainColor hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        </div>
        <div className="emplyees-count">
          <div>
            <span className="font-semibold">Vehicles List </span>
            <span className="bg-gray-300 text-mainColor rounded p-1">
              {data?.length} Vehicle
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="success" />
        </div>
      ) : (
        <Vehicles
          data={data}
          isLoading={isLoading}
          onDeleteSuccess={onDeleteSuccess}
        />
      )}
    </>
  );
};

export default Vehicle;
