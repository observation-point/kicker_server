import { createParamDecorator } from "routing-controllers";

export function CheckToken() {
	return createParamDecorator({
		value: (action) => {
			console.log(action.request);
			return 0;
		}
	});
}
