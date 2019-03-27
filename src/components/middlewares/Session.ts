import { NextFunction, Request as RequestExpress, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { UserAttributes } from "../../infrastructure/types";
import { redisStore } from "../redis/redisStore";

const expressSession = require("express-session");
export interface Session {
	user: UserAttributes;
}

export interface Request extends RequestExpress {
	id: string;
	session: Session;
	sessionID: string;
}

@Middleware({ type: "before" })
export class SessionMiddleware implements ExpressMiddlewareInterface {
	protected setSession = expressSession({
		cookie: {
			httpOnly: false,
			maxAge: null
		},
		secret: "kickerSecret",
		resave: false,
		saveUninitialized: true,
		store: redisStore
	});

	public use(req: Request, res: Response, next: NextFunction) {
		this.setSession(req, res, () => {
			if (!req.session) {
				throw new Error("Session not initialized (may be redis problem?)");
			}

			next();
		});
	}
}
