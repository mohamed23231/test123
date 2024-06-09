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

interface MyServicesProp {
  isLoading: boolean;
  data: Trip[] | null;
  //   showDrivers: boolean;
  //   showManagers: boolean;
  onStatusChangeSuccess: () => void;
}

const TrackOrderTripComponent = ({
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
    console.log(Tid);
    console.log(data);
    try {
      //   setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const res = await axios.patch(
        `${API_BASE_URL}/trips/change-status/${Tid}/`,
        {
          status: data.status,
          rejection_reason: "string",
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      onStatusChangeSuccess();

      console.log(res);
    } catch (error: any) {
      console.log("error from add loading errors", error);
      formErrorHandler(error);
    } finally {
      //   setIsLoading(false);
    }
  }

  return (
    <>
      {/* Show Drivers Data */}

      {data && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto text-gray-500">
          <h3 className=" text-gray-900	font-semibold text-2xl m-4 bg-gray-50">
            <FontAwesomeIcon className="mx-2" icon={faFile} />
            Trip List
          </h3>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center bg-stone-200	">
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Driver
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((trip: Trip) => (
                <tr
                  key={trip.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {trip.product}
                  </td>
                  <td className="px-6 py-4">
                    {trip.quantity} {trip.unit}
                  </td>
                  <td className="px-6 py-4">{trip.driver}</td>
                  <td className="px-6 py-4 flex text-center justify-center cursor-pointer">
                    <div className="mx-2">
                      <FontAwesomeIcon icon={faGauge} />
                    </div>
                    <div className=""> {trip.status}</div>
                  </td>
                  <td className="px-6 py-4">{trip.delivery_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TrackOrderTripComponent;
