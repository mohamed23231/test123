import { Trip } from "@app_types/interfaces/forms_schemas/ShowTripsSchemaInterface";
import { TripStatusInterface } from "@app_types/interfaces/forms_schemas/TripStatusInterface";
import { useRouter } from "next/router";
import axios from "axios";
import { API_BASE_URL } from "@configs/envs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Spinner } from "@nextui-org/spinner";
import { useForm } from "react-hook-form";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { TripStatusSchema } from "@zod_schemas/tripStatusSchema";
import { useEffect, useState } from "react";
import GenericFormControl from "@components/form/GenericInput";
import toast from "react-hot-toast";

interface MyServicesProp {
  isLoading: boolean;
  data: Trip[] | null;
  //   showDrivers: boolean;
  //   showManagers: boolean;
  onStatusChangeSuccess: () => void;
}

const TripList = ({
  isLoading,
  onStatusChangeSuccess,
  data,
}: //

MyServicesProp) => {
  const router = useRouter();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<TripStatusInterface>({
    resolver: zodResolver(TripStatusSchema),
  });
  const formErrorHandler = useFormErrorHandler<TripStatusInterface>(setError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Tid, setTId] = useState(""); // State to manage the selected status
  const { id } = router.query;
  const [selectedStatus, setSelectedStatus] = useState("");
  const notifyIssue = (message: any) => toast.error(`${message}`);
  let uploadedFile: any;
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

  async function statusChangeHandler(data: any) {
    console.log("dataisssss", data.confirm_image);
    const formData = new FormData();
    // if (data.status === "completed" && !data.confirm_image) {
    //   notifyIssue("The confirm image is required to complete the trip");
    //   return;
    // }

    if (data.status === "rejected") {
      formData.append("status", data.status);
      formData.append("reject_reason", data.rejection_reason);
    } else if (data.status === "completed") {
      console.log(
        "asdasdasdssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssad"
      );
      if (data.confirm_image instanceof FileList) {
        console.log("ssssssssdsdsdsd");
        for (let i = 0; i < data.confirm_image.length; i++) {
          formData.append("confirm_image", data.confirm_image[i]); // Append each image file with the same key
        }
      }
    } else {
      formData.append("status", data.status);
    }
    // console.log(data);
    try {
      //   setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      // const res = await axios.put(
      //   `${API_BASE_URL}/trips/change-status/${Tid}/`,
      //   formData,
      //   {
      //     headers: {
      //       Accept: "application/json",
      //       Authorization: `Bearer ${accessToken}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // onStatusChangeSuccess();

      // console.log(res);
    } catch (error: any) {
      console.log("error from add loading errors", error);
      formErrorHandler(error);
    } finally {
      //   setIsLoading(false);
    }
  }
  console.log(data);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadedFile = e.target?.files;
    }
  };

  return (
    <>
      {/* Show Drivers Data */}

      {data && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto 5">
          <h3 className=" text-gray-900	font-semibold text-2xl m-4 bg-gray-50">
            <FontAwesomeIcon className="mx-2" icon={faFile} />
            Trip List
          </h3>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center bg-stone-200	">
                <th scope="col" className=" px-6 py-3">
                  Product
                </th>
                <th scope="col" className=" px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className=" px-6 py-3">
                  Driver
                </th>
                <th scope="col" className=" px-6 py-3">
                  Status
                </th>
                <th scope="col" className=" px-6 py-3">
                  Date
                </th>
                <th scope="col" className=" px-6 py-3">
                  Trip Details
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data.map((trip: Trip) => (
                <tr
                  key={trip.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 "
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-center">
                    {trip.product}
                  </td>
                  <td className="px-6 py-4 ">
                    {trip.quantity} {trip.unit}
                  </td>
                  <td className="px-6 py-4 text-center">{trip.driver}</td>
                  <td
                    className="px-6 py-4  cursor-pointer"
                    onClick={() => {
                      setIsModalOpen(true);
                      setTId(`${trip.id}`);
                    }}
                  >
                    <div>
                      <span
                        className={`${
                          trip.status == "pending"
                            ? "bg-blue-200 text-blue-700"
                            : trip.status == "rejected"
                            ? "bg-red-200 text-red-900"
                            : trip.status == "loading"
                            ? "bg-orange-200 text-orange-900"
                            : trip.status == "completed"
                            ? "bg-green-200 text-green-900"
                            : trip.status == "in_way"
                            ? "bg-yellow-200 text-yellow-900"
                            : ""
                        } border px-2.5 py-2 rounded-xl text-sm`}
                      >
                        {trip.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span>{trip.delivery_date}</span>
                  </td>
                  <td className="px-6 py-4 cursor-pointer ">
                    <Link
                      href={{
                        pathname: "/trips/tripdetails/[id]",
                        query: { id: trip.id, triplist: id }, // Add additional parameters here
                      }}
                    >
                      Click Here
                    </Link>
                  </td>
                  {/* <td
                    className="px-6 py-4 cursor-pointer	"
                    onClick={() => {
                      handleDelete("drivers", employee.id);
                    }}
                  >
                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline ">
                      Delete
                    </span>
                  </td> */}
                  {isModalOpen && (
                    <div
                      onClick={handleModalClick}
                      id="middle-center-modal"
                      data-modal-placement="middle-center"
                      tabIndex={-1}
                      className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-30"
                    >
                      <div className="bg-white rounded-lg shadow p-6 w-1/2">
                        <h3 className="text-xl font-medium text-gray-900">
                          Trip Status
                        </h3>
                        <form
                          noValidate
                          onSubmit={handleSubmit(statusChangeHandler)}
                        >
                          <div className="input-containers flex ">
                            <div className="m-2 w-full">
                              <label htmlFor="status">Trip Status</label>
                              <select
                                id="status"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                                {...register("status", {
                                  onChange: (e) =>
                                    setSelectedStatus(e.target.value),
                                })}
                              >
                                <option selected disabled hidden>
                                  Choose here
                                </option>

                                <option value={"pending"}>pending</option>
                                <option value={"loading"}>loading</option>
                                <option value={"in_way"}>in way</option>
                                <option value={"completed"}>completed</option>
                                <option value={"rejected"}>rejected</option>
                              </select>
                              {selectedStatus === "rejected" && (
                                <GenericFormControl
                                  label="Enter rejection reason"
                                  name="rejection_reason"
                                  valueAsNumber={false}
                                  placeholder="Rejection reason"
                                  type="string"
                                  register={register}
                                  errors={
                                    errors.rejection_reason?.message
                                      ? [errors.rejection_reason.message]
                                      : []
                                  }
                                />
                              )}
                              {selectedStatus === "completed" && (
                                <>
                                  <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="confirm_image"
                                  >
                                    Upload Confirmation file
                                  </label>
                                  <input
                                    {...register("confirm_image")}
                                    className=" p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="confirm_image"
                                    type="file"
                                    onChange={handleFileChange}
                                  />
                                </>
                              )}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TripList;
