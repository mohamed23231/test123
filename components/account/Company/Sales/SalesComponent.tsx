// import React from "react";
// import DeleteButton from "@components/utilities/DeleteButton";
// import { API_BASE_URL } from "@configs/envs";
// import axios from "axios";
// import { RequestedOrder } from "@app_types/interfaces/forms_schemas/SalesInfoSchemaInterface";
// import { Status } from "@app_types/interfaces/forms_schemas/SalesInfoSchemaInterface";
// import { Spinner } from "@nextui-org/spinner";
// import { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
// import { useForm } from "react-hook-form";
// import { statusSchema } from "@zod_schemas/OrderStatusSalesSchema";
// import GenericFormControl from "@components/form/GenericInput";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faTruckFast,
//   faWarehouse,
//   faGauge,
//   faAddressCard,
// } from "@fortawesome/free-solid-svg-icons";

// interface SalesOrders {
//   isLoading: boolean;
//   data: RequestedOrder[];
//   onDeleteSuccess: () => void;
//   // handleEditeClick: (id: any) => void; // Corrected function name
// }
// const formatDate = (dateString: string) => {
//   const date = new Date(dateString);
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//   };
//   return date.toLocaleDateString("en-US", options);
// };

// const SalesComponent = ({ data, onDeleteSuccess }: SalesOrders) => {
//   const router = useRouter();

//   const {
//     register,
//     setError,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Status>({
//     resolver: zodResolver(statusSchema),
//   });
//   const formErrorHandler = useFormErrorHandler<Status>(setError);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState(""); // State to manage the selected status
//   const [id, setId] = useState(""); // State to manage the selected status

//   async function statusChangeHandler(data: any) {
//     try {
//       console.log(id);
//       setIsLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         router.push("/auth/login");
//         throw new Error("Access token not found in local storage");
//       }

//       const res = await axios.patch(
//         `${API_BASE_URL}/orders/change-status/${id}/`,
//         {
//           status: data.status,
//           rejection_reason: data.rejection_reason,
//         },
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       onDeleteSuccess();
//       setIsModalOpen(false);
//       router.push(`/order/sales`);

//       console.log(res);
//     } catch (error: any) {
//       console.log("error from add loading errors", error);
//       formErrorHandler(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) {
//       closeModal();
//     }
//   };
//   {
//     console.log(data);
//   }
//   return (
//     <div>
//       <div className="flex flex-wrap ">
//         {Array.isArray(data) && data.length > 0 ? (
//           // Render address items if data is an array and not empty
//           data.map((order: RequestedOrder) => (
//             <div
//               style={{ minHeight: "250px" }}
//               className={`w-2/3 rounded-md border-solid border-2 container mx-auto p-2 shadow-xl mt-2 transition-transform duration-300   hover:shadow-md ${
//                 order.status === "accepted"
//                   ? "border-green-500"
//                   : order.status === "rejected"
//                   ? "border-red-500"
//                   : "border-black-500"
//               }`}
//               key={order.id}
//             >
//               <h2 className="font-semibold		my-2 text-xl	">Order Details</h2>
//               <ul>
//                 <div className="group flex flex-wrap font-semibold	">
//                   <li className="w-1/2 my-1 font-bold">
//                     <span className="text-gray-400		">Customer: </span>
//                     {order.customer_name}
//                   </li>
//                   <li className="w-1/2 my-1">
//                     <span className="text-gray-400		">Product: </span>
//                     {order.product}
//                   </li>
//                   <li className="w-1/2 my-1">
//                     <span className="text-gray-400		">Order UID: </span>
//                     {order.uid}
//                   </li>
//                   <li className="w-1/2 my-1">
//                     <span className="text-gray-400		">Quantity: </span>
//                     {order.quantity}
//                     {order.unit}
//                   </li>
//                   <li className="w-1/2 my-1 text-green-800	">
//                     <span className="text-gray-400		">Created At: </span>
//                     {formatDate(order.created_at)}
//                   </li>
//                   <li className="w-1/2 my-1">
//                     <span className="text-gray-400		">Note: </span>
//                     {order.note}
//                   </li>
//                   <li
//                     className={`w-1/2 my-1 cursor-pointer ${
//                       order.status === "completed"
//                         ? "text-green-900 font-bold"
//                         : order.status === "accepted"
//                         ? "text-green-400 font-bold"
//                         : order.status === "in_progress"
//                         ? "text-blue-700 font-bold"
//                         : "text-red-600 font-bold"
//                     }`}
//                     onClick={() => {
//                       setIsModalOpen(true);
//                     }}
//                   >
//                     <span className="text-gray-400		">Status: </span>
//                     <FontAwesomeIcon icon={faGauge} />

