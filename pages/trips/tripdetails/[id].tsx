import React from "react";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Trip } from "@app_types/interfaces/forms_schemas/ShowTripsSchemaInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import ConfirmDialog from "@components/utilities/ConfirmDialog";
import { Spinner } from "@nextui-org/spinner";
import { useSelector } from "react-redux"; // Import useSelector
function Tripdetails() {
  const userRole = useSelector((state: any) => state.user.userRole);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const router = useRouter();
  const { id, triplist } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Trip | any>(null); // Initialize data state

  async function fetchData() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(`${API_BASE_URL}/trips/detail/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("resis", response);
      setData(response.data); // Set data to results array
    } catch (error: any) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteTrip() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.delete(
        `${API_BASE_URL}/trips/detail/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      router.push(`/trips/${triplist}`);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  console.log("data", data);
  console.log("role", userRole);
  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center items-center min-h-screen">
          <Spinner size="sm" color="success" />
        </div>
      ) : (
        <main>
          <div className="flex flex-wrap">
            <div className="w-full border rounded p-2 m-4">
              <p className="font-semibold mb-4 mt-2">
                Trip Details{" "}
                <span className="rounded bg-mainColor p-1">{data?.id}</span>
              </p>
              <div className="flex ">
                <div className="w-3/4 flex-1">
                  <div className="cx-info flex w-1/2 justify-between mb-3">
                    <div className="cx-name w-2/3">
                      <p className="text-gray-400 mr-10">Customer Name</p>
                      {data?.customer_name}
                    </div>
                    <div className="cx-id w-1/3">
                      <p className="text-gray-400">Customer ID</p>
                      <p className="font-semibold">{data?.customer_id}</p>
                    </div>
                  </div>
                  <div className="produxt-info flex w-1/2 justify-between mb-3">
                    <div className="product-name w-2/3">
                      <p className="text-gray-400 ">Product</p>
                      <p className="font-semibold"> {data?.product}</p>
                    </div>
                    <div className="product-quantity w-1/3">
                      <p className="text-gray-400 mr-10">Quantity</p>
                      <p className="font-semibold">
                        {" "}
                        {data?.quantity} {data?.unit}
                      </p>
                    </div>
                  </div>
                  <div className="date-info flex w-1/2 justify-between mb-3">
                    <div className="start-date w-2/3">
                      <p className="text-gray-400 mr-10">Created Date</p>
                      <p className="font-semibold">
                        {" "}
                        {/* {formatDate(data.created_at)} */}
                      </p>
                    </div>
                    <div className="end-date w-1/3">
                      <p className="text-gray-400 mr-10">Delivery Date</p>
                      <p className="font-semibold">{data?.delivery_date}</p>
                    </div>
                  </div>
                  <div className="date-info flex w-1/2 justify-between mb-3">
                    <div className="start-date w-2/3">
                      <p className="text-gray-400 mr-10">Vehicle</p>
                      <p className="font-semibold"> {data?.vehicle}</p>
                    </div>
                    <div className="end-date w-1/3">
                      <p className="text-gray-400 mr-10">Driver Name</p>
                      <p className="font-semibold">{data?.driver}</p>
                    </div>
                  </div>
                </div>
                <div className="w-1/4 flex flex-col justify-center items-center">
                  <div
                    className={`w-36 my-5 text-center border rounded-lg ${
                      data?.status == "pending"
                        ? "bg-gray-300"
                        : data?.status == "loading"
                        ? "bg-lime-200"
                        : data?.status == "in_way"
                        ? "bg-emerald-500"
                        : data?.status == "completed"
                        ? "bg-mainColor"
                        : "bg-red-600"
                    }`}
                  >
                    Status {data?.status}
                  </div>
                  {userRole !== "driver" ? (
                    <div className="button mt-10">
                      <button
                        onClick={() => {
                          openDeleteModal(); // Open the delete modal
                        }}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 px-4 py-1"
                      >
                        Delete Trip
                      </button>
                    </div>
                  ) : null}
                  <ConfirmDialog
                    open={isDeleteModalOpen}
                    message="Are you sure you want to delete this Trip?"
                    onConfirm={deleteTrip}
                    onCancel={closeDeleteModal}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full  rounded p-2 m-4">
              <div className="w-1/2 border rounded p-2 mr-4">
                <p className="font-semibold mb-4 mt-2">Customer Location</p>
                <div className="contact-info justify-between mb-3 mx-2">
                  <div className="">
                    <p className="text-gray-400 mr-10">Location Title</p>
                    <div className="flex justify-between">
                      <div className="font-semibold">
                        {data?.customer_location.title}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-slate-300 flex justify-center items-center">
                        <FontAwesomeIcon
                          className="text-white "
                          icon={faPhone}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <p className="text-gray-400 mr-10">Customer Number</p>
                    <div className="flex justify-between">
                      <div className="font-semibold">
                        {data?.customer_location.phone}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-slate-300 flex justify-center items-center">
                        <FontAwesomeIcon
                          className="text-white "
                          icon={faPhone}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact-info justify-between mb-3 mx-2">
                  <div className="">
                    <p className="text-gray-400 mr-10">Address</p>
                    <div className="flex justify-between">
                      <div className="font-semibold">
                        {data?.customer_location.address}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-slate-300 flex justify-center items-center">
                        <FontAwesomeIcon
                          className="text-white "
                          icon={faMapMarkerAlt}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact-info justify-between mb-3 mx-2">
                  <div className="">
                    <p className="text-gray-400 mr-10">Gate</p>
                    <div className="flex justify-between">
                      <div className="font-semibold">
                        {data?.customer_location.gate}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact-info justify-between mb-3 mx-2">
                  <div className="">
                    {/* <Link
                            href={{
                              pathname: "/trips/tripdetails/[id]",
                              query: { id: trip.id, triplist: id }, // Add additional parameters here
                            }}
                          >
                            Click Here
                          </Link> */}

                    <p className="text-gray-400 mr-10">Details</p>
                    <div className="flex justify-between">
                      <div className="font-semibold">
                        {data?.customer_location.details}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-1/2 border rounded p-2">
                <p className="font-semibold mb-4 mt-2">Loading Location</p>
                <div className="contact-info justify-between mb-3 mx-2">
                  <div className="">
                    <p className="text-gray-400 mr-10">Loading Title</p>
                    <div className="flex justify-between">
                      <div className="font-semibold">
                        {data?.load_location.title}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-slate-300 flex justify-center items-center">
                        <FontAwesomeIcon
                          className="text-white "
                          icon={faPhone}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <p className="text-gray-400 mr-10">Contact Number</p>
                    <div className="flex justify-between">
                      <div className="font-semibold">
                        {data?.load_location.phone}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-slate-300 flex justify-center items-center">
                        <FontAwesomeIcon
                          className="text-white "
                          icon={faPhone}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact-info justify-between mb-3 mx-2">
                  <div className="">
                    <p className="text-gray-400 mr-10">Address</p>
                    <div className="flex justify-between">
                      <div className="font-semibold">
                        {data?.load_location.address}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-slate-300 flex justify-center items-center">
                        <FontAwesomeIcon
                          className="text-white "
                          icon={faMapMarkerAlt}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact-info justify-between mb-3 mx-2">
                  <div className="">
                    <p className="text-gray-400 mr-10">Gate</p>
                    <div className="flex justify-between">
                      <div className="font-semibold">
                        {data?.load_location.gate}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact-info justify-between mb-3 mx-2">
                  <div className="">
                    {/* <Link
                            href={{
                              pathname: "/trips/tripdetails/[id]",
                              query: { id: trip.id, triplist: id }, // Add additional parameters here
                            }}
                          >
                            Click Here
                          </Link> */}

                    <p className="text-gray-400 mr-10">Details</p>
                    <div className="flex justify-between">
                      <div className="font-semibold">
                        {data?.load_location.details}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
      {/* <div className="main">
        <div className="container mx-auto">
          {data ? (
            <div
              className={`w-2/3 rounded-md border-solid border-2 container mx-auto p-2 shadow-xl m-5 
            "border-black-500"
          `}
              key={data.id}
            >
              <h2 className="font-extrabold my-5 text-3xl">Trip Details</h2>
              <ul>
                <div className="group flex flex-wrap font-bold">
                  <li className="w-1/2 my-3">
                    <span className="text-gray-400">Product: </span>
                    {data.product}
                  </li>
                  <li className="w-1/2 my-3">
                    <span className="text-gray-400">driver: </span>
                    {data.driver}
                  </li>
                  <li className="w-1/2 my-3">
                    <span className="text-gray-400">vehicle: </span>
                    {data.vehicle}
                  </li>
                  <li className="w-1/2 my-3">
                    <span className="text-gray-400">Quantity: </span>
                    {data.quantity}
                    {data.unit}
                  </li>
                  <li className="w-1/2 my-3">
                    <span className="text-gray-400"> Creation Date: </span>
                    {formatDate(data.created_at)}
                  </li>
                  <li className="w-1/2 my-3">
                    <span className="text-gray-400">customer name: </span>
                    {data.customer_name}
                  </li>
                  <li className="w-1/2 my-3">
                    <span className="text-gray-400">Note: </span>
                    {data.note}
                  </li>
                  <li className="w-1/2 my-3 cursor-pointer">
                    <span className="text-gray-400">Delivery Date: </span>
                    {formatDate(data.delivery_date)}
                  </li>
                </div>
              </ul>
              <div className="locations-container flex flex-wrap my-5">
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 w-1/2 mx-5">
                  <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Loading Location:
                  </h2>
                  <li>Address Title ({data.load_location.title})</li>
                  <li>Address({data.load_location.address}) </li>
                  <li>Details({data.load_location.details})</li>
                  <li>Phone({data.load_location.phone})</li>
                </ul>
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 w-1/2">
                  <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Customer Location:
                  </h2>
                  <li>Address Title ({data.customer_location.title})</li>
                  <li>Address({data.customer_location.address}) </li>
                  <li>Details({data.customer_location.details})</li>
                  <li>Phone({data.customer_location.phone})</li>
                  <li>gate({data.customer_location.gate})</li>
                </ul>
              </div>
              <div className="button text-center">
                <button
                  onClick={() => {
                    deleteTrip(); // Call the deleteTrip function
                  }}
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete Trip
                </button>
              </div>
            </div>
          ) : (
            <div>No service data available.</div>
          )}
        </div>
      </div> */}
    </>
  );
}

export default Tripdetails;
