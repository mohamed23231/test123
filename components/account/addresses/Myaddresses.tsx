import React, { useEffect, useState } from "react";
import { LoadingLocation } from "@app_types/interfaces/forms_schemas/AddressInterface";
import { API_BASE_URL } from "@configs/envs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { addLocationsSchema } from "@zod_schemas/addLocationsSchema";
import GenericFormControl from "@components/form/GenericInput";
import { Spinner } from "@nextui-org/spinner";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { AddLocationsInterface } from "@app_types/interfaces/forms_schemas/AddLocationsInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import router from "next/router";
import ConfirmDialog from "@components/utilities/ConfirmDialog";
interface MyAddress {
  isLoading: boolean;
  data: LoadingLocation[];
  onDeleteSuccess: () => void;
  handleEditeClick: (id: any) => void; // Corrected function name
}
const Myaddresses = ({
  data,
  onDeleteSuccess,
  handleEditeClick,
  isLoading,
}: MyAddress) => {
  const notify = () => toast.error("Still under Development"); // Example notification
  const notifyCustom = (message: string) => toast.success(`${message}`);

  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddLocationsInterface>({
    resolver: zodResolver(addLocationsSchema),
  });

  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const formErrorHandler = useFormErrorHandler<AddLocationsInterface>(setError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<any>(null);

  const handleDelete = async (id: any) => {
    console.log(`clicked delete`);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in local storage");
      }
      const notify = () => toast.error("Still under Development"); // Example notification

      const response = await axios.delete(
        `${API_BASE_URL}/logistics/locations/${id}/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      onDeleteSuccess();
    } catch (error: any) {
      console.log("error from account info", error);
    }
  };

  const handleUpdateClick = (address: any) => {
    console.log(address);
    setSelectedAddress(address);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  async function UpdateLocation(data: AddLocationsInterface) {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/auth/login");
      throw new Error("Access token not found in local storage");
    }
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/logistics/locations/${selectedAddress.id}/`,

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
      notifyCustom("Address Updated");
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

  // async function AddLocation(data: AddLocationsInterface) {
  //   console.log(data);
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (!accessToken) {
  //     router.push("/auth/login");
  //     throw new Error("Access token not found in local storage");
  //   }
  //   try {
  //     const res = await axios.post(
  //       `${API_BASE_URL}/logistics/locations/`,

  //       {
  //         type: data.type,
  //         title: data.title,
  //         address: data.address,
  //         gate: data.gate,
  //         phone: data.phone,
  //         details: data.details,
  //       },
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     notifyCustom("Address Added");
  //     closeModal();
  //     console.log(res);
  //   } catch (error: any) {
  //     console.log(error);
  //     formErrorHandler(error);

  //     // console.log(error);
  //   } finally {
  //   }
  // }

  const handleDeleteConfirmation = (id: any) => {
    setDeleteItemId(id);
    openDeleteModal();
  };

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      await handleDelete(deleteItemId);
      closeDeleteModal();
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      setValue("title", selectedAddress.title || "");
      setValue("address", selectedAddress.address || "");
      setValue("gate", selectedAddress.gate || "");
      setValue("phone", selectedAddress.phone || "");
      setValue("details", selectedAddress.details || "");
      setValue("type", selectedAddress.type || "");
    }
  }, [selectedAddress, setValue]);

  return (
    <div>
      <div className="  ">
        {Array.isArray(data) && data.length > 0 ? (
          // Render address items if data is an array and not empty
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto 5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="w-1/12 px-6 py-3">
                    Address Title
                  </th>
                  <th scope="col" className="w-4/12 px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="w-1/12 px-6 py-3">
                    Gate
                  </th>
                  <th scope="col" className=" w-2/12 px-6 py-3">
                    phone Number
                  </th>
                  <th scope="col" className="  w-2/12 px-6 py-3">
                    Creation Date
                  </th>
                  <th scope="col" className="w-1/12 px-6 py-3"></th>
                  <th scope="col" className="w-1/12 px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((address, index) => (
                  <tr
                    key={address.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {address.title}
                    </td>
                    <td className="px-6 py-4">{address.address}</td>
                    <td className="px-6 py-4">{address.gate}</td>
                    <td className="px-6 py-4">{address.phone}</td>
                    <td className="px-6 py-4">{address.created_at}</td>
                    <td className="px-6 py-4 cursor-pointer	">
                      <button
                        onClick={() => {
                          handleUpdateClick(address);
                        }}
                        type="button"
                        className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
                      >
                        Update
                      </button>
                    </td>
                    <td
                      onClick={() => {
                        handleDeleteConfirmation(address.id);
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
                          <option
                            value={selectedAddress.type}
                            selected
                            disabled
                            hidden
                          >
                            {selectedAddress.type}
                          </option>

                          <option value={"loading"}>Loading Location</option>
                          <option value={"unloading"}>
                            UnLoading Location
                          </option>
                        </select>
                      </div>

                      <div className="w-1/2 p-2">
                        <GenericFormControl<AddLocationsInterface>
                          label="Enter Location title"
                          name="title"
                          placeholder="Location title"
                          defaultValue={selectedAddress?.title}
                          type="string"
                          register={register}
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
                          defaultValue={selectedAddress?.address}
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
                          defaultValue={selectedAddress?.gate}
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
                          defaultValue={selectedAddress?.phone}
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
            <ConfirmDialog
              open={isDeleteModalOpen}
              message="Are you sure you want to delete this address?"
              onConfirm={handleConfirmDelete}
              onCancel={closeDeleteModal}
            />
          </div>
        ) : (
          // <div
          //   className="w-2/3 rounded-md border-solid  m-5 p-5 bg-white	 "
          //   key={address.id || index}
          // >
          //   <div className="container my-10">
          //     <div>
          //       <div className="flex">
          //         <div className="w-1/3 text-center text-gray-400	">
          //           Address Title <FontAwesomeIcon icon={faAddressBook} />
          //         </div>
          //         <div className="w-2/3 font-semibold	">
          //           {" "}
          //           <p>{address.title}</p>
          //         </div>
          //       </div>
          //       <div className="flex">
          //         <div className="w-1/3 text-center text-gray-400	">
          //           Address on Map <FontAwesomeIcon icon={faMapLocationDot} />
          //         </div>
          //         <div className="w-2/3 font-semibold	">
          //           {" "}
          //           <p>{address.address}</p>
          //         </div>
          //       </div>
          //       <div className="flex">
          //         <div className="w-1/3 text-center text-gray-400	">
          //           Phone Number <FontAwesomeIcon icon={faPhone} />
          //         </div>
          //         <div className="w-2/3 font-semibold	">
          //           {" "}
          //           <p>{address.phone} </p>
          //         </div>
          //       </div>
          //       <div className="flex">
          //         <div className="w-1/3 text-center text-gray-400	">
          //           Gate <FontAwesomeIcon icon={faDungeon} />
          //         </div>
          //         <div className="w-2/3 font-semibold	">
          //           {" "}
          //           <p>{address.gate} </p>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          //   <DeleteButton
          //     onClick={() => handleDelete(address.id)}
          //     onDeleteSuccess={onDeleteSuccess}
          //     handleEditeClick={() => notify()} // Corrected prop name
          //     cardId={address.id}
          //   />
          // </div>
          // Render a message when data is not available
          <div>No data available</div>
        )}
      </div>
    </div>
  );
};

export default Myaddresses;
