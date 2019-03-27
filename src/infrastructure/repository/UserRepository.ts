import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { User } from "../entities";

class UserRepository {
	public async getUser(id: string): Promise<User> {
		return getRepository(User).findOne(id);
	}

	public async getUserByLogin(login: string): Promise<User> {
		return getRepository(User).findOne({ where: { login } });
	}

	public async save(user: User): Promise<User> {
		return getRepository(User).save(plainToClass(User, user));
	}

}

export const userRepository = new UserRepository();
