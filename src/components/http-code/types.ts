export enum Success {
	Ok = 200,
	Created = 201,
	NoContent = 204
}

export enum Error {
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	UnprocessableEntity = 422,
	InternalServerError = 500,
	PermissionDenied = 550
}