//                     {order.status}
//                   </li>
//                 </div>
//                 {order.status != "rejected" && "cancelled" && (
//                   <div className="flex">
//                     <li className="w-full  my-3 cursor-pointer">
//                       <Link href={`/trips/addtrip/${order.id}`} className=" ">
//                         <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
//                           <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//                             <FontAwesomeIcon icon={faTruckFast} />
//                             Add Trip
//                           </span>
//                         </button>
//                       </Link>
//                     </li>
//                     <li className="w-full  my-3 cursor-pointer">
//                       <Link href={`/trips/${order.id}`} className="">
//                         <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
//                           <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//                             <FontAwesomeIcon icon={faWarehouse} />
//                             Order Trips
//                           </span>
//                         </button>
//                       </Link>
//                     </li>
//                   </div>
//                 )}
//                 {/* {order.status != "rejected" && "cancelled" && (
//                   <li className="w-full  my-3 cursor-pointer">
//                     <Link
//                       href={`/trips/${order.id}`}
//                       className=" bg-slate-200 rounded"
//                     >
//                       <span className="text-sky-600		">
//                         <FontAwesomeIcon icon={faWarehouse} />
//                         Order Trips
//                       </span>
//                     </Link>
//                   </li>
//                 )} */}
//               </ul>
//               <h2 className="mb-2 text-lg font-semibold text-gray-500 dark:text-white ">
//                 <FontAwesomeIcon icon={faAddressCard} />
//                 {order.customer_location.type} Location:
//               </h2>
//               <ul className="max-w-md space-y-1  list-disc list-inside dark:text-gray-900 flex justify-around flex-wrap	">
//                 <li>Address Title ({order.customer_location.title})</li>
//                 <li>Address({order.customer_location.address}) </li>
//                 <li>Details({order.customer_location.details})</li>
//               </ul>

//               {isModalOpen && (
//                 <div
//                   onClick={handleModalClick}
//                   id="middle-center-modal"
//                   data-modal-placement="middle-center"
//                   tabIndex={-1}
//                   className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-30"
//                 >
//                   <div className="bg-white rounded-lg shadow p-6 w-1/2 ">
//                     <h3 className="text-xl font-medium text-gray-900">
//                       Order Request
//                     </h3>
//                     <form
//                       noValidate
//                       onSubmit={handleSubmit(statusChangeHandler)}
//                     >
//                       <div className="input-containers flex ">
//                         <div className="m-2 w-full">
//                           <label htmlFor="status">Order Status</label>
//                           <select
//                             onClick={() => setId(order.id)}
//                             id="status"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
//                             {...register("status", {
//                               onChange: (e) =>
//                                 setSelectedStatus(e.target.value),
//                             })}
//                           >
//                             <option selected disabled hidden>
//                               Choose here
//                             </option>

//                             <option value={"accepted"}>Accepted</option>
//                             <option value={"rejected"}>Rejected</option>
//                           </select>
//                           {selectedStatus === "rejected" && (
//                             <GenericFormControl
//                               label="Enter rejection reason"
//                               name="rejection_reason"
//                               valueAsNumber={false}
//                               placeholder="Rejection reason"
//                               type="string"
//                               register={register}
//                               errors={
//                                 errors.rejection_reason?.message
//                                   ? [errors.rejection_reason.message]
//                                   : []
//                               }
//                             />
//                           )}
//                         </div>
//                       </div>
//                       <div className="flex justify-end">
//                         <button
//                           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                           type="submit"
//                         >
//                           {isLoading ? (
//                             <Spinner size="sm" color="success" />
//                           ) : (
//                             "Submit"
//                           )}
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           // Render a message when data is not available
//           <div>No data available</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SalesComponent;
import React from "react";

const SalesComponent = () => {
  return <div>SalesComponent</div>;
};

export default SalesComponent;
