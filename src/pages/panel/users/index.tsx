import { DialogPopup } from "@/opencrm/components/DialogPopup";
import PanelPage from "@/opencrm/components/panel/Page";
import Table from "@/opencrm/components/table";
import { get, post } from "@/opencrm/utility/fetch";
import {
	EmailRegex,
	PasswordComplexityMessage,
	PasswordRegex,
} from "@/opencrm/utility/regex";
import { Typography, Input, Select, Option } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";

const Index = () => {
	const [selectedUser, setSelectedUser] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [permission, setPermission] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [showDialog, setShowDialog] = useState(false);
	const session = useSession();
	const router = useRouter();

	const usersQuery = useQuery({
		queryKey: ["usersQuery"],
		queryFn: async () => {
			let result = await get("/api/users");
			return result.users;
		},
		refetchInterval: -1,
	});

	const permissionsQuery = useQuery({
		queryKey: ["findAllPermissions"],
		queryFn: async () => {
			let result = await get("/api/permissions");
		},
	});

	useEffect(() => {
		if (email != "" && !EmailRegex.test(email)) {
			setErrorMessage("Invalid email address");
		} else {
			setErrorMessage("");
		}
	}, [email]);

	const registrationMutation = useMutation({
		mutationFn: (body: {
			email: string;
			password: string;
			confirmPassword: string;
		}) => {
			return post("/api/users", body);
		},
		onSuccess: (data) => {
			if (data) {
				setEmail("");
				setSuccessMessage(
					"User created successfully, they may now login."
				);
			}
		},
		onError: (error) => {
			setErrorMessage(error.message);
		},
	});

	const updateMutation = useMutation({
		mutationFn: (body: {
			uuid: string;
			email: string;
			permission: string;
		}) => {
			return post("/api/users/" + body.uuid, body);
		},
		onSuccess: (data) => {
			if (data) {
				resetFields();
				setSuccessMessage("User updated successfully");
			}
		},
		onError: (error) => {
			setErrorMessage(error.message);
		},
	});

	const getUserMutation = useMutation({
		mutationFn: (uuid: string) => {
			return get("/api/users/" + uuid);
		},
		onSuccess(data, variables, context) {
			if (data.user) {
				console.log(data.user);
				setName(data.user.name);
				setEmail(data.user.email);
				//setPermission()
			}
		},
	});

	function resetFields() {
		setName("");
		setEmail("");
		setErrorMessage("");
		setSuccessMessage("");
		setSelectedUser(null);
		//setPermission()
	}

	function onAddClick(event: MouseEventHandler) {
		resetFields();
		setShowDialog(true);
	}

	function onRowClick(uuid: string, event: MouseEventHandler) {
		getUserMutation.mutate(uuid);
		setShowDialog(true);
	}

	function onNameChange(event: ChangeEvent<HTMLInputElement>) {
		setName(event.target.value);
	}

	function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value);
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

	if (usersQuery.data) {
		return (
			<PanelPage
				router={router}
				session={session}
				className="h-full"
				minimumAccessPermission="admin"
			>
				<Table
					title="Users"
					objectList={usersQuery.data}
					onAddClick={onAddClick}
					hiddenProperties={[
						"id",
						"createdBy",
						"updatedBy",
						"createdAt",
						"updatedAt",
					]}
					onRowClick={onRowClick}
				/>
				<DialogPopup
					show={showDialog}
					titleText="Modify User"
					setShow={setShowDialog}
					onConfirm={registerClick}
				>
					<div className="mb-1 flex flex-col gap-4">
						<Typography
							variant="h6"
							color="blue-gray"
							className="-mb-3"
							placeholder={undefined}
						>
							{"User's Name"}
						</Typography>
						<Input
							placeholder="John Doe"
							className=" !border-t-blue-gray-100 focus:!border-t-gray-900"
							labelProps={{
								className:
									"before:content-none after:content-none",
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
								className:
									"before:content-none after:content-none",
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
							Permission Level
						</Typography>
						<Select placeholder={undefined}>
							<Option value="-1">Permission</Option>
						</Select>
					</div>
					{errorMessage.length > 0 ? (
						<p className="text-red-500 p-2 pt-0">{errorMessage}</p>
					) : (
						<span />
					)}
				</DialogPopup>
			</PanelPage>
		);
	} else {
		return <span />;
	}
};

export default Index;
