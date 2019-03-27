import { NextFunction, Request, Response } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";

export class CheckObserverToken implements ExpressMiddlewareInterface {

	public use(req: Request, res: Response, next: NextFunction) {
		const token = "Bearer e9ec11d6-941b-4ce5-8eea-8061a79b4bf8";
  if (req.headers.authorization !== token) {
			throw new Error("invalid token");
		}
		next();

	}
}
