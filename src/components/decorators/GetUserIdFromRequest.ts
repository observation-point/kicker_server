import { createParamDecorator } from "routing-controllers";

export function GetUserIdFromRequest() {
	return createParamDecorator({
		value: (action) => {
			let userId = action.request.session.user && action.request.session.user.id;
			console.log("USER FROM REQ", userId);
			console.log("ENV ",  process.env.KICKER_ENV);
			if (!userId && process.env.KICKER_ENV === "dev") {
				userId = {
					id: "c742d833-b601-4f84-aaac-c391f2051fbd",
					firstName: "test1",
					lastName: "test1",
					avatar: null
				};
			}
			return userId;
		}
	});
}
