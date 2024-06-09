// import { useState } from "react";
// import axios from "axios";
// import { z } from "zod";
// import ChangePasswordForm from "../../components/auth/ChangePasswordForm";
// const baseUrl = "https://goride.e-diamond.pro/api";

// /**
//  * Schema for validating password change form data using Zod.
//  */
// const schema = z.object({
// 	old_password: z.string().min(8),
// 	new_password: z
// 		.string()
// 		.min(8)
// 		.regex(
// 			/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง~])(?=.{8,})/,
// 			{
// 				message:
// 					"Password must contain at least one lowercase letter, one uppercase letter, and one special character",
// 			}
// 		),
// 	re_new_password: z.string().transform((data) => {
// 		if (data.re_new_password !== data.new_password) {
// 			throw new Error("Passwords don't match");
// 		}
// 		return data.re_new_password;
// 	}),
// });

// /**
//  * Component for handling password change.
//  */
// export default function ChangePassword() {
// 	// State for form errors
// 	const [formErrors, setFormErrors] = useState({});
// 	// State for loading status
// 	const [isLoading, setIsLoading] = useState(false);
// 	// State for form data
// 	const [formData, setFormData] = useState({
// 		old_password: "",
// 		new_password: "",
// 		re_new_password: "",
// 	});

// 	/**
// 	 * Logic for password change.
// 	 */
// 	const changePwLogic = async () => {
// 		try {
// 			const res = await axios.post(
// 				`${baseUrl}/auth/password/change/`,
// 				formData
// 			);
// 			console.log(res.data);
// 		} catch (error) {
// 			if (error?.response) {
// 				setFormErrors({
// 					...formErrors,
// 					serverError: error.response.data.message,
// 				});
// 			}
// 		}
// 	};

// 	/**
// 	 * Handler for form submission.
// 	 * @param {Event} e - Form submit event.
// 	 */
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setIsLoading(true); // Set loading to true when the button is clicked
// 		try {
// 			await schema.parseAsync(formData); // Validate the form data asynchronously
// 			await changePwLogic(); // Perform password change logic
// 		} catch (error) {
// 			if (error.errors && error.errors.length > 0) {
// 				const errors = {};
// 				error.errors.forEach((err) => {
// 					errors[err.path[0]] = err.message;
// 				});
// 				setFormErrors(errors);
// 			}
// 		} finally {
// 			setIsLoading(false); // Set loading to false after password change logic completes
// 		}
// 	};

// 	/**
// 	 * Handler for input changes.
// 	 * @param {Event} e - Input change event.
// 	 */
// 	const handleChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 		setFormErrors({
// 			...formErrors,
// 			[e.target.name]: undefined,
// 			serverError: undefined,
// 		});
// 	};

// 	// Render the ChangePasswordForm component with props
// 	return (
// 		<ChangePasswordForm
// 			handleChange={handleChange}
// 			handleSubmit={handleSubmit}
// 			formData={formData}
// 			formErrors={formErrors}
// 			isLoading={isLoading}
// 		/>
// 	);
// }
import React from "react";

function ChangePasswordForm() {
  return <div>changePassword</div>;
}

export default ChangePasswordForm;
