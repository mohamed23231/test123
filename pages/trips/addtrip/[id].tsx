// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "@configs/envs";
// import GenericFormControl from "@components/form/GenericInput";
// import { zodResolver } from "@hookform/resolvers/zod";
// import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
// import { OrderReqSchemaInterface } from "@app_types/interfaces/forms_schemas/OrderReqSchemaInterface";
// import { tripSchema } from "@zod_schemas/addTreipSchema";
// import { CompanyInfo } from "@app_types/interfaces/forms_schemas/CompaniesInterface";
// import { Spinner } from "@nextui-org/spinner";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { RequestedOrder } from "@app_types/interfaces/forms_schemas/SalesInfoSchemaInterface";
// import { TripSchemaInterface } from "@app_types/interfaces/forms_schemas/TripSchemaInterface";
// import { getAllVehicleSchemaInterface } from "@app_types/interfaces/forms_schemas/VehicleSchemaInterface";

// import {
//   EmployeeApiResponse,
//   Employee,
// } from "@app_types/interfaces/forms_schemas/EmployeesSchemaInterface";

// const AddTrip = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [service, setService] = useState<RequestedOrder | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingLocation, setLoadingLocation] = useState<any[]>([]);

//   const [drivers, setDrivers] = useState<Employee[]>([]);
//   const [vehicle, setVehicle] = useState<getAllVehicleSchemaInterface[]>([]);
//   const {
//     register,
//     setError,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TripSchemaInterface>({
//     resolver: zodResolver(tripSchema),
//   });
//   const formErrorHandler = useFormErrorHandler<TripSchemaInterface>(setError);
//   const notify = () => toast.success("Trip Added"); // Example notification
//   const notifyIssue = () => toast.error("there's issue with your order");

//   async function getLoadingLocations() {
//     try {
//       setIsLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         router.push("/auth/login");
//         throw new Error("Access token not found in local storage");
//       }

//       const res = await axios.get(
//         `${API_BASE_URL}/logistics/locations/?type=loading`,

//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${accessToken}`,
//             // "Content-Type": "application/json",
//           },
//         }
//       );
//       setLoadingLocation(res.data.results);
//       console.log("res is", res.data.results);
//     } catch (error: any) {
//       console.log("error from add loading errors", error);
//       notifyIssue();
//       formErrorHandler(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   async function getCompanyVehicle() {
//     try {
//       setIsLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         router.push("/auth/login");
//         throw new Error("Access token not found in local storage");
//       }

//       const res = await axios.get(
//         `${API_BASE_URL}/logistics/vehicles/`,

//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${accessToken}`,
//             // "Content-Type": "application/json",
//           },
//         }
//       );
//       setVehicle(res.data.results);
//       console.log("res Vehicle", res);
//     } catch (error: any) {
//       console.log("error from add loading errors", error);
//       notifyIssue();
//       formErrorHandler(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   async function getCompanyDrivers() {
//     try {
//       setIsLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         router.push("/auth/login");
//         throw new Error("Access token not found in local storage");
//       }

//       const res = await axios.get(
//         `${API_BASE_URL}/employees/drivers`,

//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log(res);
//       setDrivers(res.data.results);
//       console.log("res is", res.data.results);
//     } catch (error: any) {
//       console.log("error from add drivers", error);
//       notifyIssue();
//       formErrorHandler(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//     };
//     return date.toLocaleDateString("en-US", options);
//   };

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       console.log("hello");

//       try {
//         setIsLoading(true);
//         const accessToken = localStorage.getItem("accessToken");
//         if (!accessToken) {
//           router.push("/auth/login");
//           throw new Error("Access token not found in local storage");
//         }

//         const response = await axios.get(
//           `${API_BASE_URL}/orders/details/${id}`,
//           {
//             headers: {
//               Accept: "application/json",
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }s
//         );
//         console.log("test11222", response);
//         setService(response.data);
//       } catch (error) {
//         console.log("test11222 err", error);

//         console.log("Error fetching service details:", error);
//       }
//     };

//     if (id) {
//       fetchOrderDetails();
//     }
//   }, [id]);
//   useEffect(() => {
//     getLoadingLocations();
//     getCompanyDrivers();
//     getCompanyVehicle();
//   }, []);

//   async function addTripHandler(data: TripSchemaInterface) {
//     console.log("form dataaaaaaaaaaaaa", data);
//     setIsLoading(true);
//     const accessToken = localStorage.getItem("accessToken");
//     if (!accessToken) {
//       router.push("/auth/login");
//       throw new Error("Access token not found in local storage");
//     }
//     try {
//       const res = await axios.post(
//         `${API_BASE_URL}/trips/${id}/`,

