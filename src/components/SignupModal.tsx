import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface SignupModalProps {
	show: boolean;
	onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ show, onClose }) => {
	if (!show) return null;

	const initialValues = {
		email: "",
		password: "",
		confirmPassword: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email address").required("Required"),
		password: Yup.string().required("Required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), undefined], "Passwords must match")
			.required("Required"),
	});

	const handleSubmit = (values: { email: string; password: string }) => {
		const users = JSON.parse(localStorage.getItem("users") || "[]");
		const userExists = users.some(
			(u: { email: string }) => u.email === values.email
		);
		if (userExists) {
			toast.error("User already exists. Please login.");
		} else {
			users.push({ email: values.email, password: values.password });
			localStorage.setItem("users", JSON.stringify(users));
			toast.success("Signed up successfully. Please login.");
			onClose();
		}
	};

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
				<div className="bg-white text-[#000] rounded-lg p-8 w-1/3">
					<h2 className="text-2xl font-bold mb-4">Sign Up</h2>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}>
						<Form>
							<div className="mb-4">
								<label className="block text-gray-700">Email</label>
								<Field
									type="email"
									name="email"
									className="w-full p-2 border border-gray-300 rounded mt-2"
								/>
								<ErrorMessage
									name="email"
									component="div"
									className="text-red-500 text-sm"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700">Password</label>
								<Field
									type="password"
									name="password"
									className="w-full p-2 border border-gray-300 rounded mt-2"
								/>
								<ErrorMessage
									name="password"
									component="div"
									className="text-red-500 text-sm"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700">Confirm Password</label>
								<Field
									type="password"
									name="confirmPassword"
									className="w-full p-2 border border-gray-300 rounded mt-2"
								/>
								<ErrorMessage
									name="confirmPassword"
									component="div"
									className="text-red-500 text-sm"
								/>
							</div>
							<div className="flex justify-between items-center">
								<button
									type="submit"
									className="bg-blue-500 text-white px-4 py-2 rounded">
									Sign Up
								</button>
								<button
									type="button"
									onClick={onClose}
									className="text-gray-500 hover:underline">
									Cancel
								</button>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default SignupModal;
