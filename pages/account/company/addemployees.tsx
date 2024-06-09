// import axios from "axios";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";
// import { API_BASE_URL } from "@configs/envs";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { addEmplyeeSchema } from "@zod_schemas/addEmplyeeSchema";
// import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
// import { AddEmployees } from "@app_types/interfaces/forms_schemas/AccountInfoSchemaInterface";
// import AddEmplyees from "@components/account/Company/AddEmplyees";
// import { toast } from "react-hot-toast";

// const Addemployees = () => {
//   const notifySuccess = (message: string) => toast.success(`${message}`);

//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const {
//     register,
//     setError,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<AddEmployees>({
//     resolver: zodResolver(addEmplyeeSchema),
//   });
//   const formErrorHandler = useFormErrorHandler<AddEmployees>(setError);

//   async function accountInfoSubmitHandler(data: AddEmployees) {
//     try {
//       setIsLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         router.push("/auth/login");
//         throw new Error("Access token not found in local storage");
//       }
//       if (data?.role == "driver") {
//         const res = await axios.post(
//           `${API_BASE_URL}/employees/drivers/`,
//           {
//             driver_email: data.email,
//           },
//           {
//             headers: {
//               Accept: "application/json",
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         notifySuccess("employee Added");
//         router.push("/account/company/employees");

//         console.log(res);
//       } else if (data?.role == "manager") {
//         const res = await axios.post(
//           `${API_BASE_URL}/employees/managers/`,
//           {
//             manager_email: data.email,
//           },
//           {
//             headers: {
//               Accept: "application/json",
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         console.log(res);
//       }

//       router.push("/account/company/employees");
//     } catch (error: any) {
//       console.log("error from account info", error);
//       formErrorHandler(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <AddEmplyees
//       errors={errors}
//       register={register}
//       isLoading={isLoading}
//       handleSubmit={handleSubmit}
//       accountInfoSubmitHandler={accountInfoSubmitHandler}
//     />
//   );
// };

// export default Addemployees;
import React from "react";

function addemployees() {
  return <div>addemployees</div>;
}

export default addemployees;
