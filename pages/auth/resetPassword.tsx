import { useState, useEffect } from "react";
import { API_BASE_URL } from "@configs/envs";
import { useForm } from "react-hook-form";
import { EmailSchemaInterface } from "@app_types/interfaces/forms_schemas/EmailSchemaInterface";
import { emailSchema } from "@zod_schemas/emailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

/**
 * Component for handling user signup.
 */
export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [genericErrorMessage, setGenericErrorMessage] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValidating },
  } = useForm<EmailSchemaInterface>({ resolver: zodResolver(emailSchema) });
  const formErrorHandler = useFormErrorHandler<EmailSchemaInterface>(setError);
  // State for form data
  /**
   * Logic for user signup.
   */
  useEffect(() => {
    if (genericErrorMessage) setGenericErrorMessage("");
  }, [isValidating]);

  const resetPwSubmitHandler = async (data: EmailSchemaInterface) => {
    try {
      setGenericErrorMessage("");
      setIsLoading(true);
      const res = await axios.post(
        `${API_BASE_URL}/auth/password/request-reset/`,
        {
          email: data.email,
        }
      );
      if (res.data.success) {
        console.log("hello");
        setMailSent(true);
      }
    } catch (error: any) {
      if (error?.response?.data) {
        const genericErrorMessage = formErrorHandler(error);
        console.log(error);
        console.log(genericErrorMessage);
        if (genericErrorMessage) setGenericErrorMessage(genericErrorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmite = async (e) => {
  // 	console.log("clicked sub");
  // 	e.preventDefault();
  // 	setIsLoading(true); // Set loading to true when the button is clicked
  // 	try {
  // 		await schema.parseAsync(formData); // Validate the form data asynchronously
  // 		await resetPwLogic(); // Perform signup logic
  // 	} catch (error) {
  // 		if (error.errors && error.errors.length > 0) {
  // 			const errors = {};
  // 			error.errors.forEach((err) => {
  // 				errors[err.path[0]] = err.message;
  // 			});
  // 			setFormErrors(errors);
  // 		}
  // 	} finally {
  // 		setIsLoading(false); // Set loading to false after signup logic completes
  // 	}
  // };

  /**
   * Handler for input changes.
   */
  // const handleChange = (e) => {
  // 	setFormData({ ...formData, [e.target.name]: e.target.value });
  // 	setFormErrors({
  // 		...formErrors,
  // 		[e.target.name]: undefined,
  // 		serverError: undefined,
  // 	});
  // };

  // Render the SignupForm component with props
  return (
    <ResetPasswordForm
      errors={errors}
      genericErrorMessage={genericErrorMessage}
      register={register}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      resetPwSubmitHandler={resetPwSubmitHandler}
      mailSent={mailSent}
    />
  );
}
