import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@configs/envs";
import GenericFormControl from "@components/form/GenericInput";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { OrderReqSchemaInterface } from "@app_types/interfaces/forms_schemas/OrderReqSchemaInterface";
import { orderReqSchema } from "@zod_schemas/orderReqSchema";
import { CompanyInfo } from "@app_types/interfaces/forms_schemas/CompaniesInterface";
import { Spinner } from "@nextui-org/spinner";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ServiceCard from "@components/ServiceCard/ServiceCard";
import {
  CompaniesList,
  Company,
} from "@app_types/interfaces/forms_schemas/MyServicesInterface";

const ServiceDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState<CompanyInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState<any[]>([]);
  const [res, setRes] = useState<any | null>(null);

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderReqSchemaInterface>({
    resolver: zodResolver(orderReqSchema),
  });
  const formErrorHandler =
    useFormErrorHandler<OrderReqSchemaInterface>(setError);
  const notify = () => toast.success("Order Placed and sent to Seller"); // Example notification
  const notifyIssue = () => toast.error("there's issue with your order");

  async function companyInfo() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(
        `${API_BASE_URL}/core/companies/services/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("company Data", response);
      setRes(response.data);
    } catch (error: any) {
      console.log("error from account info", error);
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
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/core/companies/${id}`
        );
        setService(response.data);
      } catch (error) {
        console.log("Error fetching service details:", error);
      }
    };

    if (id) {
      fetchServiceDetails();
    }
    getLoadingLocations();
    companyInfo();
  }, [id]);
  // useEffect(() => {
  //   getLoadingLocations();
  //   companyInfo();
  // }, [id]);

  async function requestOrder(data: OrderReqSchemaInterface) {
    console.log(data);
    setIsLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/auth/login");
      throw new Error("Access token not found in local storage");
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}/orders/imports/`,

        {
          company: id,
          product: data.product,
          quantity: data.quantity,
          unit: data.unit,
          customer_location: data.customer_location,
          note: data.note,
          delivery_start_date: data.delivery_start_date,
          delivery_end_date: data.delivery_end_date,
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
      closeModal();
      console.log(res);
    } catch (error: any) {
      console.log("error from account info", error);
      formErrorHandler(error);
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

  return (
    <div className="">
      {service ? (
        <div className="main flex mt-10 container">
          <div className="w-1/2">
            <div className="companyLogo w-80">
              <img className="w-full" src="/favicon1.jpg" alt="" />
            </div>
          </div>
          <div className="w-1/2 my-10">
            <div className="companyData">
              <h2 className="text-4xl mt-4 font-semibold text-center	">
                {service.organization}
              </h2>
              <div className="flex text-center mt-10">
                <div className="w-1/3">
                  {" "}
                  <p className="text-gray-400	">company tax number</p>
                </div>
                <div className="w-2/3 font-semibold	">
                  <p>{service.tax_number}</p>
                </div>
              </div>
              <div className="flex text-center">
                <div className="w-1/3">
                  {" "}
                  <p className="text-gray-400	">company phone</p>
                </div>
                <div className="w-2/3 font-semibold	">
                  <p>{service.phone}</p>
                </div>
              </div>
              <div className="flex text-center">
                <div className="w-1/3">
                  {" "}
                  <p className="text-gray-400	">company address</p>
                </div>
                <div className="w-2/3 font-semibold	">
                  <p>{service.address}</p>
                </div>
              </div>
              <div className="flex text-center">
                <div className="w-1/3">
                  {" "}
                  <p className="text-gray-400	">company Bio</p>
                </div>
                <div className="w-2/3 font-semibold	">
                  <p>{service.bio}</p>
                </div>
              </div>
              {/* <p className="mt-4">company tax number {service.tax_number}</p>
              <p className="mt-4">company phone {service.phone}</p>
              <p className="mt-4">company address {service.address}</p>
              <p className="mt-4">company Bio {service.bio}</p> */}
              <div className="flex justify-center my-10">
                <button
                  onClick={openModal}
                  className="m-3 block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Request Order
                </button>
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
                      Order Request
                    </h3>
                    <form noValidate onSubmit={handleSubmit(requestOrder)}>
                      <div className="input-containers flex">
                        <div className="w-1/2 m-2">
                          <GenericFormControl<OrderReqSchemaInterface>
                            label="Enter Product Name"
                            name="product"
                            placeholder="Product Name"
                            type="email"
                            register={register}
                            errors={
                              errors.product?.message
                                ? [errors.product.message]
                                : []
                            }
                            valueAsNumber={false}
                          />
                        </div>

                        <div className="w-1/2 m-2">
                          <GenericFormControl<OrderReqSchemaInterface>
                            label="Enter unit"
                            name="unit"
                            placeholder="unit"
                            type="string"
                            register={register}
                            errors={
                              errors.unit?.message ? [errors.unit.message] : []
                            }
                            valueAsNumber={false}
                          />
                        </div>
                      </div>
                      <div className="input-containers flex">
                        <div className="w-1/2 m-2">
                          <GenericFormControl<OrderReqSchemaInterface>
                            label="Enter quantity"
                            name="quantity"
                            placeholder="quantity"
                            type="string"
                            register={register}
                            errors={
                              errors.quantity?.message
                                ? [errors.quantity.message]
                                : []
                            }
                            valueAsNumber={false}
                          />
                        </div>

                        <div className="w-1/2 m-2">
                          <label
                            htmlFor="customer_location"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Loading Location
                          </label>
                          <select
                            id="customer_location"
                            {...register("customer_location")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option selected disabled hidden>
                              Choose here
                            </option>

                            {loadingLocation?.map((location: any) => (
                              <option value={location.id}>
                                {location.title}
                              </option>
                            ))}
                            {/* <option value="manager">Manager</option>
                            <option value="driver">Driver </option> */}
                          </select>
                        </div>
                      </div>
                      <div className="relative max-w-sm m-4">
                        <label htmlFor="delivery_start_date">
                          Select delivery start date
                        </label>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
                        <input
                          id={"delivery_start_date"}
                          type="date"
                          {...register("delivery_start_date", {
                            valueAsNumber: false,
                          })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select date"
                        />
                      </div>
                      <div className="relative max-w-sm m-4">
                        <label htmlFor="delivery_end_date">
                          Select delivery end date
                        </label>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
                        <input
                          id={"delivery_end_date"}
                          type="date"
                          {...register("delivery_end_date", {
                            valueAsNumber: false,
                          })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select date"
                        />
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
          </div>
        </div>
      ) : (
        <div>No service data available.</div>
      )}
      <div className="service-container conteiner w-full">
        <h3 className="text-center text-2xl my-2"> Company Service List</h3>
        <div className="parent flex justify-center flex-wrap w-5/6 m-auto  text-center">
          {res?.results.map((company: Company) => (
            <ServiceCard key={company.id} data={company}></ServiceCard>
            // <ServiceCard />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
