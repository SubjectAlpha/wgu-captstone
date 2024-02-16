import { DialogPopup } from "@/opencms/components/DialogPopup";
import PanelPage from "@/opencms/components/panel/Page";
import Table from "@/opencms/components/table";
import { get, post, remove } from "@/opencms/utility/fetch";
import { Generate } from "@/opencms/utility/pwd";
import { EmailRegex } from "@/opencms/utility/regex";
import {
	Typography,
	Input,
	Select,
	Option,
	Button,
} from "@material-tailwind/react";
import { Permissions, Customers } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
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
    const [searchText, setSearchText] = useState("");
	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState({} as Customers);
	const session = useSession();
	const router = useRouter();

	const customersQuery = useQuery({
		queryKey: ["customersQuery"],
		queryFn: async () => {
			let result = await get("/api/customers");
			return result.customers;
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

    // FIXME:
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
			return post("/api/customers", body);
		},
		onSuccess: (data) => {
			if (data) {
				resetFields();
				setSuccessMessage(
					"Customer created successfully, they may now login."
				);
			}
		},
		onError: (error) => {
			setErrorMessage(error.message);
		},
	});

	const getCustomerMutation = useMutation({
		mutationKey: ["getCustomerMutation"],
		mutationFn: (uuid: string) => {
			return get("/api/customers/" + uuid);
		},
		onSuccess(data) {
			if (data.customer) {
				setId(data.customer.id);
				setName(data.customer.name);
				setEmail(data.customer.email);
				setPermission(data.customer.permission.toString());
				setSelectedCustomer(data.customer);
			}
		},
	});

	const deleteCustomerMutation = useMutation({
		mutationKey: ["deleteCustomerMutation"],
		mutationFn: (uuid: string) => {
			return remove("/api/customers/" + uuid);
		},
	});

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
		setSelectedCustomer({} as Customers);
		setShowDialog(true);
	}

	function onRowClick(uuid: string, event: MouseEventHandler) {
		setErrorMessage("");
		getCustomerMutation.mutate(uuid);
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
				setSuccessMessage("Customer creation successful.");
			}
		} else {
			const emailError =
				"The email address field cannot be blank, and have a valid email address.";

			setErrorMessage(emailError);
		}
	}

	async function deleteClick() {
		const result = await deleteCustomerMutation.mutateAsync(selectedCustomer.id);
		if (result.message == "customer deleted successfully") {
			setSuccessMessage("Customer deleted successfully");
			setShowConfirmationDialog(false);
		}
	}

	if (customersQuery.data) {
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
					title="Customers"
					objectList={customersQuery.data}
					onAddClick={onAddClick}
					onRowClick={onRowClick}
				/>
				<DialogPopup
					show={showConfirmationDialog}
					titleText="Delete Customer?"
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
						Really delete {selectedCustomer?.email}?
					</Typography>
				</DialogPopup>
				<DialogPopup
					show={showDialog}
					titleText={selectedCustomer.id ? "Modify Customer" : "Create Customer"}
					toggleOpen={() => {
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
							{"Customer's Name"}
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
						{selectedCustomer.id && (
							<Button
								placeholder={undefined}
								onClick={() => {
									setShowDialog(false);
									setShowConfirmationDialog(true);
								}}
							>
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
