import { createParamDecorator } from "routing-controllers";

export function GetUserIdFromRequest() {
	return createParamDecorator({
		value: (action) => {
			return action.request.session.user.id;
		}
	});
}
