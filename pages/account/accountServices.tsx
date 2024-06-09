import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { API_BASE_URL } from "@configs/envs";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountServiceSchema } from "@zod_schemas/accountServiceSchema";
import AccountService from "@components/account/AccountService";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { AccountServiceSchemaInterface } from "@app_types/interfaces/forms_schemas/AccountServiceSchemaInterface";

const AccountServices = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountServiceSchemaInterface>({
    resolver: zodResolver(accountServiceSchema),
  });
  const formErrorHandler =
    useFormErrorHandler<AccountServiceSchemaInterface>(setError);

  async function accountServiceSubmitHandler(
    data: AccountServiceSchemaInterface
  ) {
    console.log(data);
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }
      console.log("hello");
      const res = await axios.post(
        `${API_BASE_URL}/logistics/services/`,
        {
          title: data.title,
          description: data.description,
          unit: data.unit,
          // price: data.price,
          // available: data.available,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/account/myservices");

      console.log(res);
    } catch (error: any) {
      console.log("error from account service", error);
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AccountService
      errors={errors}
      register={register}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      accountServiceSubmitHandler={accountServiceSubmitHandler}
    />
  );
};
export default AccountServices;
