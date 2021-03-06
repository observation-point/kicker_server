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

	public async execute({ limit, offset }: LeaderboardQuery = {}): Promise<LeaderboardResponse> {
		const usersStats: UserStats[] = [];

		const users = await this.userRepository.getUsers({ limit, offset });

		for (const user of users) {
			const userId = user.id;
			const [gamesCount, winrateAttack, winrateDefense, winCountAttack, winCountDefense] = await Promise.all([
				this.gameRepository.getGameCount(userId),
				this.gameRepository.getWinrate(userId, Role.Attack),
				this.gameRepository.getWinrate(userId, Role.Defense),
				this.gameRepository.getWinCount(userId, Role.Attack),
				this.gameRepository.getWinCount(userId, Role.Defense)

			]);

			usersStats.push({
				userId: user.id,
				avatar: user.avatar,
				fullname: user.fullname,
				rating: user.rating,
				gamesCount,
				winrateAttack,
				winrateDefense,
				winGamesCount: winCountAttack + winCountDefense
			});
		}
		return { usersStats };
	}
}
