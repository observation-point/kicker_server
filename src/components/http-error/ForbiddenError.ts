import { HttpError } from "./HttpError";
import { ErrorCode } from "./types";

class ForbiddenError extends HttpError {
	public get code(): number {
		return ErrorCode.Forbidden;
	}
}

export { ForbiddenError };
