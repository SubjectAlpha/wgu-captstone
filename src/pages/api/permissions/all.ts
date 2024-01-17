import { Permissions } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/opencrm/utility/prisma";
import { randomBytes } from "crypto";

type Response = {
	permission?: Permissions | Permissions[];
	message?: string;
};

// Get a permission by its name
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	if (req.method === "GET") {
		prisma.permissions
			.findMany()
			.then((o) => {
				if (o) {
					res.status(200).json({
						permission: o,
					});
				}
			})
			.catch((e) => {
				res.status(500).json({
					message: e,
				});
			})
			.finally(() => {
				res.status(404).json({ message: "Not found" });
			});
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
