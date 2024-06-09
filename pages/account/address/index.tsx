import React, { useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import { AddressInterface } from "@app_types/interfaces/forms_schemas//AddressInterface";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Myaddresses from "@components/account/addresses/Myaddresses";
import { Spinner } from "@nextui-org/spinner";
import { AddLocationsInterface } from "@app_types/interfaces/forms_schemas/AddLocationsInterface";
import { useForm } from "react-hook-form";
import { addLocationsSchema } from "@zod_schemas/addLocationsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import GenericFormControl from "@components/form/GenericInput";
import toast from "react-hot-toast";
const AddressCards = () => {
  const totalAddress = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filterType, setFilterType] = useState("loading");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddLocationsInterface>({
    resolver: zodResolver(addLocationsSchema),
  });
  const formErrorHandler = useFormErrorHandler<AddLocationsInterface>(setError);
  const notifyCustom = (message: string) => toast.success(`${message}`);

  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(
        `${API_BASE_URL}/logistics/locations/?type=${filterType}&page=${page}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      setData((prevData) => {
        totalAddress.current = response.data.count;
        return (prevData = response.data.results);
      });
      setTotalPages(Math.ceil(response.data.count / 30));
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, filterType]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const onDeleteSuccess = () => {
    fetchData();
  };

  const handleEditeClick = (id: any) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <div>No data available</div>;
    }
    router.push(`/services/modifyservice/${id}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
    setPage(1); // Reset to the first page when changing filter
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // will add here although to fetch data with search Query
  };

  const addAddressHandler = () => {
    openModal();
  };

  async function UpdateLocation(data: AddLocationsInterface) {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/auth/login");
      throw new Error("Access token not found in local storage");
    }
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${API_BASE_URL}/logistics/locations/`,

        {
          type: data.type,
          title: data.title,
          address: data.address,
          gate: data.gate,
          phone: data.phone,
          details: data.details,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      notifyCustom("Address Added");
      setInputEmpty();

      closeModal();
      onDeleteSuccess();
      console.log(res);
    } catch (error: any) {
      console.log(error);
      formErrorHandler(error);
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

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

  const setInputEmpty = () => {
    setValue("title", "");
    setValue("address", "");
    setValue("gate", "");
    setValue("phone", "");
    setValue("details", "");
  };

  return (
    <div className=" min-h-screen  overflow-hidden">
      <div className=" flex justify-start	 items-center bg-white container p-5 mt-10 mx-auto ">
        <div className=" flex justify-start	 items-center  flex-1 w-1/2 ">
          <button
            onClick={addAddressHandler}
            type="button"
            className="  text-white bg-mainColor focus:ring-4 focus:outline-none hover:bg-emerald-700 font-medium rounded-lg text-lg px-2.5 py-3 text-center me-2 mb-2"
          >
            Add Address +
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
          <div className="relative">
            <select
              value={filterType}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="loading">Loading Locations</option>
              <option value="unloading">Unloading Locations</option>
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
                <form noValidate onSubmit={handleSubmit(UpdateLocation)}>
                  <div className="input-containers flex flex-wrap">
                    <div className="w-full p-2">
                      <label
                        htmlFor="type"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address Type
                      </label>
                      <select
                        id="type"
                        {...register("type")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected disabled hidden>
                          Select Location Type
                        </option>

                        <option value={"loading"}>Loading Location</option>
                        <option value={"unloading"}>UnLoading Location</option>
                      </select>
                    </div>

                    <div className="w-1/2 p-2">
                      <GenericFormControl<AddLocationsInterface>
                        label="Enter Location title"
                        name="title"
                        placeholder="Location title"
                        type="string"
                        register={register}
                        defaultValue={""}
                        errors={
                          errors.title?.message ? [errors.title.message] : []
                        }
                        valueAsNumber={false}
                      />
                    </div>

                    <div className="w-1/2 p-2">
                      <GenericFormControl<AddLocationsInterface>
                        label="Enter address URL On Map"
                        name="address"
                        placeholder="address URL"
                        type="string"
                        register={register}
                        errors={
                          errors.address?.message
                            ? [errors.address.message]
                            : []
                        }
                        valueAsNumber={false}
                      />
                    </div>
                  </div>
                  <div className="input-containers flex">
                    <div className="w-1/2 p-2">
                      <GenericFormControl<AddLocationsInterface>
                        label="Enter gate"
                        name="gate"
                        placeholder="gate"
                        type="string"
                        register={register}
                        errors={
                          errors.gate?.message ? [errors.gate.message] : []
                        }
                        valueAsNumber={false}
                      />
                    </div>
                    <div className="w-1/2 p-2">
                      <GenericFormControl<AddLocationsInterface>
                        label="Enter Phone Number"
                        name="phone"
                        placeholder="phone"
                        type="string"
                        register={register}
                        errors={
                          errors.phone?.message ? [errors.phone.message] : []
                        }
                        valueAsNumber={false}
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Note
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      // value={selectedAddress?.details}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your Notes..."
                      {...register("details", {
                        valueAsNumber: false,
                      })}
                    ></textarea>
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
            <span className="font-semibold">Address List </span>
            <span className="bg-gray-300 text-mainColor rounded p-1">
              {totalAddress.current} Address
            </span>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="success" />
        </div>
      ) : (
        <>
          <Myaddresses
            data={data}
            isLoading={isLoading}
            onDeleteSuccess={onDeleteSuccess}
            handleEditeClick={handleEditeClick}
          />
          <div className="flex justify-center mt-5">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </div>
        </>
      )}
      {/* Display your data here using the 'data' state */}
      {/* Pagination component */}
      {/* <div className="flex justify-center content-end	">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange} // Use handlePageChange as the onChange event handler
            color="primary"
            hidePrevButton={page === 1} // Disable "Previous" button on page 1
          />
        </Stack>
      </div> */}
    </div>
  );
};

export default AddressCards;
