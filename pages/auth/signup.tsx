import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { API_BASE_URL } from "@configs/envs";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@zod_schemas/signupSchema";
import SignupForm from "../../components/auth/SignupForm";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { SignupSchemaInterface } from "@app_types/interfaces/forms_schemas/SingupSchemaInterface";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaInterface>({ resolver: zodResolver(signupSchema) });
  const formErrorHandler = useFormErrorHandler<SignupSchemaInterface>(setError);

  async function signupSubmitHandler(data: SignupSchemaInterface) {
    try {
      setIsLoading(true);
      const res = await axios.post(`${API_BASE_URL}/auth/signup/`, {
        email: data.email,
        password: data.password,
        role: data.role,
      });
      console.log(res);
      router.push("/auth/login");
    } catch (error: any) {
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SignupForm
      errors={errors}
      register={register}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      signupSubmitHandler={signupSubmitHandler}
    />
  );
}
