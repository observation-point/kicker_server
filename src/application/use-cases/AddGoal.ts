import { Inject, Service } from "typedi";
import { Game, Goal } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { ReplayService } from "../../infrastructure/services/ReplayService";
import { SocketService } from "../../infrastructure/services/SocketService";
import { GameStatus, Role, Team } from "../../infrastructure/types";
import { GameStats, Goal as GoalData } from "../types";

import { ForbiddenError } from "../../components/http-error";
import { CalculateRatings } from "./CalculateRatings";

export interface AddPlayerParams { role: Role; team: Team; userId: string; }

@Service()
export class AddGoal {
	@Inject()
	private gameRepository: GameRepository;

	@Inject()
	private socketService: SocketService;

	@Inject()
	private ratingCalculator: CalculateRatings;

	@Inject()
	private replayService: ReplayService;

	public async execute({ id, goals, status }: GameStats): Promise<void> {
		const game = Game.getInstance();
		await this.gameRepository.save(game);
		this.checkGameId(id, game);
		this.checkGameStatus(game);

		const newGoals = this.getNewGoals(goals, game);
		await this.saveNewGoals(newGoals);
		try {
			await this.replayService.recordGoal(newGoals[0].gameId, newGoals[0].id);
		} catch (error) {
			console.error(error);
		}

		game.addGoals(newGoals);

		if (status === GameStatus.FINISHED) {
			await this.complete(game);
			this.socketService.emit("updated_game", game.getState());
			this.socketService.emit("update_rating", "update_rating");
		}

		this.socketService.emit("updated_game", game.getState());
	}

	protected checkGameId(id: string, game: Game) {
		if (id !== game.id) {
			throw new ForbiddenError("invalid game");
		}
	}

	protected checkGameStatus(game: Game) {
		if (game.status !== GameStatus.INPROCESS) {
			throw new ForbiddenError("update count is possible only with process game status");
		}
	}

	protected getNewGoals(goals: GoalData[], game: Game): Goal[] {
		const newGoalsData = goals.filter((item) => {
			return !game.goals.find((g) => g.team === item.team && g.time === item.time);
		});

		return newGoalsData.map(({ team, time }) => {
			return new Goal(game.id, team, time);
		});
	}

	protected async saveNewGoals(goals: Goal[]): Promise<void> {
		await Promise.all(goals.map((item) => this.gameRepository.saveGoal(item)));
	}

	protected async complete(game: Game): Promise<void> {
		game.status = GameStatus.FINISHED;
		game.endGame = new Date();

		const redGoals = game.goals.filter((item) => item.team === Team.RED);
		const blackGoals = game.goals.filter((item) => item.team === Team.BLACK);

		game.winner = redGoals.length > blackGoals.length ? Team.RED : Team.BLACK;

		await this.ratingCalculator.execute(game);
		await this.gameRepository.save(game);
		try {
			await this.replayService.stopRecordingGame();
		} catch (err) {
			console.error(err);
		}
	}

}
