import { createParamDecorator } from 'routing-controllers';

export function GetSessionFromRequest() {
    return createParamDecorator({
        value: action => {
            return action.request.session;
        }
    });
}
