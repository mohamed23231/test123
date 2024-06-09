import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { API_BASE_URL } from "@configs/envs";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyAccountSchema } from "@zod_schemas/accountInfoSchema";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { CompanyAccount } from "@app_types/interfaces/forms_schemas/AccountInfoSchemaInterface";
import CompleteProfileCompany from "@components/account/Profile/CompleteProfileCompany";
const Companyinfo = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyAccount>({
    resolver: zodResolver(companyAccountSchema),
  });
  const formErrorHandler = useFormErrorHandler<CompanyAccount>(setError);

  async function accountInfoSubmitHandler(data: CompanyAccount) {
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
          organization: data.organization,
          register_number: data.register_number,
          tax_number: data.tax_number,
          bio: data.bio,
          phone: data.phone,
          address: data.address,
          //   license_expiry_date: data.license_expiry_date, ==> for logo on the Future
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
    <CompleteProfileCompany
      errors={errors}
      register={register}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      accountInfoSubmitHandler={accountInfoSubmitHandler}
    />
  );
};

export default Companyinfo;
