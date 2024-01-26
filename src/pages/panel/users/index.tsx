import { DialogPopup } from "@/opencrm/components/DialogPopup";
import PanelPage from "@/opencrm/components/panel/Page";
import Table from "@/opencrm/components/table";
import { get, post, remove } from "@/opencrm/utility/fetch";
import { Generate } from "@/opencrm/utility/pwd";
import {
	EmailRegex,
} from "@/opencrm/utility/regex";
import {
	Typography,
	Input,
	Select,
	Option,
	Button,
} from "@material-tailwind/react";
import { Permissions, Users } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { randomBytes } from "crypto";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";

const Index = () => {
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [permission, setPermission] = useState("0");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [showDialog, setShowDialog] = useState(false);

	const [showConfirmationDialog, setShowConfirmationDialog] =
		useState(false);
    const [selectedUser, setSelectedUser] = useState({} as Users);
	const session = useSession();
	const router = useRouter();

	const usersQuery = useQuery({
		queryKey: ["usersQuery"],
		queryFn: async () => {
			let result = await get("/api/users");
			return result.users;
		},
		refetchInterval: 15 * 1000,
	});

	const permissionsQuery = useQuery({
		queryKey: ["findAllPermissions"],
		queryFn: async () => {
			let result = await get("/api/permissions/all");
			return result.permission;
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
			id: string;
			name: string;
			email: string;
			permission?: string;
			password?: string;
			confirmPassword?: string;
		}) => {
			if (!body.id) {
				const password = Generate(24);
				body.password = password;
				body.confirmPassword = password;
			}
			console.log(body);
			return post("/api/users", body);
		},
		onSuccess: (data) => {
			if (data) {
				resetFields();
				setSuccessMessage(
					"User created successfully, they may now login."
				);
			}
		},
		onError: (error) => {
			setErrorMessage(error.message);
		},
	});

	const getUserMutation = useMutation({
		mutationKey: ["getUserMutation"],
		mutationFn: (uuid: string) => {
			return get("/api/users/" + uuid);
		},
		onSuccess(data) {
			if (data.user) {
				setId(data.user.id);
				setName(data.user.name);
				setEmail(data.user.email);
				setPermission(data.user.permission.toString());
                setSelectedUser(data.user);
			}
		},
	});

    const deleteUserMutation = useMutation({
        mutationKey: ["deleteUserMutation"],
        mutationFn: (uuid: string) => {
            return remove("/api/users/" + uuid);
        }
    })

	function resetFields() {
		setId("");
		setName("");
		setEmail("");
		setErrorMessage("");
		setSuccessMessage("");
		setPermission("0");
	}

	function onAddClick(event: MouseEventHandler) {
		resetFields();
		setSelectedUser({} as Users);
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

	function onPermissionChange(value: string | undefined) {
		setPermission(value ?? "0");
	}

	async function registerClick() {
		if (email) {
			setErrorMessage("");
			if (!EmailRegex.test(email)) {
				setErrorMessage("Invalid email address");
				return;
			}

			const result = await registrationMutation.mutateAsync({
				id,
				name,
				email,
				permission,
			});

			if (result) {
				setShowDialog(false);
				setSuccessMessage("User account creation successful.");
			}
		} else {
			const emailError =
				"The email address field cannot be blank, and have a valid email address.";

			setErrorMessage(emailError);
		}
	}

    async function deleteClick() {
        const result = await deleteUserMutation.mutateAsync(selectedUser.id);
        console.log("delete result", result);
    }

	if (usersQuery.data) {
		return (
			<PanelPage
				router={router}
				session={session}
				className="h-full"
				minimumAccessPermission="admin"
			>
				{successMessage.length > 0 && (
					<p className="text-xl bg-white text-center rounded m-4 text-green-500 p-2">
						{successMessage}
					</p>
				)}
				<Table
					title="Users"
					objectList={usersQuery.data}
					onAddClick={onAddClick}
					onRowClick={onRowClick}
				/>
                <DialogPopup
                    show={showConfirmationDialog}
					titleText="Delete User?"
					toggleOpen={() => {
                        setShowConfirmationDialog(!showConfirmationDialog);
                    }}
					onConfirm={deleteClick}
                >
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-3"
                        placeholder={undefined}
                    >
                        Really delete {selectedUser?.name}?
                    </Typography>
                </DialogPopup>
				<DialogPopup
                    show={showDialog}
					titleText={selectedUser.id ? "Modify User" : "Create User"}
					toggleOpen={() => {
                        console.log("calling 1")
                        setShowDialog(!showDialog);
                    }}
					onConfirm={registerClick}
				>
					<div className="mb-1 flex flex-col gap-4">
						<Typography
							variant="h6"
							color="blue-gray"
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
							placeholder={undefined}
						>
							Permission Level
						</Typography>
						<Select
							placeholder={undefined}
							onChange={onPermissionChange}
							value={permission}
						>
							{permissionsQuery.data ? (
								permissionsQuery.data.map((p: Permissions) => {
									return (
										<Option
											key={p.powerLevel}
											value={p.powerLevel + ""}
										>
											{p.name}
										</Option>
									);
								})
							) : (
								<Option value="-1">Permission</Option>
							)}
						</Select>
						{selectedUser.id && (
							<Button placeholder={undefined} onClick={() => {
                                setShowDialog(false);
                                setShowConfirmationDialog(true);
                            }}>
								Delete
							</Button>
						)}
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
