import { ChangeEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { EmailRegex } from "@/opencrm/utility/regex";
import { Button, Card, Input, Typography } from "@material-tailwind/react";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const session = useSession();
	const router = useRouter();
	const searchParams = useSearchParams();
	const error = searchParams.get("error");

	if (session && session.status === "authenticated") {
		router.push("/");
	}

	useEffect(() => {
		if (error) {
			if (error === "CredentialsSignin") {
				setErrorMessage("Unknown email/password combination.");
			}
		}
	}, [error]);

	useEffect(() => {
		if (email.length > 0 && !EmailRegex.test(email)) {
			setErrorMessage("Invalid email address");
		} else {
			setErrorMessage("");
		}
	}, [email]);

	function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value);
	}

	function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value);
	}

	function loginClick(e: any) {
		e.preventDefault();
		if (email != "" && password != "") {
			setErrorMessage("");
			signIn("credentials", { email: email, password: password });
		} else {
			const emailError =
				"The email address field cannot be blank, and have a valid email address.";
			const passwordError = "The password field cannot be blank.";

			setErrorMessage(email == "" ? emailError : passwordError);
		}
	}

	return (
		<Card
			className="container mx-auto w-3/4 h-1/2 flex flex-col bg-white mt-28 items-center pt-12"
			color="transparent"
			shadow={false}
			placeholder={undefined}
		>
			<Typography variant="h4" color="blue-gray" placeholder={undefined}>
				Sign in to Open-CRM
			</Typography>
			<form
				className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
				onSubmit={loginClick}
			>
				<div className="mb-1 flex flex-col gap-4">
					<Typography
						variant="h6"
						color="blue-gray"
						className="-mb-3"
						placeholder={undefined}
					>
						Your Email
					</Typography>
					<Input
						placeholder="name@mail.com"
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
				</div>
				{errorMessage.length > 0 ? (
					<p className="text-red-500 p-2 pt-0">{errorMessage}</p>
				) : (
					<span />
				)}
				<Button
					type="submit"
					className="mt-6"
					fullWidth
					onClick={loginClick}
					placeholder={undefined}
				>
					sign in
				</Button>
				<Typography
					color="gray"
					className="mt-4 text-center font-normal"
					placeholder={undefined}
				>
					Need to create an account?{" "}
					<Link
						className="font-medium text-gray-900"
						href={"/auth/register"}
					>
						Sign Up
					</Link>
				</Typography>
			</form>
		</Card>
	);
}
