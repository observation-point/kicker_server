import { createParamDecorator } from "routing-controllers";

export function CheckToken() {
	return createParamDecorator({
		value: (action) => {
			const token = "Bearer e9ec11d6-941b-4ce5-8eea-8061a79b4bf8";
			if (action.request.headers.authorization !== token) {
				throw new Error('invalid token');
			}

			return true;
		}
	});
}
