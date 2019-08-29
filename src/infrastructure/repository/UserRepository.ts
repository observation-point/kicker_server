import { plainToClass } from "class-transformer";
import { Service } from "typedi";
import { FindConditions, getRepository, In } from "typeorm";
import { NotFoundError } from "../../components/http-error";
import { User } from "../entities";
import { UserModel } from "../models";
import { UserQueryParam } from "../types";

@Service()
export class UserRepository {
	public async getUser(id: string): Promise<User> {
		const userModel = await getRepository(UserModel).findOne(id);
		if (!userModel) {
			throw new NotFoundError("user with id " + id + " not found");
		}
		return new User(userModel);
	}

	public async getUsers({ limit, offset, ids }: UserQueryParam): Promise<User[]> {
		const usersData = await getRepository(UserModel).find({
			where: this.queryGenerator({ ids }),
			take: limit || 0,
			skip: offset || 0
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

	public async getUserByToken(token: string): Promise<User> {
		const model = await getRepository(UserModel).findOne({ where: { token } });
		if (!model) {
			throw new NotFoundError("user with token " + token + " not found");
		}
		return new User(model);
	}

	public async save(user: User): Promise<User> {
		const model = await getRepository(UserModel).save(plainToClass(UserModel, user.getScheme()));
		return new User(model);
	}

	public async update(user: User): Promise<User> {
		await getRepository(UserModel).createQueryBuilder()
			.update(UserModel)
			.set({ token: user.token})
			.where("id = :id", { id: user.id })
			.execute();

		const model = await getRepository(UserModel).findOne({ where: { id: user.id } });
		return new User(model);
	}

	protected queryGenerator(query: { ids: string[] }): FindConditions<UserModel> {
		const { ids } = query;
		const queryCondition: FindConditions<UserModel> = {};
		if (ids) {
			queryCondition.id = In(ids);
		}

		return queryCondition;
	}
}
