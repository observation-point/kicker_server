import { createParamDecorator } from "routing-controllers";

export function CheckToken() {
	return createParamDecorator({
		value: (action) => {

			return action;
		}
	});
}
