import { EventHandler, MouseEventHandler, useEffect, useState } from "react";
import { post } from "@/opencrm/utility/fetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";

export default function Setup() {
	const [name, setName] = useState("admin");
	const [email, setEmail] = useState("test@mail.com");
	const [password, setPassword] = useState("example");
	const [useDevData, setDevData] = useState(false);
	const [allow, setAllow] = useState(false);
	const router = useRouter();

	const isCompleteResponse = useQuery({
		queryKey: ["allow_init"],
		queryFn: async () => {
			await post("/api/setup/check");
		},
	});

	const initMutation = useMutation({
		mutationKey: ["init"],
		mutationFn: async (body: {
			name: string;
			email: string;
			password: string;
			useDevData: boolean;
		}) => {
			await post("/api/setup/init", body);
		},
	});

	useEffect(() => {
		setAllow(isCompleteResponse.isSuccess);

		if (!isCompleteResponse.isSuccess) {
			router.push("/");
		}
	}, [isCompleteResponse.isSuccess]);

	async function onClick(e: any) {
		e.preventDefault();

		if (allow) {
			initMutation.mutate({ name, email, password, useDevData });
		}
	}

	if (allow) {
		return (
			<div className="container mx-auto flex flex-col items-center bg-gray-900/50 w-1/2 h-1/2 m-64 p-12 mb-0 gap-4">
				<Typography type="h1" placeholder="title">
					Initialize OpenCRM
				</Typography>
				<form onSubmit={onClick} className="flex flex-col gap-2">
					<Input
						type="text"
						placeholder={name}
						crossOrigin=""
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<Input
						type="text"
						placeholder="email"
						crossOrigin=""
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<Input
						type="password"
						placeholder="password"
						crossOrigin=""
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<div>
						<Checkbox
							className="text-white"
							label="Use dev data?"
							crossOrigin=""
							onClick={(e) => {
								setDevData(e.target.checked);
							}}
						/>
					</div>
					<Button type="submit" placeholder="submit button">
						Initialize Open CRM!
					</Button>
				</form>
			</div>
		);
	} else {
		<span />;
	}
}
