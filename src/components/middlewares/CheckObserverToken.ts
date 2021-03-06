import { NextFunction, Request, Response } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { Config, ConfigType, ServicesConfig } from "../config";
import { PermissionDeniedError } from "../http-error";

export class CheckObserverToken implements ExpressMiddlewareInterface {

	public use(req: Request, res: Response, next: NextFunction) {
		const BEARER_PREFIX = "Bearer ";

		const { token } = Config.getInstance().getConfig(ConfigType.Services) as ServicesConfig;

		if (req.headers.authorization !== BEARER_PREFIX + token) {
			throw new PermissionDeniedError("invalid token");
		}
		next();

	}
}
