import { OrderReqSchemaInterface } from "@app_types/interfaces/forms_schemas/OrderReqSchemaInterface";
import GenericFormControl from "@components/form/GenericInput";
import { API_BASE_URL } from "@configs/envs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { orderReqSchema } from "@zod_schemas/orderReqSchema";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addServiceToCompany } from "../../store/cartSlice";
export const MakeOrder = ({
  id,
  companyLogo,
  companyTitle,
  closeMakeOrderTabHandler,
  serviceName,
  serviceUnit,
  serviceLogo,
}: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState<any[]>([]);
  const notify = () => toast.success("Order Placed and sent to Seller"); // Example notification
  const notifyIssue = (message: string) => toast.error(message);
  const customNotify = (message: string) => toast.success(`${message}`); // Example notification

  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

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

  const handleAddService = (data: OrderReqSchemaInterface) => {
    try {
      validateDeliveryDates(data?.delivery_start_date, data?.delivery_end_date);
      // if (endDate < startDate) {
      //   throw new Error(
      //     "Delivery end date cannot be earlier than the delivery start date."
      //   );
      // }
      const newData = { ...data, serviceLogo, companyTitle, companyLogo };
      dispatch(
        addServiceToCompany({
          id,
          data: newData,
        })
      );
      customNotify("Service Added To Card");
      closeMakeOrderTabHandler();
    } catch (error) {
      if (error instanceof Error) {
        notifyIssue(error?.message);
        console.log(error);
      }
    }
  };

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

  // async function requestOrder(data: OrderReqSchemaInterface) {
  //   // console.log(data);
  //   setIsLoading(true);
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (!accessToken) {
  //     router.push("/auth/login");
  //     throw new Error("Access token not found in local storage");
  //   }
  //   try {
  //     const res = await axios.post(
  //       `${API_BASE_URL}/orders/imports/`,

  //       {
  //         company: id,
  //         product: serviceName,
  //         quantity: data.quantity,
  //         unit: serviceUnit,
  //         customer_location: data.customer_location,
  //         note: data.note,
  //         delivery_start_date: data.delivery_start_date,
  //         delivery_end_date: data.delivery_end_date,
  //       },
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     notify();
  //     // console.log(res);
  //   } catch (error: any) {
  //     console.log("error from account info", error);
  //     formErrorHandler(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function getLoadingLocations() {
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
    getLoadingLocations();
  }, [id]);

  useEffect(() => {
    if (serviceName && serviceUnit) {
      setValue("product", serviceName);
      setValue("unit", serviceUnit);
    }
  }, [serviceName, setValue]);

  console.log("halaaaa", serviceName);
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="company-info">
          <div className="main-info flex justify-between">
            <div className="flex">
              <div
                onClick={closeMakeOrderTabHandler}
                style={{ backgroundColor: "#ECEFF1" }}
                className="h-10 w-10 rounded-full flex justify-center items-center mx-2 cursor-pointer"
              >
                <span>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </span>
              </div>
              <div className=" ">
                <p className="text-xl">
                  Order Service From <span>{companyTitle}</span>{" "}
                </p>
              </div>
            </div>
            <div className="flex ">
              <div className="w-14 h-14 overflow-hidden mr-2">
                <img
                  className="w-full h-full border rounded-full object-contain"
                  src={companyLogo ?? "/favicon1.jpg"}
                  alt={companyTitle}
                />
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-medium text-gray-900">Order Request</h3>
        <form noValidate onSubmit={handleSubmit(handleAddService)}>
          <div className="input-containers flex flex-wrap">
            <div className="w-full p-2 ">
              <GenericFormControl<OrderReqSchemaInterface>
                label="Enter Product Name"
                name="product"
                placeholder="Product Name"
                type="email"
                register={register}
                errors={errors.product?.message ? [errors.product.message] : []}
                valueAsNumber={false}
                // defaultValue={''}
                disabled={true}
              />
            </div>

            <div className="w-1/2 px-3">
              <GenericFormControl<OrderReqSchemaInterface>
                label="Enter unit"
                name="unit"
                placeholder="unit"
                type="string"
                register={register}
                errors={errors.unit?.message ? [errors.unit.message] : []}
                valueAsNumber={false}
                defaultValue={serviceUnit}
                disabled={true}
              />
            </div>
            <div className="w-1/2 px-3">
              <GenericFormControl<OrderReqSchemaInterface>
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
          <div className="input-containers flex">
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
              {errors.customer_location && (
                <p className="text-red-500 text-sm">
                  Please select a valid location
                  {/* {errors.customer_location.message} */}
                </p>
              )}
            </div>
          </div>
          <div className="flex my-5">
            <div className="relative  w-1/2 px-3">
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
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your Notes..."
              {...register("note", {
                valueAsNumber: false,
              })}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              className="text-white bg-mainColor hover:bg-mainColor focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
            >
              {isLoading ? (
                <Spinner size="sm" color="success" />
              ) : (
                "Add To Card"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
