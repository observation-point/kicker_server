import { Cors } from "./Cors";
import { SessionMiddleware } from "./Session";

export const middlewares = [
	SessionMiddleware,
	Cors
];
