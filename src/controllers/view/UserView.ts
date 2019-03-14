import { User } from "src/domain/User/User";
import { UserResponse } from "../types";

export class UserView {
    public static makeResponse(user: User): UserResponse {
        const { password, ...param } = user;

        return {
            user: {
                ...param
            }

        }
    }

    
}
