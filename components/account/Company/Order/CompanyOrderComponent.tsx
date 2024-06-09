import React from "react";
import DeleteButton from "@components/utilities/DeleteButton";
import { API_BASE_URL } from "@configs/envs";
import axios from "axios";
import { RequestedOrder } from "@app_types/interfaces/forms_schemas/SalesInfoSchemaInterface";
import { Status } from "@app_types/interfaces/forms_schemas/SalesInfoSchemaInterface";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { useForm } from "react-hook-form";
import { statusSchema } from "@zod_schemas/OrderStatusSalesSchema";
import GenericFormControl from "@components/form/GenericInput";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface SalesOrders {
  isLoading: boolean;
  data: RequestedOrder[];
  onDeleteSuccess: () => void;
  selectedOrderHandler: (id: any) => void;
  setSelectedOrderId: (id: any) => void;
  selectedOrderId: any;

  // handleEditeClick: (id: any) => void; // Corrected function name
}
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

const CompanyOrderComponent = ({
  data,
  onDeleteSuccess,
  selectedOrderHandler,
  setSelectedOrderId,
  selectedOrderId,
}: SalesOrders) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(""); // State to manage the selected status
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(""); // State to manage the selected status

  async function statusChangeHandler(data: any) {
    if (id) {
      try {
        console.log(id);
        setIsLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          router.push("/auth/login");
          throw new Error("Access token not found in local storage");
        }

        const res = await axios.patch(
          `${API_BASE_URL}/orders/change-status/${id}/`,
          {
            status: data.status,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        onDeleteSuccess();
        setIsModalOpen(false);

        router.push(`/order/myorders`);

        console.log(res);
      } catch (error: any) {
        console.log("error from add loading errors", error);
        formErrorHandler(error);
      } finally {
        setIsLoading(false);
      }
    }
  }
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Status>({
    resolver: zodResolver(statusSchema),
  });
  const formErrorHandler = useFormErrorHandler<Status>(setError);
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
  console.log("order", data);
  return (
    // <div>
    //   <div className="flex flex-wrap ">
    //     {Array.isArray(data) && data.length > 0 ? (
    //       // Render address items if data is an array and not empty
    //       data.map((order: RequestedOrder) => (
    //         <div
    //           className={`w-2/3 rounded-md border-solid border-2 container mx-auto p-2 shadow-xl mt-2 transition-transform duration-300 hover:shadow-md   ${
    //             order.status === "accepted"
    //               ? "border-green-500"
    //               : order.status === "rejected"
    //               ? "border-red-500"
    //               : order.status === "cancelled"
    //               ? "border-red-900 "
    //               : "border-black-500"
    //           }`}
    //           key={order.id}
    //         >
    //           <h2 className="font-semibold		my-2 text-xl	">Order Details</h2>
    //           <ul>
    //             <div className="group flex flex-wrap font-bold">
    //               <li className="w-1/2 my-1 ">
    //                 <span className="text-gray-400		">Customer: </span>
    //                 {order.customer_name}
    //               </li>
    //               <li className="w-1/2 my-1">
    //                 <span className="text-gray-400		">Product: </span>
    //                 {order.product}
    //               </li>
    //               <li className="w-1/2 my-1">
    //                 <span className="text-gray-400		">Quantity: </span>
    //                 {order.quantity}
    //                 {order.unit}
    //               </li>
    //               <li className="w-1/2 my-1 text-green-800	">
    //                 <span className="text-gray-400		">Created At: </span>
    //                 {formatDate(order.created_at)}
    //               </li>
    //               <li className="w-1/2 my-3">
    //                 <span className="text-gray-400		">Note: </span>
    //                 {order.note}
    //               </li>
    //               <li className="w-1/2 my-3">
    //                 <span className="text-gray-400		">trip count: </span>
    //                 {order.trip_count}
    //               </li>

    //               {order.status == "in_progress" && (
    //                 <li className="w-1/2 my-3 hover:text-green-500">
    //                   <span className="text-gray-400		">Track Order: </span>
    //                   <Link href={`/order/trackorder/${order.id}`}>
    //                     {" "}
    //                     Click Here
    //                   </Link>
    //                 </li>
    //               )}
    //               <li
    //                 className={`w-1/2 my-1 cursor-pointer ${
    //                   order.status === "cancelled"
    //                     ? "text-red-600 font-bold"
    //                     : order.status === "accepted"
    //                     ? "text-green-400 font-bold"
    //                     : order.status === "in_progress"
    //                     ? "text-blue-700 font-bold"
    //                     : ""
    //                 }`}
    //                 onClick={() => {
    //                   setIsModalOpen(true);
    //                   setId(order.id);
    //                 }}
    //               >
    //                 <span className="text-gray-400	">Status: </span>
    //                 <FontAwesomeIcon icon={faGauge} />

    //                 {order.status}
    //               </li>
    //             </div>
    //           </ul>
    //           <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
    //             <FontAwesomeIcon icon={faAddressCard} />
    //             {order.customer_location.type} Location:
    //           </h2>
    //           <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
    //             <li>Address Title ({order.customer_location.title})</li>
    //             <li>Address({order.customer_location.address}) </li>
    //             <li>Details({order.customer_location.details})</li>
    //           </ul>

    //           {isModalOpen && (
    //             <div
    //               onClick={handleModalClick}
    //               id="middle-center-modal"
    //               data-modal-placement="middle-center"
    //               tabIndex={-1}
    //               className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-30"
    //             >
    //               <div className="bg-white rounded-lg shadow p-6 w-1/2">
    //                 <h3 className="text-xl font-medium text-gray-900">
    //                   Order Request
    //                 </h3>
    //                 <form
    //                   noValidate
    //                   onSubmit={handleSubmit(statusChangeHandler)}
    //                   // onClick={}
    //                 >
    //                   <div className="input-containers flex ">
    //                     <div className="m-2 w-full">
    //                       <label htmlFor="status">Order Status</label>
    //                       <select
    //                         id="status"
    //                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
    //                         {...register("status", {
    //                           onChange: (e) =>
    //                             setSelectedStatus(e.target.value),
    //                         })}
    //                       >
    //                         <option selected disabled hidden>
    //                           Choose here
    //                         </option>

    //                         <option value={"cancelled"}>Cancelled</option>
    //                       </select>
    //                     </div>
    //                   </div>
    //                   <div className="flex justify-end">
    //                     <button
    //                       className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //                       type="submit"
    //                     >
    //                       {isLoading ? (
    //                         <Spinner size="sm" color="primary" />
    //                       ) : (
    //                         "Submit"
    //                       )}
    //                     </button>
    //                   </div>
    //                 </form>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       ))
    //     ) : (
    //       // Render a message when data is not available
    //       <div>No data available</div>
    //     )}
    //   </div>
    // </div>
    <>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((order: RequestedOrder) => (
          <div
            onClick={() => {
              selectedOrderHandler(order.id);
              setSelectedOrderId(order.id);
            }}
            key={order.id}
            className={`order-item hover:bg-green-50 border hover:border-green-400 rounded-xl cursor-pointer p-2 mx-2 mb-2 ${
              selectedOrderId == order.id ? "border-green-400 bg-green-50" : ""
            }  `}
          >
            <div className="order-item-head flex justify-between ">
              <div className="flex">
                <div className="order-item-head-img flex mb-2 ">
                  <div className="w-30 h-30 rounded-full mr-2 overflow-hidden flex justify-center items-centers ">
                    <span className="h-full w-full object-cover">
                      <svg
                        width="38"
                        height="41"
                        viewBox="0 0 38 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.22943 9.35209L17.6039 1.05134C18.3313 0.68252 19.1903 0.680811 19.9194 1.04621L36.331 9.27252C36.8099 9.5127 37.0503 9.97403 37.0513 10.4361L37.0977 30.9225C37.0986 31.3846 36.8606 31.8474 36.3827 32.0893L20.0082 40.39C19.6445 40.5746 19.2479 40.6671 18.8512 40.668C18.4543 40.669 18.0574 40.578 17.6928 40.3952L1.28093 32.1686C0.802029 31.9287 0.561844 31.4673 0.560867 31.005L0.514492 10.5186C0.513515 10.0565 0.751503 9.59398 1.22943 9.3516V9.35209Z"
                          fill="#66C3A7"
                        />
                        <path
                          d="M0.537758 10.4775V30.9642C0.537758 31.4263 0.776722 31.8883 1.25514 32.1293L17.6484 40.3929C18.0126 40.5765 18.4093 40.6682 18.8062 40.6682V10.4775H0.537758Z"
                          fill="#40B491"
                        />
                        <path
                          d="M1.25475 11.6427L17.648 19.9064C18.3764 20.2735 19.2351 20.2735 19.9635 19.9064L26.107 16.8094L30.8821 14.4024L36.3568 11.6427C37.3134 11.1607 37.3134 9.79474 36.3568 9.31242L19.9635 1.04877C19.2351 0.68166 18.3764 0.68166 17.648 1.04877L1.25475 9.31242C0.298164 9.7945 0.298164 11.1604 1.25475 11.6427Z"
                          fill="#7FCDB5"
                        />
                        <path
                          d="M6.24515 6.79759L26.1072 16.8099L30.8823 14.4029L11.0198 4.39062L6.24515 6.79759Z"
                          fill="#ECF8F4"
                        />
                        <path
                          d="M26.1072 16.8093V26.5726L30.8823 24.1657V14.4023L26.1072 16.8093Z"
                          fill="#C4E8DD"
                        />
                        <path
                          d="M22.7127 37.1076C22.7127 37.1869 22.6573 37.2829 22.5887 37.3227L21.6258 37.8784C21.5567 37.9182 21.5008 37.8863 21.5005 37.8074C21.5005 37.7774 21.5086 37.744 21.523 37.712C21.5374 37.6802 21.5579 37.6497 21.5826 37.6251L21.9619 37.2487L21.9594 36.3468C21.5677 36.4945 21.2691 36.2738 21.2677 35.8017L21.2635 34.3047L21.8618 33.9593V34.6716L22.1393 34.4153L22.1181 35.2694L22.4598 34.1375H22.2889V33.7128L22.9299 33.3428L22.9341 34.8398C22.9353 35.3121 22.6387 35.8764 22.2475 36.181L22.2499 37.083L22.6302 37.0207C22.6795 37.0129 22.7127 37.0478 22.7129 37.1081L22.7127 37.1076Z"
                          fill="#1B4C3D"
                        />
                        <path
                          d="M27.1612 34.232C27.2417 34.1854 27.3074 34.2225 27.3076 34.3153L27.3086 34.6406C27.3088 34.7332 27.2437 34.8459 27.1631 34.8925L24.2934 36.5494C24.213 36.5958 24.1474 36.5585 24.1471 36.4662L24.1462 36.1408C24.1459 36.0481 24.2111 35.9355 24.2914 35.8892L27.1612 34.2323V34.232Z"
                          fill="#1B4C3D"
                        />
                        <path
                          d="M24.882 32.582L25.5513 33.3109L25.1515 33.5418L25.1556 34.9895L24.6225 35.2973L24.6184 33.8496L24.2185 34.0803L24.882 32.582Z"
                          fill="#1B4C3D"
                        />
                        <path
                          d="M26.5539 31.6162L27.2231 32.3451L26.8236 32.576L26.8277 34.0237L26.2949 34.3312L26.2907 32.8835L25.8909 33.1144L26.5539 31.6162Z"
                          fill="#1B4C3D"
                        />
                        <path
                          d="M3.70261 26.1002C3.52857 25.9999 3.3643 26.0111 3.2735 26.1297L3.08603 26.3748L2.70452 25.8932C2.70062 25.8883 2.69696 25.8854 2.69378 25.8834C2.68744 25.8798 2.68255 25.8807 2.68036 25.882C2.67694 25.8834 2.66962 25.8886 2.67474 25.9059L3.13266 27.4253C3.13583 27.4361 3.1434 27.4461 3.15145 27.4507L4.3863 28.0671C4.39997 28.0739 4.40388 28.0644 4.4051 28.0597C4.40632 28.0553 4.40729 28.0431 4.39582 28.0285L3.97501 27.4973L4.32113 27.045L4.50883 26.7995C4.51201 26.7953 4.51542 26.7912 4.51884 26.787C4.52006 26.7858 4.52128 26.7846 4.52226 26.7831C4.5247 26.7805 4.5269 26.7778 4.52934 26.7753C4.5308 26.7739 4.53227 26.7724 4.53373 26.7709C4.53593 26.7687 4.53813 26.7665 4.54032 26.7643C4.54203 26.7629 4.54349 26.7614 4.5452 26.76C4.5474 26.758 4.5496 26.756 4.55179 26.7541C4.5535 26.7526 4.55521 26.7512 4.55716 26.7499C4.55936 26.7482 4.56131 26.7463 4.56375 26.7446C4.56571 26.7431 4.56766 26.7419 4.56961 26.7404C4.57181 26.739 4.57376 26.7373 4.5762 26.7358C4.57816 26.7343 4.58035 26.7331 4.5823 26.7319C4.5845 26.7304 4.5867 26.729 4.5889 26.7277C4.59085 26.7265 4.59305 26.7253 4.59524 26.7241C4.59768 26.7229 4.59988 26.7214 4.60207 26.7202C4.60427 26.7192 4.60647 26.718 4.60867 26.717C4.61086 26.7158 4.6133 26.7146 4.6155 26.7136C4.6177 26.7126 4.62014 26.7116 4.62234 26.7106C4.62478 26.7097 4.62697 26.7087 4.62941 26.7075C4.63161 26.7065 4.63405 26.7058 4.63649 26.7048C4.63893 26.7038 4.64137 26.7028 4.64382 26.7021C4.64626 26.7011 4.64845 26.7006 4.65089 26.6997C4.65333 26.6989 4.65578 26.6982 4.65846 26.6975C4.6609 26.6967 4.66334 26.6962 4.66578 26.6955C4.66822 26.6948 4.67091 26.694 4.67335 26.6936C4.67579 26.6931 4.67823 26.6926 4.68092 26.6921C4.6836 26.6916 4.68629 26.6911 4.68873 26.6904C4.69117 26.6899 4.69385 26.6897 4.69629 26.6892C4.69898 26.6887 4.70166 26.6884 4.70435 26.6879C4.70703 26.6879 4.70947 26.6875 4.71216 26.6872C4.71436 26.6872 4.71655 26.6867 4.71875 26.6865L3.70309 26.1002H3.70261Z"
                          fill="#1B4C3D"
                        />
                        <path
                          d="M5.83922 30.9159L4.67882 30.2571C4.64147 30.2358 4.61121 30.2534 4.61096 30.2961L4.60681 31.3293C4.60681 31.3503 4.61389 31.3743 4.62683 31.3967C4.63977 31.4189 4.65661 31.4365 4.67467 31.447L5.55168 31.9449C5.72694 32.0445 5.8917 32.0311 5.98201 31.91C6.00008 31.8856 6.01497 31.8573 6.02644 31.8258C6.04304 31.7799 6.05256 31.7267 6.05402 31.6684C6.05451 31.6464 6.05402 31.6237 6.05231 31.6003C6.04767 31.5383 6.03523 31.4726 6.01545 31.406C6.0096 31.387 6.00325 31.3677 5.99641 31.3484L5.83971 30.9159H5.83922Z"
                          fill="#1B4C3D"
                        />
                        <path
                          d="M5.71184 29.0601C5.70135 29.0538 5.69427 29.0545 5.6906 29.0606L5.12749 30.0042C5.12139 30.0147 5.12822 30.0289 5.1314 30.0343C5.13359 30.0382 5.13847 30.0455 5.14531 30.0494C5.14824 30.0511 5.15166 30.0523 5.15556 30.0521L5.58735 30.0323L6.06333 31.3472C6.06626 31.3553 6.06895 31.3631 6.07187 31.3711C6.07456 31.3792 6.07724 31.387 6.07968 31.3948C6.0809 31.3982 6.08188 31.4017 6.08286 31.4051C6.08432 31.4095 6.08554 31.4141 6.08701 31.4185L6.09091 31.4322C6.09189 31.4356 6.09286 31.4388 6.0936 31.4419C6.09506 31.447 6.09628 31.4522 6.0975 31.4573C6.09823 31.46 6.09897 31.4629 6.0997 31.4656C6.10092 31.471 6.10214 31.4761 6.10336 31.4812C6.10653 31.4942 6.10751 31.4993 6.10873 31.5047C6.11141 31.5173 6.11239 31.5225 6.11337 31.5276C6.11386 31.5303 6.11434 31.5327 6.11483 31.5354C6.11581 31.5403 6.11654 31.5454 6.11727 31.5501C6.11776 31.5527 6.11825 31.5557 6.11874 31.5584C6.11947 31.563 6.1202 31.5676 6.12093 31.5725C6.12142 31.5754 6.12191 31.5784 6.12216 31.5813C6.12264 31.5857 6.12313 31.5898 6.12386 31.5942C6.12435 31.5974 6.1246 31.6008 6.12484 31.604C6.12533 31.6079 6.12582 31.6118 6.12606 31.6157C6.12655 31.6194 6.12679 31.6228 6.12704 31.6265C6.12728 31.6299 6.12752 31.6333 6.12777 31.637C6.12801 31.6409 6.12826 31.645 6.12875 31.6489C6.12875 31.6521 6.12899 31.655 6.12923 31.6579C6.12923 31.6623 6.12972 31.6667 6.12972 31.6711C6.12972 31.6736 6.12972 31.6763 6.12972 31.6787C6.12972 31.6836 6.12996 31.6885 6.12996 31.6931C6.12996 31.7031 6.12996 31.7073 6.12996 31.7114L6.65281 31.0094C6.74239 30.8891 6.74776 30.6755 6.66672 30.4519L6.49952 29.9901L6.89104 29.972C6.90275 29.9715 6.90227 29.9586 6.90153 29.953C6.9008 29.9474 6.89738 29.9335 6.8842 29.9237L5.7116 29.0603L5.71184 29.0601Z"
                          fill="#1B4C3D"
                        />
                        <path
                          d="M5.00594 26.8533C4.91953 26.8032 4.83386 26.7796 4.75819 26.7849C4.68276 26.7901 4.61881 26.824 4.57365 26.8831L4.39791 27.1127L4.99715 28.6002C5.00984 28.6317 5.0323 28.6581 5.05549 28.6715C5.06721 28.6783 5.07941 28.6817 5.09015 28.6805L5.86538 28.5992C5.88124 28.5975 5.89223 28.5868 5.89687 28.5687C5.90126 28.5509 5.89857 28.5282 5.8893 28.5048L5.43676 27.3812C5.3462 27.1567 5.18144 26.9543 5.00618 26.8533H5.00594Z"
                          fill="#1B4C3D"
                        />
                        <path
                          d="M3.59079 29.0144C3.58786 29.0126 3.58542 29.0119 3.58371 29.0117C3.57932 29.0107 3.56931 29.0104 3.56931 29.0261L3.57346 29.5926L2.55072 29.0043C2.5434 29.0002 2.5373 28.9965 2.5312 28.9926C2.529 28.9912 2.52656 28.9897 2.52436 28.9882C2.52046 28.9858 2.5168 28.9834 2.51289 28.9809C2.50898 28.9785 2.50532 28.9758 2.50142 28.9733C2.49922 28.9719 2.49678 28.9704 2.49458 28.9687C2.49019 28.9658 2.48604 28.9626 2.48165 28.9594C2.47188 28.9524 2.46724 28.9489 2.46285 28.9458C2.45357 28.9387 2.44918 28.9353 2.44454 28.9316C2.43551 28.9245 2.43112 28.9209 2.42673 28.9172C2.41769 28.9099 2.41355 28.9062 2.40915 28.9026C2.40012 28.8947 2.39597 28.8911 2.39207 28.8872C2.38279 28.8789 2.37888 28.8752 2.37498 28.8716C2.37278 28.8696 2.37083 28.8677 2.36888 28.8657C2.36522 28.8623 2.3618 28.8589 2.35814 28.8552C2.35594 28.853 2.3535 28.8508 2.3513 28.8486C2.34813 28.8454 2.34496 28.842 2.34154 28.8389C2.3391 28.8364 2.33641 28.8337 2.33397 28.831C2.33104 28.8281 2.32836 28.8249 2.32543 28.822C2.3225 28.8188 2.31981 28.8159 2.31689 28.8127C2.31444 28.81 2.31201 28.8071 2.30956 28.8044C2.30639 28.801 2.30322 28.7974 2.2998 28.7939C2.29785 28.7915 2.29565 28.7891 2.2937 28.7869C2.29028 28.783 2.28662 28.7788 2.2832 28.7747C2.27515 28.7651 2.27197 28.7615 2.26904 28.7578L2.79481 30.0593C2.88488 30.2819 3.04842 30.4823 3.22197 30.5826L3.582 30.7899L3.58566 31.3037C3.58566 31.3193 3.59567 31.3303 3.60007 31.3344C3.60153 31.3359 3.60397 31.3378 3.6069 31.3395C3.61178 31.3425 3.61813 31.3439 3.62301 31.3388L4.31696 30.6327C4.32208 30.6273 4.32208 30.6163 4.31696 30.6053L3.60666 29.0336C3.60177 29.0227 3.59543 29.017 3.59055 29.0141L3.59079 29.0144Z"
                          fill="#1B4C3D"
                        />
                        <path
                          d="M2.57006 27.1401C2.56322 27.1362 2.55639 27.1333 2.54955 27.1321C2.53198 27.1282 2.51782 27.1338 2.50928 27.1475L2.10409 27.8097C2.02305 27.9417 2.02916 28.1636 2.11971 28.3882C2.12362 28.3977 2.12606 28.4035 2.1285 28.4094C2.13241 28.4187 2.13509 28.4243 2.13753 28.4299C2.14192 28.4394 2.14437 28.4448 2.14705 28.4504C2.14827 28.4526 2.14925 28.4548 2.15022 28.457C2.15242 28.4616 2.15462 28.4663 2.15682 28.4707C2.15852 28.4741 2.16023 28.4773 2.16194 28.4804C2.16365 28.4838 2.16536 28.4873 2.16707 28.4907C2.16975 28.4956 2.17219 28.5004 2.17488 28.5053C2.21393 28.5771 2.2564 28.6405 2.30327 28.6984C2.32036 28.7194 2.33817 28.7394 2.35623 28.7584C2.40749 28.8126 2.46217 28.859 2.51758 28.8951C2.52832 28.9022 2.53906 28.9088 2.5498 28.9149L2.88737 29.109L3.42389 28.2324C3.44122 28.2044 3.42852 28.1497 3.39557 28.1106L2.60179 27.1675C2.59178 27.1555 2.5808 27.1462 2.57006 27.1399V27.1401Z"
                          fill="#1B4C3D"
                        />
                        <path
                          d="M35.0557 30.068C35.1289 30.0257 35.1882 30.0597 35.1885 30.1436C35.1885 30.2274 35.1297 30.3299 35.0567 30.3721L32.9973 31.5611C32.9241 31.6033 32.8647 31.5694 32.8645 31.4854C32.8645 31.4014 32.9233 31.2992 32.9963 31.2569L35.0557 30.068Z"
                          fill="#1B4C3D"
                        />
                        <path
                          d="M35.0528 29.2428C35.126 29.2005 35.1853 29.2345 35.1855 29.3184C35.1858 29.4024 35.1267 29.5044 35.0537 29.5467L31.8606 31.3903C31.7876 31.4325 31.7283 31.3986 31.728 31.3148C31.728 31.2309 31.7868 31.1286 31.8598 31.0866L35.053 29.243L35.0528 29.2428Z"
                          fill="#1B4C3D"
                        />
                        <path
                          d="M31.2036 33.1509L35.7192 30.5438L35.7105 27.4824L31.1948 30.0895L31.2036 33.1509ZM35.0541 29.5469L31.8609 31.3905C31.7879 31.4328 31.7286 31.3988 31.7284 31.3151C31.7284 31.2311 31.7872 31.1289 31.8602 31.0869L35.0534 29.2433C35.1266 29.2011 35.1859 29.235 35.1861 29.319C35.1861 29.4027 35.1273 29.5049 35.0543 29.5472M35.0519 28.7222L31.8587 30.5658C31.7857 30.608 31.7264 30.5741 31.7262 30.4901C31.7259 30.4061 31.785 30.3041 31.858 30.2619L35.0512 28.4183C35.1244 28.376 35.1837 28.41 35.184 28.4937C35.1842 28.5774 35.1251 28.6799 35.0521 28.7222M35.0568 30.3722L32.9974 31.5612C32.9242 31.6034 32.8649 31.5695 32.8646 31.4855C32.8644 31.4015 32.9234 31.2992 32.9964 31.257L35.0558 30.0681C35.129 30.0258 35.1883 30.0598 35.1886 30.1437C35.1886 30.2275 35.1298 30.33 35.0568 30.3722Z"
                          fill="white"
                        />
                        <path
                          d="M35.0503 28.4176C35.1235 28.3754 35.1829 28.4093 35.1831 28.493C35.1831 28.577 35.1243 28.6792 35.0513 28.7215L31.8581 30.5651C31.7851 30.6073 31.7258 30.5734 31.7256 30.4894C31.7256 30.4057 31.7844 30.3034 31.8574 30.2612L35.0506 28.4176H35.0503Z"
                          fill="#1B4C3D"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p>{order?.company_name}</p>
                    <p>{order?.created_at}</p>
                  </div>
                </div>
              </div>
              <div className="status flex items-center">
                <div
                  className={`flex justify-center min-w-24 ${
                    order.status == "accepted"
                      ? "bg-cyan-400 text-blue-700"
                      : order.status == "in_progress"
                      ? "bg-amber-300 text-yellow-700"
                      : order.status == "rejected"
                      ? "bg-red-400 text-red-800"
                      : order.status == "cancelled"
                      ? "bg-red-500 text-black"
                      : order.status == "completed"
                      ? "bg-lime-400 text-green-900"
                      : "bg-gray-400"
                  } p-1 rounded-lg`}
                >
                  <p>{order.status}</p>
                </div>
              </div>
            </div>
            <div className="info flex">
              <div className="w-1/4">
                <p className="text-zinc-400">Product</p>
                <p>{order.product}</p>
              </div>
              <div className="w-1/4">
                <p className="text-zinc-400">Quantity</p>
                <p>
                  {order.quantity} {order.unit}
                </p>
              </div>
              <div className="w-2/4">
                <p className="text-zinc-400">Date Of Start Date</p>
                <p>{order.delivery_start_date}</p>
              </div>
              <div className="w-1/4"></div>
            </div>
          </div>
        ))
      ) : (
        <p>No orders available</p>
      )}
    </>
  );
};

export default CompanyOrderComponent;
