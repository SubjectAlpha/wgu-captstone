import { createHmac } from "crypto";
import { env } from "process";

export function Hash(rawPassword: string) {
	const hmac = createHmac("sha512", env.HMAC_SECRET!);
	hmac.update(rawPassword);

	return hmac.digest("hex");
}

export function Compare(rawPassword: string, hashedPassword: string) {
	const hashed = Hash(rawPassword);
	return hashedPassword === hashed;
}
