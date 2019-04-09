import { ErrorData, HttpError } from "./HttpError";
import { ErrorCode } from "./types";

interface AuthErrorItems {
	code: string;
	status: number;
	message: string;
	[property: string]: string[] | string | number;
}

interface AuthErrorData extends ErrorData {
	authErrors: AuthErrorItems;
}

export class AuthError extends HttpError {

	public get code(): ErrorCode {
		return this.authErrors_.status;
	}

	public get errorCode(): string {
		return this.authErrors_.code;
	}

	public get data(): AuthErrorData {
		return {
			...super.data,
			authErrors: this.authErrors_
		};
	}

	protected get authErrors(): AuthErrorItems {
		return this.authErrors_;
	}

	protected static getError(errorType: string): AuthErrorItems {
		let error: AuthErrorItems = null;
		switch (errorType) {
			case "WrongPassword":
				error = {
					code: "WrongPassword",
					status: ErrorCode.Unauthorized,
					message: "Wrong password"
				};
				break;
			case "UserBanned":
				error = {
					code: "UserBanned",
					status: ErrorCode.Forbidden,
					message: "User banned"
				};
				break;
			case "AccessError":
				error = {
					code: "AccessError",
					status: ErrorCode.UnprocessableEntity,
					message: "AccessError"
				};
				break;
			case "NotAdmin":
				error = {
					code: "AccessError",
					status: ErrorCode.Forbidden,
					message: "Not admin"
				};
				break;
		}

		return error;
	}
	protected authErrors_: AuthErrorItems;

	constructor(errorType: string) {
		super();
		this.authErrors_ = AuthError.getError(errorType);
	}
}
