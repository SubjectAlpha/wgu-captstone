import { Hash } from "@/opencrm/utility/pwd";
import { Users } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/opencrm/utility/prisma";
import {
	PasswordComplexityMessage,
	PasswordRegex,
} from "@/opencrm/utility/regex";

type Response = {
	user?: Users;
	message?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	if (req.method === "POST") {
		prisma.systemSettings
			.findFirst({
				where: {
					name: {
						equals: "EnableRegistration",
					},
				},
			})
			.then(async (o) => {
				if (!o) {
					await prisma.permissions.createMany({
						data: [
							{
								name: "admin",
								powerLevel: 9001,
							},
							{
								name: "user",
								powerLevel: 1,
							},
						],
					});

					await prisma.systemSettings.create({
						data: {
							name: "EnableRegistration",
							enabled: true,
						},
					});

					const body = req.body;
					const email = body.email;
					const name = body.name;
					const password = body.password;

					if (email && name && password) {
						if (PasswordRegex.test(password)) {
							let dbResponse = await prisma.users.create({
								data: {
									email: email,
									password: Hash(password),
									name: name,
									permission: 9001,
								},
							});

							res.status(200).json({
								user: dbResponse,
							});
						} else {
							res.status(400).json({
								message: PasswordComplexityMessage,
							});
						}
					} else {
						res.status(400).json({
							message:
								"Request must contain name, email, and password.",
						});
					}
				} else {
					res.status(403).end();
				}
			});
	} else {
		res.status(405).end();
	}
}
