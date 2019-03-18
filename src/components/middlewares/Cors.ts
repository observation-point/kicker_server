import { NextFunction, Request as RequestExpress, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { UserAttrib } from "../../infrastructure/entities";
export interface Session {
	user: UserAttrib;
}

export interface Request extends RequestExpress {
	id: string;
	session: Session;
	sessionID: string;
}

@Middleware({ type: "before" })
export class Cors implements ExpressMiddlewareInterface {

	public use(req: Request, res: Response, next: NextFunction) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
		res.header("Access-Control-Allow-Headers", "Content-Type");
		next();

	}
}
