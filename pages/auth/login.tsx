import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@configs/envs";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@zod_schemas/loginSchema";
import LoginForm from "../../components/auth/LoginForm";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { LoginSchemaInterface } from "@app_types/interfaces/forms_schemas/LoginSchemaInterface";
import { useDispatch } from "react-redux";
import { setUserRole } from "../../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const [mailSent, setMailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [genericErrorMessage, setGenericErrorMessage] = useState("");
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValidating },
  } = useForm<LoginSchemaInterface>({ resolver: zodResolver(loginSchema) });
  const formErrorHandler = useFormErrorHandler<LoginSchemaInterface>(setError);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (accessToken && tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration);
      const currentTime = Date.now();

      if (currentTime < expirationTime) {
        router.push("/");
      }
    }
  }, []);

  const handleSuccessfulLogin = (userRole: string) => {
    dispatch(setUserRole(userRole));

    // Save the user role to local storage
    localStorage.setItem("userRole", userRole);
  };

  useEffect(() => {
    if (genericErrorMessage) setGenericErrorMessage("");
  }, [isValidating]);

  const loginSubmitHandler = async (data: LoginSchemaInterface) => {
    setIsLoading(true);
    setGenericErrorMessage("");
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login/`, {
        email: data.email,
        password: data.password,
      });
      //TODO: Fix this.
      if (!res.data.email_verified) {
        setEmailVerified(true);
      } else if (res.data.email_verified && !res.data.profile_completed) {
        const { access, refresh } = res.data.tokens;

        // TODO: The expiration time from decoded token instead of hardcoding it
        const expirationTime = new Date(Date.now() + 30 * 60 * 1000); // Current time + 30 minutes
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem(
          "tokenExpiration",
          expirationTime.getTime().toString()
        ); // Save expiration time
        // router.push("/account/accountinfo");
        switch (res.data.role) {
          case "manager":
            router.push("/account/accountinfo/manager");
            break;
          case "company":
            router.push("/account/accountinfo/company");
            break;
          case "driver":
            router.push("/account/accountinfo/driver");
            break;
          default:
            // Handle any unexpected roles or empty roles
            console.error("Unexpected or empty role received from API");
            break;
        }
      } else if (res.data.email_verified && res.data.profile_completed) {
        const { access, refresh } = res.data.tokens;
        const expirationTime = new Date(Date.now() + 30 * 60 * 1000); // Current time + 30 minutes
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem(
          "tokenExpiration",
          expirationTime.getTime().toString()
        ); // Save expiration time
        router.push("/");
      }

      handleSuccessfulLogin(res.data.role);
      // dispatch(setUserRole(res.data.role));
    } catch (error) {
      const genericErrorMessage = formErrorHandler(error);
      if (genericErrorMessage) setGenericErrorMessage(genericErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const requestVerifyCode = async () => {
    try {
      //TODO: fix this (only email field should be visible when using this)
      // const result = await loginSchema.safeParseAsync(data);
      // console.log(result);
      // const resVerify = await axios.post(
      // 	`${API_BASE_URL}/auth/email/request-verify/`,
      // 	{
      // 		email: data?.email,
      // 	}
      // );
      // if (resVerify.data.success) {
      // 	setEmailVerified(false);
      // 	setMailSent(true);
      // }
    } catch (error) {
      const genericErrorMessage = formErrorHandler(error);
      if (genericErrorMessage) setGenericErrorMessage(genericErrorMessage);
    }
  };

  return (
    <LoginForm
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      loginSubmitHandler={loginSubmitHandler}
      isLoading={isLoading}
      emailVerified={emailVerified}
      requestVerifyCode={requestVerifyCode}
      genericErrorMessage={genericErrorMessage}
      mailSent={mailSent}
    />
  );
};

export default Login;
