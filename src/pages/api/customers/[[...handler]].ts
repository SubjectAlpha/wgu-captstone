import { Customers } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/opencms/utility/prisma";
import { Hash } from "@/opencms/utility/pwd";
import {
	EmailRegex,
	PasswordComplexityMessage,
	PasswordRegex,
	UUIDRegex,
} from "@/opencms/utility/regex";

type GetResponse = {
	customers?: Customers[];
	message?: string;
};

type PostResponse = {
	customer?: Customers;
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
					const foundCustomer = await prisma.customers.findUnique({
						where: {
							id: queryParams[0],
						},
					});

					if (foundCustomer) {
						res.status(200).json({ customer: foundCustomer });
					} else {
						res.status(404).json({ message: "Not found" });
					}
				} else {
					res.status(400).json({ message: "Bad Request" });
				}
			} else {
				const foundCustomers = await prisma.customers.findMany({
					where: {
						isDeleted: false,
					},
				});

				if (foundCustomers) {
					res.status(200).json({
						customers: foundCustomers,
					});
				}
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
			const company = body.company;
			const email = body.email;
            const phone = body.phone;


			if (!EmailRegex.test(email)) {
				res.status(400).json({ message: "Invalid email address" });
			}

			if (id === "") {
				const customer = await prisma.customers.create({
					data: {
						company: company,
						email: email,
						phone: phone,
					},
				});

				res.status(200).json({ customer: customer });
			} else {
				const customer = await prisma.customers.update({
					where: {
						id: id,
					},
					data: {
						company: company,
						phone: phone,
						email: email,
					},
				});

				res.status(200).json({ customer: customer });
			}
		} catch (ex: any) {
			res.status(500).json({
				message: ex,
			});
		}
	} else if (req.method === "DELETE") {
		const queryParams = req.query.handler as string[];
		try {
			if (queryParams && queryParams.length > 0) {
				if (UUIDRegex.test(queryParams[0])) {
					await prisma.customers.update({
						where: {
							id: queryParams[0],
						},
						data: {
							isDeleted: true,
						},
					});
					res.status(200).json({
						message: "user deleted successfully",
					});
				}
			}
		} catch (e) {
			res.status(500).json({
				message: e + "",
			});
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