//         {
//           product: data.product,
//           quantity: data.quantity,
//           unit: data.unit,
//           driver: data.driver,
//           vehicle: data.vehicle,
//           load_location: data.load_location,
//           delivery_date: data.delivery_date,
//           trip_count: data.trip_count,
//         },
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       notify();
//       router.push(`/trips/${id}`);
//       console.log(res);
//     } catch (error: any) {
//       console.log("error from account info", error);
//       formErrorHandler(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   console.log(vehicle);
//   return (
//     <div className="container m-auto">
//       {service ? (
//         <div
//           className={`w-2/3 rounded-md border-solid border-2 container mx-auto p-2 shadow-xl my-5 transition-transform duration-300  hover:translate-x-[16px]  ${
//             service.status === "accepted"
//               ? "border-green-500"
//               : service.status === "rejected"
//               ? "border-red-500"
//               : "border-black-500"
//           }`}
//           key={service.id}
//         >
//           <h2 className="font-semibold		my-2 text-xl	">Order Details</h2>
//           <ul>
//             <div className="group flex flex-wrap font-semibold ">
//               <li className="w-1/2 my-2">
//                 <span className="text-gray-400">Customer: </span>
//                 {service.customer_name}
//               </li>
//               <li className="w-1/2 my-2">
//                 <span className="text-gray-400">Product: </span>
//                 {service.product}
//               </li>
//               <li className="w-1/2 my-2">
//                 <span className="text-gray-400">Quantity: </span>
//                 {service.quantity}
//                 {service.unit}
//               </li>
//               <li className="w-1/2 my-2">
//                 <span className="text-gray-400">Created At: </span>
//                 {formatDate(service.created_at)}
//               </li>
//               <li className="w-1/2 my-2">
//                 <span className="text-gray-400">Note: </span>
//                 {service.note}
//               </li>
//               <li className="w-1/2 my-2">
//                 <span className="text-gray-400">trip count: </span>
//                 {service.trip_count}
//               </li>
//               <li className="w-1/2 my-2 text-green-500">
//                 <span className="text-gray-400">Delivery Start Date: </span>
//                 {service.delivery_start_date}
//               </li>
//               <li className="w-1/2 my-2 text-green-800 ">
//                 <span className="text-gray-400">Delivery end Date: </span>
//                 {service.delivery_end_date}
//               </li>
//             </div>
//           </ul>
//           <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
//             {service.customer_location.type} Location:
//           </h2>
//           <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
//             <li>Address Title ({service.customer_location.title})</li>
//             <li>Address({service.customer_location.address}) </li>
//             <li>Details({service.customer_location.details})</li>
//           </ul>
//         </div>
//       ) : (
//         <div>No service data available.</div>
//       )}

//       <div className="addTripForm">
//         <form
//           noValidate
//           onSubmit={handleSubmit(addTripHandler)}
//           className="max-w-md mx-auto my-5"
//         >
//           <div className="relative z-0 w-full mb-5 group">
//             <GenericFormControl
//               label="Enter product Name"
//               name="product"
//               valueAsNumber={false}
//               placeholder="product"
//               type="string"
//               register={register}
//               errors={errors.product?.message ? [errors.product.message] : []}
//             />
//           </div>
//           <div className="relative z-0 w-full mb-5 group">
//             <GenericFormControl
//               label="Enter quantity"
//               name="quantity"
//               valueAsNumber={false}
//               placeholder="quantity"
//               type="string"
//               register={register}
//               errors={errors.quantity?.message ? [errors.quantity.message] : []}
//             />
//           </div>
//           <div className="relative z-0 w-full mb-5 group">
//             <GenericFormControl
//               label="Enter unit"
//               name="unit"
//               valueAsNumber={false}
//               placeholder="unit"
//               type="string"
//               register={register}
//               errors={errors.unit?.message ? [errors.unit.message] : []}
//             />
//           </div>
//           <div className="grid md:grid-cols-2 md:gap-6 my-2">
//             <div className="input-containers flex ">
//               <div className=" w-full">
//                 <label htmlFor="driver">Select Driver</label>
//                 <select
//                   id="driver"
//                   className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
//                   {...register("driver")}
//                 >
//                   <option selected disabled hidden>
//                     Choose here
//                   </option>

//                   {drivers?.map((driver: Employee) => (
//                     <option key={driver.id} value={driver.id}>
//                       {driver.first_name} {driver.last_name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="input-containers flex ">
//               <div className=" w-full">
//                 <label htmlFor="load_location">Select Loading Location</label>
//                 <select
//                   id="driver"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
//                   {...register("load_location")}
//                 >
//                   <option selected disabled hidden>
//                     Choose here
//                   </option>

//                   {loadingLocation?.map((location) => (
//                     <option key={location.id} value={location.id}>
//                       {location.title}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="relative z-0 w-full mb-5 group">
//             <div className=" w-full">
//               <label htmlFor="load_location">Select Vehicle</label>
//               <select
//                 id="vehicle"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
//                 {...register("vehicle")}
//               >
//                 <option selected disabled hidden>
//                   Choose here
//                 </option>

//                 {vehicle?.map((avehicle) => (
//                   <option key={avehicle.id} value={avehicle.id}>
//                     Plate Number:{avehicle.plate_number} / Type: {avehicle.type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="relative z-0 w-full mb-5 group">
//             <GenericFormControl
//               label="Enter trip count"
//               name="trip_count"
//               valueAsNumber={false}
//               placeholder="trip count"
//               type="string"
//               defaultValue="1"
//               register={register}
//               errors={
//                 errors.trip_count?.message ? [errors.trip_count.message] : []
//               }
//             />
//           </div>
//           <div className="relative z-0 w-full mb-5 group">
//             <div>
//               <label htmlFor="delivery_start_date" className="mb-10">
//                 Select delivery_date
//               </label>
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
//               <input
//                 id={"delivery_start_date"}
//                 type="date"
//                 {...register("delivery_date", {
//                   valueAsNumber: false,
//                 })}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Select date"
//               />
//             </div>
//           </div>
//           <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//             {isLoading ? <Spinner size="sm" color="primary" /> : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTrip;
import React from "react";

function tripsLis() {
  return <div>[id]</div>;
}

export default tripsLis;
