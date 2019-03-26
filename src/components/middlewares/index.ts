import { Cors } from "./Cors";
import { Session } from "./Session";

export const middlewares = [
	Session,
	Cors
];
