export type UserResponse = {
    user: UserAttributes
}

export type UserAttributes = {
    login: string;
    firstName: string;
    lastName: string;
    avatar: string;
}
