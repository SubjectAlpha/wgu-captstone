import { Users } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/opencrm/utility/prisma";
import { Hash } from "@/opencrm/utility/pwd";
import {
	EmailRegex,
	PasswordComplexityMessage,
	PasswordRegex,
	UUIDRegex,
} from "@/opencrm/utility/regex";

type GetResponse = {
	users?: Users[];
	message?: string;
};

type PostResponse = {
	user?: Users;
	message?: string;
};

// Get a permission by its name
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<GetResponse | PostResponse>
) {
	if (req.method === "GET") {
		const queryParams = req.query.handler as string[];
		try {
			if (queryParams && queryParams.length > 0) {
				if (UUIDRegex.test(queryParams[0])) {
					prisma.users
						.findUnique({
							where: {
								id: queryParams[0],
							},
						})
						.then((o) => {
							if (o) {
								const { password, ...user } = o;
								res.status(200).json({ user: user });
							}
						})
						.catch((e) => {
							res.status(500).json({ message: e });
						})
						.finally(() => {
							res.status(404).json({ message: "Not found" });
						});
				} else {
					res.status(400).json({ message: "Bad Request" });
				}
			} else {
				prisma.users
					.findMany()
					.then((o) => {
						const users: any = o.map((u) => {
							const { password, ...user } = u;
							return user;
						});
						res.status(200).json({
							users: users,
						});
					})
					.catch((e) => {
						res.status(500).json({ message: e });
					});
			}
		} catch (ex: any) {
			res.status(500).json({
				message: ex,
			});
		}
	} else if (req.method == "POST") {
		try {
			const body = req.body;
			const id = body.id;
			const name = body.name;
			const email = body.email;
			const password = body.password;
			const permission: string = body.permission;
			const confirmPassword = body.confirmPassword;

			if (
				!email &&
                (!id &&
				!password ||
				!confirmPassword ||
				password !== confirmPassword)
			) {
				res.status(400).json({
					message:
						"Missing required fields, or passwords do not match.",
				});
			}

			if (!EmailRegex.test(email)) {
				res.status(400).json({ message: "Invalid email address" });
			}

			if (id === "") {
                if (!PasswordRegex.test(password)) {
                    res.status(400).json({ message: PasswordComplexityMessage });
                }

				const user = await prisma.users.create({
					data: {
						name: name,
						permission: parseInt(permission) ?? 0,
						email: email,
						password: Hash(password),
					},
				});

				res.status(200).json({ user: user });
			} else {
                const p = parseInt(permission) ?? 0;
                console.log(p);
				const user = await prisma.users.update({
					where: {
						id: id,
					},
					data: {
						name: name,
						permission: p,
						email: email,
					},
				});

				res.status(200).json({ user: user });
			}
		} catch (ex: any) {
			res.status(500).json({
				message: ex,
			});
		}
	} else if (req.method == "PUT") {
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
