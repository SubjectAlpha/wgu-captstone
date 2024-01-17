import { Users } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/opencrm/utility/prisma";

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
			.then((o) => {
				if (!o) {
					res.status(200);
				}
			})
			.catch((e) => {
				res.status(500).json({
					message: e,
				});
			})
			.finally(() => {
				res.status(403);
			});
	} else {
		res.status(405);
	}
}
