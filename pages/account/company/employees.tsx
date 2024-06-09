import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import { AddEmployees } from "@app_types/interfaces/forms_schemas/AccountInfoSchemaInterface";

import { Employee } from "@app_types/interfaces/forms_schemas/EmployeesSchemaInterface";
import EmployeesComponent from "@components/account/Company/Employees";
import { Spinner } from "@nextui-org/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addEmplyeeSchema } from "@zod_schemas/addEmplyeeSchema";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import toast from "react-hot-toast";
import GenericFormControl from "@components/form/GenericInput";

const Employees = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showDrivers, setShowDrivers] = useState(true);
  const [showManagers, setShowManagers] = useState(false);
  const [data, setData] = useState<Employee[] | null>(null); // Initialize data state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("drivers");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const totalEmp = useRef(0);
  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddEmployees>({
    resolver: zodResolver(addEmplyeeSchema),
  });

  const formErrorHandler = useFormErrorHandler<AddEmployees>(setError);
  const notifyCustom = (message: string) => toast.success(`${message}`);

  async function fetchData() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(
        `${API_BASE_URL}/employees/${filterType}/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(() => {
        totalEmp.current = response.data.count;

        return response.data.results;
      }); // Set data to results array
    } catch (error: any) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addEmployee(data: AddEmployees) {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }
      if (data?.role == "driver") {
        const res = await axios.post(
          `${API_BASE_URL}/employees/drivers/`,
          {
            driver_email: data.email,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(res);
      } else if (data?.role == "manager") {
        const res = await axios.post(
          `${API_BASE_URL}/employees/managers/`,
          {
            manager_email: data.email,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(res);
      }
      fetchData();
      setInputEmpty();
    } catch (error: any) {
      console.log("error from account info", error);
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [filterType]);

  // async function showDriversData() {
  //   // Function to fetch and display driver data
  //   await fetchData("/employees/drivers/");
  // }

  // async function showManagersData() {
  //   // Function to fetch and display manager data
  //   await fetchData("/employees/managers/");
  // }

  // const handleShowDrivers = () => {
  //   showDriversData();
  //   setShowDrivers(true);
  //   setShowManagers(false);
  // };

  // const handleShowManagers = () => {
  //   showManagersData();
  //   setShowDrivers(false);
  //   setShowManagers(true);
  // };

  const onDeleteSuccess = () => {
    fetchData();
  };

  // const onDeleteSuccessDriver = () => {
  //   showDriversData();
  // };

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

  const addEmployeeHandler = () => {
    openModal();
  };
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilterType = event.target.value;
    setFilterType(selectedFilterType);

    if (selectedFilterType === "drivers") {
      setShowManagers(false);
      setShowDrivers(true);
      console.log(selectedFilterType);
    } else if (selectedFilterType === "managers") {
      setShowManagers(true);
      setShowDrivers(false);
      console.log(selectedFilterType);
    }

    setPage(1); // Reset to the first page when changing filter
  };
  const setInputEmpty = () => {
    setValue("email", "");
  };

  return (
    <div className=" min-h-screen  overflow-hidden">
      <div className=" flex justify-start	 items-center bg-white container p-5 mt-10 mx-auto ">
        <div className=" flex justify-start	 items-center w-1/2 flex-1  ">
          <button
            onClick={addEmployeeHandler}
            type="button"
            className="  text-white bg-mainColor focus:ring-4 focus:outline-none hover:bg-emerald-700 font-medium rounded-lg text-lg px-2.5 py-3 text-center me-2 mb-2"
          >
            Add Employee +
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
                placeholder="Search For Employee..."
              />
            </div>
          </form>
          <div className="relative">
            <select
              value={filterType}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="drivers">drivers</option>
              <option value="managers">Managers</option>
            </select>
          </div>
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
                  Add Address
                </h3>
                <form noValidate onSubmit={handleSubmit(addEmployee)}>
                  <div className="input-containers flex flex-wrap">
                    <div className="w-full p-2">
                      <label
                        htmlFor="type"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Employee Role
                      </label>
                      <select
                        id="role"
                        {...register("role")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected disabled hidden>
                          Select Employee Role
                        </option>

                        <option value={"driver"}>Driver</option>
                        <option value={"manager"}>Manager</option>
                      </select>
                    </div>

                    <div className="w-full p-2">
                      <GenericFormControl<AddEmployees>
                        label="Enter Employee email"
                        name="email"
                        placeholder="Employee email"
                        type="string"
                        register={register}
                        errors={
                          errors.email?.message ? [errors.email.message] : []
                        }
                        valueAsNumber={false}
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
        </div>
        <div className="emplyees-count">
          <div>
            <span className="font-semibold">Employees List </span>
            <span className="bg-gray-300 text-mainColor rounded p-1">
              {data?.length} Employee
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex justify-center items-center"></div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="success" />
        </div>
      ) : (
        <EmployeesComponent
          data={data}
          isLoading={isLoading}
          showDrivers={showDrivers}
          showManagers={showManagers}
          onDeleteSuccessManager={onDeleteSuccess}
          onDeleteSuccessDriver={onDeleteSuccess}
        />
      )}
    </div>
  );
};

export default Employees;
