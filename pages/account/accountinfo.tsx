import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { API_BASE_URL } from "@configs/envs";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountInfoSchema } from "@zod_schemas/accountInfoSchema";
import CompleteAccountDataForm from "../../components/account/completeAccountDataForm";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { AccountInfoSchemaInterface } from "@app_types/interfaces/forms_schemas/AccountInfoSchemaInterface";

const Accountinfo = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountInfoSchemaInterface>({
    resolver: zodResolver(accountInfoSchema),
  });
  const formErrorHandler =
    useFormErrorHandler<AccountInfoSchemaInterface>(setError);

  async function accountInfoSubmitHandler(data: AccountInfoSchemaInterface) {
    try {
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
          city: data.city,
          street: data.street,
          phone: data.phone,
          bio: data.bio,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (error: any) {
      console.log("error from account info", error);
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CompleteAccountDataForm
      errors={errors}
      register={register}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      accountInfoSubmitHandler={accountInfoSubmitHandler}
    />
  );
};

export default Accountinfo;
