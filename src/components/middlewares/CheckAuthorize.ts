import { NextFunction, Response } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { ForbiddenError } from "../http-error";
import { Request } from "./Session";

export class CheckAuthorize implements ExpressMiddlewareInterface {

	public use(req: Request, res: Response, next: NextFunction) {
		if (!req.session.user) {
			throw new ForbiddenError("not authorize");
		}
		next();

	}
}
