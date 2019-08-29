import { Inject, Service } from "typedi";
import { NotFoundError } from "../../components/http-error";

import { User } from "../../infrastructure/entities";
import { GameModel } from "../../infrastructure/models";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { RatingHistoryService } from "../../infrastructure/services/RatingHistoryService";

@Service()
export class GameResults {
  @Inject()
  private gameRepository: GameRepository;

  @Inject()
  private userRepository: UserRepository;

  @Inject()
  private ratingService: RatingHistoryService;

  public async execute(gameId: string): Promise<{ gameModel: GameModel, users: User[]}> {
	const gameModel = await this.gameRepository.getGameById(gameId);
	if (!gameModel) {
		throw new NotFoundError("game with id " + gameId + "not found");
	}
	const userIds = gameModel.players.map((item) => item.userId);
	const users = await this.userRepository.getUsers({ ids: userIds });
	await Promise.all(users.map((user: User) => this.getPrevRating(user, gameId)));
	return { gameModel, users };
  }
  private async getPrevRating(user: User, gameId: string): Promise<User> {
	const [prevRating] = await this.ratingService.getHistory(user, { id: gameId });
	user.setPrevRating(prevRating.value);
	return user;
  }
}
