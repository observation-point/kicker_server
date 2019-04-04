import { Inject, Service } from "typedi";
import { Game, Goal, Player, User } from "../../infrastructure/entities";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { Side } from "../../infrastructure/types";

@Service()
export class CalculateRatings {
	@Inject()
	private userRepository: UserRepository;

	public async execute(game: Game): Promise<void> {
		const redGoalsCount = game.goals.filter((goal: Goal) => goal.side === Side.RED).length;
		const blackGoalsCount = game.goals.filter((goal: Goal) => goal.side === Side.BLACK).length;
		let teamWinner: Side;
		let teamLosser: Side;
		if (redGoalsCount > blackGoalsCount) {
			teamWinner = Side.RED;
			teamLosser = Side.BLACK;
		} else {
			teamWinner = Side.BLACK;
			teamLosser = Side.RED;
		}
		const playersWinners = game.players.filter((player) => player.side === teamWinner);
		const playersLossers = game.players.filter((player) => player.side === teamLosser);

		const usersWinners = await this.getUsersByPlayerList(playersWinners);
		const usersLosssers = await this.getUsersByPlayerList(playersLossers);

		const ratingsOfWinners = usersWinners.map((user) => user.rating); // [2000, 1800]
		const ratingsOfLossers = usersLosssers.map((user) => user.rating); // [1400, 1600]

		const avgRatingWinners = this.calculateAvgTeamRating(ratingsOfWinners); // 1900
		const avgRatingLossers = this.calculateAvgTeamRating(ratingsOfLossers); // 1500

		const ratingDelta = this.getRatingDelta(avgRatingWinners, avgRatingLossers); // 3
		usersWinners.forEach((user) => user.changeRating(user.rating + ratingDelta)); // [2003, 1803]
		usersLosssers.forEach((user) => user.changeRating(user.rating - ratingDelta)); // [1397, 1597]
		[...usersWinners, ...usersLosssers].forEach(async (user) => await this.userRepository.save(user));
	}

	private async getUsersByPlayerList(playerList: Player[]): Promise<User[]> {
		return await Promise.all(playerList.map(
			async (player) => await this.userRepository.getUser(player.user.id)
		));
	}

	private calculateAvgTeamRating(ratings: number[]): number {
		return Math.round(ratings.reduce(( prev, current ) => prev + current, 0 ) / ratings.length);
	}

	private getRatingDelta(firstRating: number, secondRating: number): number {
		const chanceToWin = 1 / ( 1 + Math.pow(10, (firstRating - secondRating) / 400));
		return Math.round(32 * chanceToWin);
  }
}
