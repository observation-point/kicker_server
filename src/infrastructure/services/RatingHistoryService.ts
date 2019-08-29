import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { v4 } from "uuid";

import { RatingModel } from "../models/RatingModel";

interface User {
	id: string;
	rating: number;
}

@Service()
class RatingHistoryService {
  private get repository(): Repository<RatingModel> {
		return getRepository(RatingModel);
	}

	public async recordCurrentRating(user: User, game: { id: string; }): Promise<RatingModel> {
		const record = new RatingModel();
		record.id = v4();
		record.gameId = game.id;
		record.userId = user.id;
		record.value = user.rating;
		await this.repository.save(record);
		return record;
	}

	public async getHistory(user: User, game: { id: string }): Promise<RatingModel[]> {
		return await this.repository.find({ where: { userId: user.id, gameId: game.id } });
	}

}

export { RatingHistoryService };
