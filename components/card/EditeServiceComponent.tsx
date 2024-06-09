import React, { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { OrderReqSchemaInterface } from "@app_types/interfaces/forms_schemas/OrderReqSchemaInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderReqSchema } from "@zod_schemas/orderReqSchema";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { Spinner } from "@nextui-org/spinner";
import GenericFormControl from "@components/form/GenericInput";
import toast from "react-hot-toast";
import router from "next/router";
import axios from "axios";
import { API_BASE_URL } from "@configs/envs";
import { useDispatch } from "react-redux";
import { updateServiceInCompany } from "../../store/cartSlice";

import {
  Service,
  Company,
  CartState,
} from "@app_types/interfaces/forms_schemas/ServiceCart";

const EditeServiceComponent = ({
  isModalOpen,
  closeModalProp,
  editeService,
  selectedIndex,
  companyId,
}: any) => {
  const dispatch = useDispatch();

  const [loadingLocation, setLoadingLocation] = useState<any[]>([]);
  const notifyIssue = (message: string) => toast.error(message);
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const closeModal = () => {
      closeModalProp();
    };
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderReqSchemaInterface>({
    resolver: zodResolver(orderReqSchema),
  });

  const formErrorHandler =
    useFormErrorHandler<OrderReqSchemaInterface>(setError);
  async function getUnLoadingLocations() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const res = await axios.get(
        `${API_BASE_URL}/logistics/locations/?type=unloading`,

        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "application/json",
          },
        }
      );
      setLoadingLocation(res.data.results);
      // console.log("res is", res.data.results);
    } catch (error: any) {
      // console.log("error from add loading errors", error);
      notifyIssue("there's issue with your order");
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getUnLoadingLocations();
    console.log("produxt isasdasfdasd ", editeService.product);
    setValue("product", editeService.product);
    setValue("unit", editeService.unit);
    setValue("quantity", editeService.quantity);
    setValue("delivery_end_date", editeService.delivery_end_date);
    setValue("delivery_start_date", editeService.delivery_start_date);
    // async () => {
    //   if (editeService) {
    //   }
    // };
  }, [editeService]);

  function validateDeliveryDates(
    deliveryStartDate: string,
    deliveryEndDate: string
  ): void {
    const startDate = new Date(deliveryStartDate);
    const endDate = new Date(deliveryEndDate);

    // Calculate the difference in days
    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    if (diffInDays < 3) {
      throw new Error(
        "Delivery end date must be at least 3 days after the delivery start date."
      );
    }
  }

  const handleSaveUpdate = (data: any) => {
    try {
      validateDeliveryDates(data?.delivery_start_date, data?.delivery_end_date);
      console.log(selectedIndex);
      if (selectedIndex !== null) {
        dispatch(
          updateServiceInCompany({
            companyId,
            serviceIndex: selectedIndex,
            service: { ...editeService, ...data },
          })
        );
        closeModalProp();
      }
    } catch (error) {
      if (error instanceof Error) {
        notifyIssue(error?.message);
        console.log(error);
      }
    }
  };

  const testFun = (data: any) => {
    console.log(data);
    console.log(selectedIndex);
  };

  return (
    <>
      {/* {isModalOpen && (
              )} */}

      <div
        onClick={handleModalClick}
        id="middle-center-modal"
        data-modal-placement="middle-center"
        tabIndex={-1}
        className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-medium text-gray-900">
            Update Service on Card
          </h3>
          <form noValidate onSubmit={handleSubmit(handleSaveUpdate)}>
            <div className="input-containers flex flex-wrap">
              <div className="w-full p-2">
                <GenericFormControl
                  label="Enter Product Name"
                  name="product"
                  placeholder="Product Name"
                  type="text"
                  register={register}
                  errors={
                    errors.product?.message ? [errors.product.message] : []
                  }
                  valueAsNumber={false}
                  // defaultValue={''}
                  disabled={true}
                />
              </div>
              <div className="w-full flex">
                <div className="w-1/2 p-2">
                  <GenericFormControl
                    label="Enter unit"
                    name="unit"
                    placeholder="unit"
                    type="string"
                    register={register}
                    errors={errors.unit?.message ? [errors.unit.message] : []}
                    valueAsNumber={false}
                    disabled={true}
                  />
                </div>
                <div className="w-1/2 p-2">
                  <GenericFormControl
                    label="Enter quantity"
                    name="quantity"
                    placeholder="quantity"
                    type="string"
                    register={register}
                    errors={
                      errors.quantity?.message ? [errors.quantity.message] : []
                    }
                    valueAsNumber={false}
                  />
                </div>
              </div>

              <div className="w-full p-2">
                <label
                  htmlFor="customer_location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Customer Location
                </label>
                <select
                  id="customer_location"
                  {...register("customer_location", {
                    required: "Please select a location",
                    validate: (value) =>
                      value !== "" || "Please select a valid location",
                  })}
                  defaultValue=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mainColor focus:border-mainColor block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor"
                >
                  <option value="" disabled hidden>
                    Choose here
                  </option>
                  {loadingLocation?.map((location: any) => (
                    <option key={location.id} value={location.id}>
                      {location.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-containers w-full flex">
              <div className="flex w-full my-5">
                <div className="relative w-1/2 px-3">
                  <label className="my-2" htmlFor="delivery_start_date">
                    Select delivery start date
                  </label>
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
                  <input
                    id="delivery_start_date"
                    type="date"
                    {...register("delivery_start_date", {
                      required: "Please select a location",
                      validate: (value) =>
                        value !== "" || "Please select a valid location",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                  {errors.delivery_start_date && (
                    <p className="text-red-500 text-sm">
                      Please select a valid Date
                      {/* {errors.customer_location.message} */}
                    </p>
                  )}
                </div>
                <div className="relative w-1/2 px-3">
                  <label className="my-2" htmlFor="delivery_end_date">
                    Select delivery end date
                  </label>
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
                  <input
                    id={"delivery_end_date"}
                    type="date"
                    {...register("delivery_end_date", {
                      required: "Please select a location",
                      validate: (value) =>
                        value !== "" || "Please select a valid location",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mainColor focus:border-mainColor block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                  {errors.delivery_end_date && (
                    <p className="text-red-500 text-sm">
                      Please select a valid Date
                      {/* {errors.customer_location.message} */}
                    </p>
                  )}
                </div>
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
                {...register("note", {
                  valueAsNumber: false,
                })}
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                {isLoading ? <Spinner size="sm" color="success" /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditeServiceComponent;
