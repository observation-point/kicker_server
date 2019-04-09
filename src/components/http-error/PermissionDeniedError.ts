import { HttpError } from "./HttpError";
import { ErrorCode } from "./types";

class PermissionDeniedError extends HttpError {
	public get code(): number {
		return ErrorCode.PermissionDenied;
	}
}

export { PermissionDeniedError };
