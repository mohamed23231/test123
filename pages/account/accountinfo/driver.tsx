import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { API_BASE_URL } from "@configs/envs";
import { zodResolver } from "@hookform/resolvers/zod";
import { driverAccountSchema } from "@zod_schemas/accountInfoSchema";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { DriverAccount } from "@app_types/interfaces/forms_schemas/AccountInfoSchemaInterface";
import CompleteProfileDriver from "@components/account/Profile/CompleteProfileDriver";
const Driverinfo = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverAccount>({
    resolver: zodResolver(driverAccountSchema),
  });
  const formErrorHandler = useFormErrorHandler<DriverAccount>(setError);

  async function accountInfoSubmitHandler(data: DriverAccount) {
    try {
      console.log(data);
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const res = await axios.put(
        `${API_BASE_URL}/accounts/`,
        {
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          address: data.address,
          national_id: data.national_id,
          license_number: data.license_number,
          license_expiry_date: data.license_expiry_date,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      router.push("/");
    } catch (error: any) {
      console.log("error from account info", error);
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CompleteProfileDriver
      errors={errors}
      register={register}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      accountInfoSubmitHandler={accountInfoSubmitHandler}
    />
  );
};

export default Driverinfo;
