import { Permissions } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/opencrm/utility/prisma";

type Response = {
	permission?: Permissions;
	message?: string;
};

// Get a permission by its name
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	if (req.method === "GET") {
		try {
			const permission = await prisma.permissions.findFirst({
				where: {
					name: {
						equals: req.query.name + "",
					},
				},
			});

			if (permission) {
				res.status(200).json({
					permission: permission,
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
