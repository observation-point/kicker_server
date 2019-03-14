import * as crypto from "crypto";

const ITERATION_COUNT = 3000;
const KEYLEN = 100;
const DIGSET = "sha512";
const SALT_SIZE = 16;

export function generatePasswordHash(
	pass: string,
	salt: string = generateSalt()
): string {
	if (pass !== pass.trim()) {
		throw new Error("Password can not include spaces at the beginning and the end.");
	}
	const hash = crypto.pbkdf2Sync(pass, salt, ITERATION_COUNT, KEYLEN, DIGSET);
	return salt + hash.toString("hex");
}

export function generateSalt(): string {
	const salt = crypto.randomBytes(SALT_SIZE).toString("hex");
	return salt.substr(0, SALT_SIZE);
}

export function getSalt(pass: string): string {
	return pass.substr(0, SALT_SIZE);
}
