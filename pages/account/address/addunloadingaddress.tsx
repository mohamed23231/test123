// import axios from "axios";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";
// import { API_BASE_URL } from "@configs/envs";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { AddLocationsInterface } from "@app_types/interfaces/forms_schemas/AddLocationsInterface";
// import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
// import { addLocationsSchema } from "@zod_schemas/addLocationsSchema";
// import { LoadingAddress } from "@components/account/addresses/loadingAddress/AddLoadingAddress";
// // import CompleteAccountDataForm from "../../components/account/completeAccountDataForm";

// const AddUnloadingAddress = () => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const {
//     register,
//     setError,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<AddLocationsInterface>({
//     resolver: zodResolver(addLocationsSchema),
//   });
//   const formErrorHandler = useFormErrorHandler<AddLocationsInterface>(setError);

//   async function addLocationSubmitHandler(data: AddLocationsInterface) {
//     try {
//       setIsLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         router.push("/auth/login");
//         throw new Error("Access token not found in local storage");
//       }

//       const res = await axios.post(
//         `${API_BASE_URL}/logistics/locations/`,
//         {
//           type: "unloading",
//           title: data.title,
//           address: data.address,
//           phone: data.phone,
//           details: data.details,
//           gate: data.gate,
//         },
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(res);
//       router.push(`/account/address/unloadingaddress`);
//     } catch (error: any) {
//       console.log("error from add loading errors", error);
//       formErrorHandler(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <>
//       <LoadingAddress
//         register={register}
//         handleSubmit={handleSubmit}
//         addLocationSubmitHandler={addLocationSubmitHandler}
//         errors={errors}
//         isLoading={isLoading}
//       />
//     </>
//   );
// };
// export default AddUnloadingAddress;
import React from "react";

function addunloadingaddress() {
  return <div>addunloadingaddress</div>;
}

export default addunloadingaddress;
