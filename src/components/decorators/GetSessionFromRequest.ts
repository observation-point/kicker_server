import { createParamDecorator } from "routing-controllers";

export function GetSessionFromRequest() {
	return createParamDecorator({
		value: (action) => {
			let session;
			if (!action.request.session.user) {
				session = {
					user: {
						id: "c742d833-b601-4f84-aaac-c391f2051fbd",
						firstName: "test1",
						lastName: "test1",
						avatar: null
					}
				};
			} else {
				session = action.request.session;
			}
			return session;
		}
	});
}
