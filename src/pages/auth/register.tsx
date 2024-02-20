import { ChangeEvent, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { post } from "@/opencms/utility/fetch";
import {
	EmailRegex,
	PasswordComplexityMessage,
	PasswordRegex,
} from "@/opencms/utility/regex";
import { useRouter } from "next/router";
import { Card, Typography, Button, Input } from "@material-tailwind/react";

export default function Index() {
    const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const router = useRouter();
	const session = useSession();

	if (session && session.status === "authenticated") {
		router.push("/");
	}

	useEffect(() => {
		if (!EmailRegex.test(email)) {
			setErrorMessage("Invalid email address");
		} else {
			setErrorMessage("");
		}
	}, [email]);

	useEffect(() => {
		if (!PasswordRegex.test(password)) {
			setErrorMessage(PasswordComplexityMessage);
		} else {
			setErrorMessage("");
		}
	}, [password, confirmPassword]);

	useEffect(() => {
		if (password != confirmPassword) {
			setErrorMessage("Passwords do not match");
		} else {
			setErrorMessage("");
		}
	}, [confirmPassword]);

	const registrationMutation = useMutation({
		mutationFn: (body: {
            name: string;
			email: string;
			password: string;
			confirmPassword: string;
		}) => {
			return post("/api/users", body);
		},
		onSuccess: (data) => {
			if (data) {
                setName("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
				setSuccessMessage(
					"User created successfully, you may now login."
				);
			}
		},
		onError: (error) => {
			setErrorMessage(error.message);
		},
	});

    function onNameChange(event: ChangeEvent<HTMLInputElement>) {
		setName(event.target.value);
	}

	function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value);
	}

	function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value);
	}

	function onConfirmPasswordChange(event: ChangeEvent<HTMLInputElement>) {
		setConfirmPassword(event.target.value);
	}

	async function registerClick() {
		if (email && password && confirmPassword) {
			setErrorMessage("");
			if (!EmailRegex.test(email)) {
				setErrorMessage("Invalid email address");
				return;
			}
			if (!PasswordRegex.test(password)) {
				setErrorMessage(PasswordComplexityMessage);
				return;
			}
			if (password === confirmPassword) {
				const result = await registrationMutation.mutateAsync({
                    name,
					email,
					password,
					confirmPassword,
				});
				if (result) {
					setSuccessMessage(
						"User account creation successful, you may now log in."
					);
				}
			} else {
				setErrorMessage("Passwords do not match");
				return;
			}
		} else {
			const emailError =
				"The email address field cannot be blank, and have a valid email address.";
			const passwordError = "The password fields cannot be blank.";

			setErrorMessage(email == "" ? emailError : passwordError);
		}
	}

	return (
		<Card
			className="container mx-auto w-3/4 h-3/4 flex flex-col bg-white mt-28 items-center pt-12"
			color="transparent"
			shadow={false}
			placeholder={undefined}
		>
			<Typography variant="h4" color="blue-gray" placeholder={undefined}>
				Sign up to Open-CRM
			</Typography>
			{successMessage.length > 0 ? (
				<p className="text-xl text-green-500 p-2 pt-0">
					{successMessage}
				</p>
			) : (
				<span />
			)}
			<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
				<div className="mb-1 flex flex-col gap-4">
					<Typography
						variant="h6"
						color="blue-gray"
						className="-mb-3"
						placeholder={undefined}
					>
						Your Name
					</Typography>
					<Input
						placeholder="John Doe"
						className=" !border-t-blue-gray-100 focus:!border-t-gray-900"
						labelProps={{
							className: "before:content-none after:content-none",
						}}
						value={name}
						onChange={onNameChange}
						crossOrigin={undefined}
					/>

					<Typography
						variant="h6"
						color="blue-gray"
						className="-mb-3"
						placeholder={undefined}
					>
						Your Email
					</Typography>
					<Input
						placeholder="john.doe@mail.com"
						className=" !border-t-blue-gray-100 focus:!border-t-gray-900"
						labelProps={{
							className: "before:content-none after:content-none",
						}}
						value={email}
						onChange={onEmailChange}
						crossOrigin={undefined}
					/>

					<Typography
						variant="h6"
						color="blue-gray"
						className="-mb-3"
						placeholder={undefined}
					>
						Password
					</Typography>
					<Input
						type="password"
						placeholder="********"
						className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
						labelProps={{
							className: "before:content-none after:content-none",
						}}
						value={password}
						onChange={onPasswordChange}
						crossOrigin={undefined}
					/>

					<Typography
						variant="h6"
						color="blue-gray"
						className="-mb-3"
						placeholder={undefined}
					>
						Confirm Password
					</Typography>
					<Input
						type="password"
						placeholder="********"
						className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
						labelProps={{
							className: "before:content-none after:content-none",
						}}
						value={confirmPassword}
						onChange={onConfirmPasswordChange}
						crossOrigin={undefined}
					/>
				</div>
				{errorMessage.length > 0 ? (
					<p className="text-red-500 p-2 pt-0">{errorMessage}</p>
				) : (
					<span />
				)}
				<Button
					className="mt-6"
					fullWidth
					onClick={registerClick}
					placeholder={undefined}
				>
					sign up
				</Button>
				<Typography
					color="gray"
					className="mt-4 text-center font-normal"
					placeholder={undefined}
				>
					Already have an account?{" "}
					<Link
						className="font-medium text-gray-900"
						href={"/auth/signIn"}
					>
						Sign In
					</Link>
				</Typography>
			</form>
		</Card>
	);
}
