import { plainToClass } from "class-transformer";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { LeaderboardQuery } from "../../application/types";
import { NotFoundError } from "../../components/http-error";
import { User } from "../entities";
import { UserModel } from "../models";

@Service()
export class UserRepository {
	public async getUser(id: string): Promise<User> {
		const userModel = await getRepository(UserModel).findOne(id);
		if (!userModel) {
			throw new NotFoundError("user with id " + id + " not found");
		}
		return new User(userModel);
	}

	public async getUsers({ limit = 0, offset = 0 }: LeaderboardQuery): Promise<User[]> {
		const usersData = await getRepository(UserModel).find({
			take: limit,
			skip: offset
		});
		return usersData.map((user: UserModel) => new User(user));
	}

	public async getUserByLogin(login: string): Promise<User> {
		const model = await getRepository(UserModel).findOne({ where: { login } });
		if (!model) {
			throw new NotFoundError("user with login " + login + " not found");
		}
		return new User(model);
	}

	public async save(user: User): Promise<User> {
		const model = await getRepository(UserModel).save(plainToClass(UserModel, user.getScheme()));
		return new User(model);
	}
}
