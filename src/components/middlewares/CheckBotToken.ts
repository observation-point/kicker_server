import { NextFunction, Request, Response } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { BotConfig, Config, ConfigType, ServicesConfig } from "../config";
import { PermissionDeniedError } from "../http-error";

export class CheckBotToken implements ExpressMiddlewareInterface {

	public use(req: Request, res: Response, next: NextFunction) {
		const { token } = Config.getInstance().getConfig(ConfigType.Bot) as BotConfig;

		if (req.headers["access-token"] !== token) {
			throw new PermissionDeniedError("invalid token");
		}
		next();

	}
}
