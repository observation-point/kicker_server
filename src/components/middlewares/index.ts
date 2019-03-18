import { Cors } from "./Cors";
import { Session } from "./Session";
import { Static } from "./Static";

export const middlewares = [
	Session,
	Cors,
	Static
];
