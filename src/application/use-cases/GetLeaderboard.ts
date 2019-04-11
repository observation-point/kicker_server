import { Inject, Service } from "typedi";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { Role } from "../../infrastructure/types";
import { LeaderboardQuery, LeaderboardResponse, UserStats } from "../types";

@Service()
export class GetLeaderboard {
	@Inject()
	private gameRepository: GameRepository;
	@Inject()
	private userRepository: UserRepository;

	public async execute(query: LeaderboardQuery = {}): Promise<LeaderboardResponse> {
		const usersStats: UserStats[] = [];

		const users = await this.userRepository.getUsers(query);

		for (const user of users) {
			const userId = user.id;
			const [gamesCount, winsInAttack, winsInDefense] = await Promise.all([
				this.gameRepository.getGameCount(userId),
				this.gameRepository.getWinCount(userId, Role.Attack),
				this.gameRepository.getWinCount(userId, Role.Defense)
			]);

			usersStats.push({
				avatar: user.avatar,
				fullname: user.fullname,
				rating: user.rating,
				gamesCount,
				winsInAttack,
				winsInDefense
			});
		}
		return { usersStats };
	}
}
