import { NextFunction, Response } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request } from "./Session";

export class CheckAuthorize implements ExpressMiddlewareInterface {

	public use(req: Request, res: Response, next: NextFunction) {
		// console.log(process.env.KICKER_ENV);
		if (!req.session.user) { // && process.env.KICKER_ENV !== "dev") {
			throw new Error("not authorize");
		}
		next();

	}
}
