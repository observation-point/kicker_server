import { Session } from "./Session";
import { Cors } from "./Cors";
import { Static } from "./Static";

export const middlewares = [
	Session,
	Cors,
	Static
];
