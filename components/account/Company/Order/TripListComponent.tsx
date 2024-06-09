import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import { Trip } from "@app_types/interfaces/forms_schemas/ShowTripsSchemaInterface";
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import GenericFormControl from "@components/form/GenericInput";
import { RequestedOrder } from "@app_types/interfaces/forms_schemas/SalesInfoSchemaInterface";
import { TripSchemaInterface } from "@app_types/interfaces/forms_schemas/TripSchemaInterface";
import { getAllVehicleSchemaInterface } from "@app_types/interfaces/forms_schemas/VehicleSchemaInterface";
import toast from "react-hot-toast";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema } from "@zod_schemas/addTreipSchema";
import { Employee } from "@app_types/interfaces/forms_schemas/EmployeesSchemaInterface";

const TripListComponent = ({ id, isSales, product, unit, status }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Trip[] | null>(null); // Initialize data state
  const notify = () => toast.success("Trip Added"); // Example notification
  const notifyIssue = () => toast.error("there's issue with your order");
  const [drivers, setDrivers] = useState<Employee[]>([]);
  const [vehicle, setVehicle] = useState<getAllVehicleSchemaInterface[]>([]);
  const [loadingLocation, setLoadingLocation] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSchemaInterface>({
    resolver: zodResolver(tripSchema),
  });
  const formErrorHandler = useFormErrorHandler<TripSchemaInterface>(setError);

  const router = useRouter();

  async function fetchData() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(`${API_BASE_URL}/trips/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      setData(response.data.results); // Set data to results array
    } catch (error: any) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addTripHandler(data: TripSchemaInterface) {
    console.log("form dataaaaaaaaaaaaa", data);
    setIsLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/auth/login");
      throw new Error("Access token not found in local storage");
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}/trips/${id}/`,

        {
          product: data.product,
          quantity: data.quantity,
          unit: data.unit,
          driver: data.driver,
          vehicle: data.vehicle,
          load_location: data.load_location,
          delivery_date: data.delivery_date,
          trip_count: data.trip_count,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      notify();
      router.push(`/trips/${id}`);
      console.log(res);
    } catch (error: any) {
      console.log("error from account info", error);
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function getCompanyDrivers() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const res = await axios.get(
        `${API_BASE_URL}/employees/drivers`,

        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res);
      setDrivers(res.data.results);
      console.log("res is", res.data.results);
    } catch (error: any) {
      console.log("error from add drivers", error);
      notifyIssue();
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getCompanyVehicle() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const res = await axios.get(
        `${API_BASE_URL}/logistics/vehicles/`,

        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "application/json",
          },
        }
      );
      setVehicle(res.data.results);
      console.log("res Vehicle", res);
    } catch (error: any) {
      console.log("error from add loading errors", error);
      notifyIssue();
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function getLoadingLocations() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const res = await axios.get(
        `${API_BASE_URL}/logistics/locations/?type=loading`,

        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "application/json",
          },
        }
      );
      setLoadingLocation(res.data.results);
      console.log("res is", res.data.results);
    } catch (error: any) {
      console.log("error from add loading errors", error);
      notifyIssue();
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchData();
      getLoadingLocations();
      getCompanyDrivers();
      getCompanyVehicle();
    }
    setValue("product", product || "");
    setValue("unit", unit || "");
  }, [id]);
  console.log(data);

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

  const addTripHandlerBtn = () => {
    openModal();
  };

  return (
    <div>
      {isSales &&
        status !== "rejected" &&
        status !== "requested" &&
        status !== "cancelled" &&
        status !== "completed" && (
          <div className=" flex justify-start	 items-center bg-white container p-5 mt-10 mx-auto ">
            <button
              onClick={addTripHandlerBtn}
              type="button"
              className="  text-white bg-mainColor focus:ring-4 focus:outline-none hover:bg-emerald-700 font-medium rounded-lg text-lg px-2.5 py-4 text-center me-2 mb-2"
            >
              Add Trip +
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
                  <form noValidate onSubmit={handleSubmit(addTripHandler)}>
                    <div className="input-containers flex flex-wrap">
                      <div className="w-1/2 p-2">
                        <GenericFormControl
                          disabled={true}
                          label="Enter product Name"
                          name="product"
                          valueAsNumber={false}
                          placeholder="product"
                          type="string"
                          register={register}
                          errors={
                            errors.product?.message
                              ? [errors.product.message]
                              : []
                          }
                        />
                      </div>

                      <div className="w-1/2 p-2">
                        <GenericFormControl
                          label="Enter quantity"
                          name="quantity"
                          valueAsNumber={false}
                          placeholder="quantity"
                          type="string"
                          register={register}
                          errors={
                            errors.quantity?.message
                              ? [errors.quantity.message]
                              : []
                          }
                        />
                      </div>

                      <div className="w-full p-2">
                        <GenericFormControl
                          label="Enter unit"
                          name="unit"
                          valueAsNumber={false}
                          placeholder="unit"
                          type="string"
                          register={register}
                          errors={
                            errors.unit?.message ? [errors.unit.message] : []
                          }
                        />
                      </div>
                    </div>

                    <div className="input-containers flex w-full ">
                      <div className="w-1/2 p-2">
                        <div className=" w-full">
                          <label htmlFor="driver">Select Driver</label>
                          <select
                            id="driver"
                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                            {...register("driver")}
                          >
                            <option selected disabled hidden>
                              Choose here
                            </option>

                            {drivers?.map((driver: Employee) => (
                              <option key={driver.id} value={driver.id}>
                                {driver.first_name} {driver.last_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="w-1/2 p-2">
                        <div className=" w-full">
                          <label htmlFor="load_location">
                            Select Loading Location
                          </label>
                          <select
                            id="driver"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                            {...register("load_location")}
                          >
                            <option selected disabled hidden>
                              Choose here
                            </option>

                            {loadingLocation?.map((location) => (
                              <option key={location.id} value={location.id}>
                                {location.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="my-3 w-full">
                      <div className=" w-full">
                        <label htmlFor="load_location">Select Vehicle</label>
                        <select
                          id="vehicle"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                          {...register("vehicle")}
                        >
                          <option selected disabled hidden>
                            Choose here
                          </option>

                          {vehicle?.map((avehicle) => (
                            <option key={avehicle.id} value={avehicle.id}>
                              Plate Number:{avehicle.plate_number} / Type:{" "}
                              {avehicle.type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <GenericFormControl
                        label="Enter trip count"
                        name="trip_count"
                        valueAsNumber={false}
                        placeholder="trip count"
                        type="string"
                        defaultValue="1"
                        register={register}
                        errors={
                          errors.trip_count?.message
                            ? [errors.trip_count.message]
                            : []
                        }
                      />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <div>
                        <label htmlFor="delivery_start_date" className="mb-10">
                          Select delivery_date
                        </label>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
                        <input
                          id={"delivery_start_date"}
                          type="date"
                          {...register("delivery_date", {
                            valueAsNumber: false,
                          })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select date"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        className="text-white bg-mainColor hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="submit"
                      >
                        {isLoading ? (
                          <Spinner size="sm" color="success" />
                        ) : (
                          "Add Trip"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

      {Array.isArray(data) && data.length > 0 ? (
        // Render address items if data is an array and not empty
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" px-6 py-3">
                  Driver Name
                </th>
                <th scope="col" className=" px-6 py-3">
                  Status
                </th>
                <th scope="col" className=" px-6 py-3">
                  Product
                </th>
                <th scope="col" className=" px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="   px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className=" px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((trip, index) => (
                <tr
                  key={trip.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {trip.driver}
                  </td>
                  <td className="px-6 py-4">{trip.status}</td>
                  <td className="px-6 py-4">{trip.product}</td>
                  <td className="px-6 py-4">
                    {trip.quantity}
                    {trip.unit}
                  </td>
                  <td className="px-6 py-4">{trip.delivery_date}</td>
                  <td onClick={() => {}} className="px-6 py-4 cursor-pointer	">
                    <Link
                      href={{
                        pathname: "/trips/tripdetails/[id]",
                        query: { id: trip.id, triplist: id }, // Add additional parameters here
                      }}
                    >
                      <button
                        type="button"
                        className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
                      >
                        Details
                        <FontAwesomeIcon className="mx-2" icon={faEye} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <div className="main-container flex justify-center items-center flex-col">
            <img className="" src="/favicon1.jpg" alt="" />
            <h2 className="text-3xl font-medium">No Trips For This Order</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripListComponent;
