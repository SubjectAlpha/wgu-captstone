import { Customers } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/opencms/utility/prisma";

type Response = {
	customers?: Customers[];
	message?: string;
};

// Get customers by creator id
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	if (req.method === "GET") {
		try {
			const customers = await prisma.customers.findMany({
				where: {
					createdBy: {
						equals: req.query.creatorId + "",
					},
				},
			});

			if (customers) {
				res.status(200).json({
					customers: customers,
				});
			} else {
				res.status(404).json({ message: "Not found" });
			}
		} catch (e: any) {
			res.status(500).json({
				message: e,
			});
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
