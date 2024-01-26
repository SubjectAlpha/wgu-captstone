import { createHmac } from "crypto";
import { env } from "process";
import { getRandom } from "./random";

export function Hash(rawPassword: string) {
	const hmac = createHmac("sha512", env.HMAC_SECRET!);
	hmac.update(rawPassword);

	return hmac.digest("hex");
}

export function Compare(rawPassword: string, hashedPassword: string) {
	const hashed = Hash(rawPassword);
	return hashedPassword === hashed;
}

export function Generate(length: number) {
    let password = "";
    for(let i = 1; i < length + 1; i++) {
        if(i % 4) {
            password += getRandom("int");
        } else {
            let char = getRandom("char");
            if(i % 2 == 0) {
                char = char.toUpperCase();
            }
            password += char;
        }
    }
    return "!" + password + "@";
}
