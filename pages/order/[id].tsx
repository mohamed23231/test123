// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// const [AddData, setData] = useState([]);
// const [isLoading, setIsLoading] = useState(false);
// import { API_BASE_URL } from "@configs/envs";
// import axios from "axios";
// import BuyService from "@components/BuyService/BuyService";
// import { useForm } from "react-hook-form";
// import useFormErrorHandler from "../../hooks/useFormErrorHandler";
// import { OrderInfoSchemaInterface } from "@app_types/interfaces/forms_schemas/OrderInfoSchemaInterface";
// import { orderInfoSchema } from "@zod_schemas/orderInfoSchema";
// import { zodResolver } from "@hookform/resolvers/zod";

// function Makeorder() {
//   const {
//     register,
//     setError,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<OrderInfoSchemaInterface>({
//     resolver: zodResolver(orderInfoSchema),
//   });
//   const formErrorHandler =
//     useFormErrorHandler<OrderInfoSchemaInterface>(setError);

//   const router = useRouter();

//   const { id } = router.query;

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         throw new Error("Access token not found in local storage");
//       }

//       const response = await axios.get(
//         `${API_BASE_URL}/accounts/loading-locations`,
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       setData(response.data.results);
//     } catch (error) {
//       console.log("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const makeOrederHandler = () => {
//     console.log("hello");
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   console.log(id);

//   return (
//     <BuyService
//       register={register}
//       isLoading={isLoading}
//       handleSubmit={handleSubmit}
//       loadingAddress={AddData}
//       makeOrederHandler={makeOrederHandler}
//     />
//   );
// }

// export default Makeorder;
import React from "react";

function Orders() {
  return <div>Orders</div>;
}

export default Orders;
