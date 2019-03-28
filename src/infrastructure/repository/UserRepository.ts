import { plainToClass } from "class-transformer";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { User } from "../entities";
import { UserModel } from "../models";

@Service()
export class UserRepository {
	public async getUser(id: string): Promise<User> {
		return new User(await getRepository(UserModel).findOne(id));
	}

	public async getUserByLogin(login: string): Promise<User> {
		return new User(await getRepository(UserModel).findOne({ where: { login } }));
	}

	public async save(user: User): Promise<User> {
		return new User(await getRepository(UserModel).save(plainToClass(UserModel, user)));
	}

}
