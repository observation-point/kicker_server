import { Inject, Service } from "typedi";
import { Game, Goal } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { GameStatus, Role, Side } from "../../infrastructure/types";
import { GameStats, Goal as GoalData } from "../types";

export interface AddPlayerParams { role: Role; side: Side; userId: string; }

@Service()
export class AddGoal {
	@Inject()
	private gameRepository: GameRepository;

	public async execute({ id, goals, status }: GameStats): Promise<void> {
		const game = Game.getInstance();

		this.checkGameId(id, game);
		this.checkGameStatus(game);

		const newGoals = this.getNewGoals(goals, game);
		await this.saveNewGoals(newGoals);

		game.addGoals(newGoals);

		if (status === GameStatus.FINISHED) {
			await this.complete(game);
			await this.createNewGame(game);
		}
	}

	protected checkGameId(id: string, game: Game) {
		if (id !== game.id) {
			throw new Error("invalid game");
		}
	}

	protected checkGameStatus(game: Game) {
		if (game.status !== GameStatus.INPROCESS) {
			throw new Error("update count is possible only with process game status");
		}
	}

	protected getNewGoals(goals: GoalData[], game: Game): Goal[] {
		const newGoalsData = goals.filter((item) => {
			return !game.goals.find((g) => g.side === item.team && g.time === item.time);
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
		await this.gameRepository.save(game);
	}

	protected async createNewGame(game: Game): Promise<void> {
		game.reset();
		await this.gameRepository.save(game);
	}
}