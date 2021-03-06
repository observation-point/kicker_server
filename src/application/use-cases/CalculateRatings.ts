import { Inject, Service } from "typedi";
import { Game, Player, User } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { RatingHistoryService } from "../../infrastructure/services/RatingHistoryService";
import { Role, Team } from "../../infrastructure/types";

@Service()
export class CalculateRatings {
	@Inject()
	private gameRespository: GameRepository;
	@Inject()
	private userRepository: UserRepository;
	@Inject()
	private ratingHistoryService: RatingHistoryService;

	public async execute(game: Game): Promise<void> {
		let teamWinner: Team;
		let teamLosser: Team;
		if (game.winner === Team.RED) {
			teamWinner = Team.RED;
			teamLosser = Team.BLACK;
		} else {
			teamWinner = Team.BLACK;
			teamLosser = Team.RED;
		}
		const playersWinners = game.players.filter((player) => player.team === teamWinner);
		const playersLossers = game.players.filter((player) => player.team === teamLosser);

		const usersWinners = await this.getUsersByPlayerList(playersWinners);
		const usersLosssers = await this.getUsersByPlayerList(playersLossers);

		const ratingsOfWinners = usersWinners.map((user) => user.rating); // [2000, 1800]
		const ratingsOfLossers = usersLosssers.map((user) => user.rating); // [1400, 1600]

		const avgRatingWinners = this.calculateAvgTeamRating(ratingsOfWinners); // 1900
		const avgRatingLossers = this.calculateAvgTeamRating(ratingsOfLossers); // 1500

		const ratingDelta = this.calculateRatingDelta(avgRatingWinners, avgRatingLossers); // 3

		usersWinners.forEach(async (user, index) => {
			const newRating = user.rating + await this.adjustDelta(user.id, playersWinners[index].role, ratingDelta, true);
			await this.recordRatingChange(user, game, newRating);
		});

		usersLosssers.forEach(async (user, index) => {
			const newRating = user.rating - await this.adjustDelta(user.id, playersLossers[index].role, ratingDelta, false);
			await this.recordRatingChange(user, game, newRating);
		});
	}

	private async getUsersByPlayerList(playerList: Player[]): Promise<User[]> {
		return Promise.all(playerList.map((player) => this.userRepository.getUser(player.user.id)));
	}

	private calculateAvgTeamRating(ratings: number[]): number {
		return Math.round(ratings.reduce(( prev, current ) => prev + current, 0 ) / ratings.length);
	}

	private calculateRatingDelta(winnerRating: number, losserRating: number): number {
		const chanceToWin = 1 / ( 1 + Math.pow(10, (winnerRating - losserRating) / 400));
		return chanceToWin * 32;
	}

	private async adjustDelta(userId: string, role: Role, delta: number, isWinner: boolean): Promise<number> {
		const userAtackWinrate = await this.gameRespository.getWinrate(userId, Role.Attack);
		const userDefenceWinrate = await this.gameRespository.getWinrate(userId, Role.Defense);
		let adjustedDelta: number;
		if (role === Role.Attack) {
			adjustedDelta = Math.round(
				delta * (isWinner ? userDefenceWinrate / userAtackWinrate : userAtackWinrate / userDefenceWinrate)
			);
		} else {
			adjustedDelta = Math.round(
				delta * (isWinner ? userAtackWinrate / userDefenceWinrate : userDefenceWinrate / userAtackWinrate)
			);
		}
		return adjustedDelta;
	}

	private async recordRatingChange(user: User, game: Game, ratingNewValue: number) {
		await this.ratingHistoryService.recordCurrentRating(user, game);
		user.changeRating(ratingNewValue);
		await this.userRepository.save(user);
	}

}
