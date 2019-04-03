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

	public async getAllUsers(): Promise<User[]> {
		const usersData = await getRepository(UserModel).find();
		return usersData.map((user: UserModel) => new User(user));
	}

	public async getUserByLogin(login: string): Promise<User> {
		const model = await getRepository(UserModel).findOne({ where: { login } });
		return new User(model);
	}

	public async save(user: User): Promise<User> {
		const model = await getRepository(UserModel).save(plainToClass(UserModel, user.getScheme()));
		return new User(model);
	}
}
