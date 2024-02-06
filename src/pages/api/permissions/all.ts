import { Permissions } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/opencms/utility/prisma";

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
		try {
			const perms = await prisma.permissions.findMany();
			if (perms) {
				res.status(200).json({
					permission: perms,
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
