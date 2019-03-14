import { NextFunction, Request as RequestExpress, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import * as path from "path";


const PUBLIC_PATH = path.join(__dirname, "../public");
const INDEX_HTML_PATH = path.join(PUBLIC_PATH, "index.html");
const API_BASIC_URL = "/";

@Middleware({ type: "before" })
export class Static implements ExpressMiddlewareInterface {


	public use(req: Request, res: Response, next: NextFunction) {
		if (!req.url.startsWith(API_BASIC_URL)) {
			res.sendFile(INDEX_HTML_PATH);
		} else {
		  next();
		}
	}
}
