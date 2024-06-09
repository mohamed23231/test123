import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@configs/envs";
import GenericFormControl from "@components/form/GenericInput";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
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
import { MakeOrder } from "./MakeOrder";

let serviceName: string;
let serviceUnit: string;
let serviceLogo: string;

const CompanyInfoComponent = ({
  id,
  openMakeOrderTabHandler,
  closeMakeOrderTabHandler,
  makeOrder,
}: any) => {
  const router = useRouter();
  //   const { id } = router.query;
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
      // console.log("company Data", response);
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
      console.log("lodaing location is", res.data.results);
    } catch (error: any) {
      // console.log("error from add loading errors", error);
      notifyIssue();
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isNaN(id)) {
      console.log("Invalid ID: ID is not a number");
      return; // Return early if id is not a number
    }

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
  //         product: data.product,
  //         quantity: data.quantity,
  //         unit: data.unit,
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
  //     closeModal();
  //     // console.log(res);
  //   } catch (error: any) {
  //     console.log("error from account info", error);
  //     formErrorHandler(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

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

  console.log("here's service", service);
  return (
    <div className="">
      {id === "noSelected" ? (
        <div>
          <div className="main-container flex justify-center items-center flex-col">
            <img className="" src="/favicon1.jpg" alt="" />
            <h2 className="text-3xl font-medium">Select A Company</h2>
          </div>
        </div>
      ) : (
        <div>
          {service ? (
            makeOrder ? (
              <MakeOrder
                serviceName={serviceName}
                serviceUnit={serviceUnit}
                closeMakeOrderTabHandler={closeMakeOrderTabHandler}
                companyLogo={service.logo}
                id={id}
                companyTitle={service.organization}
              />
            ) : isLoading ? (
              <div className="w-full flex justify-center items-center min-h-screen">
                <Spinner size="sm" color="success" />
              </div>
            ) : (
              <>
                <div className="main-company-info m-5">
                  <div className="main-info flex justify-between">
                    <div className="flex">
                      <div className="w-14 h-14 overflow-hidden mr-2">
                        <img
                          className="w-full h-full border rounded-full object-contain"
                          src={service.logo ?? "/favicon1.jpg"}
                          alt={service.organization}
                        />
                      </div>
                      <div>
                        <p className="text-sm">Company Name</p>
                        <p className="font-medium"> {service.organization}</p>
                      </div>
                    </div>
                    <div>
                      {/* <button
                          onClick={() => {
                            openMakeOrderTabHandler();
                          }}
                          className="bg-mainColor px-9 py-3 rounded-full"
                        >
                          Order Now
                        </button> */}
                    </div>
                  </div>
                  <div className="company-details px-6 py-4 flex flex-col space-y-6">
                    <div>
                      <div className="text-xl font-semibold text-gray-800">
                        Company Details
                      </div>
                      <div className="mt-2 space-y-4">
                        <div className="p-4 bg-white border border-gray-200 rounded-md">
                          <div className="text-sm font-semibold text-gray-600">
                            Location
                          </div>
                          <div className="text-sm text-gray-800 mt-1">
                            {service.address}
                          </div>
                        </div>
                        <div className="p-4 bg-white border border-gray-200 rounded-md">
                          <div className="text-sm font-semibold text-gray-600">
                            Company CV
                          </div>
                          <div className="text-sm text-gray-800 mt-1">
                            {service.bio}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="company-services">
                      <p className="mt-10 mb-7 text-sm font-medium">
                        Company Services
                      </p>
                      {res?.results.map((service: any) => (
                        <div
                          key={service.id}
                          style={{ backgroundColor: "#ECEFF1" }}
                          className="main-details p-1 rounded  flex justify-between mt-2 space-y-4"
                        >
                          <div className="p-4  border-gray-200 rounded-md">
                            <div
                              className="text-sm font-semibold text-gray-600"
                              style={{ color: "#1A2430" }}
                            >
                              {service.title}
                            </div>
                            <p style={{ color: "#415A77" }}>
                              {service.description}
                            </p>
                          </div>
                          <div className="orderServiceBtn flex items-center justify-center min-w-36">
                            <button
                              onClick={() => {
                                serviceName = `${service.title}`;
                                serviceUnit = `${service.unit}`;
                                serviceLogo = `${service.logo}`;

                                openMakeOrderTabHandler();
                              }}
                              className="text-white hover:bg-green-900 bg-mainColor focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Add Service
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )
          ) : (
            <div>No service data available.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyInfoComponent;
