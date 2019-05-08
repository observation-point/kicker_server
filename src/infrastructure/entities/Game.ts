import { v4, v4 as uuid } from "uuid";
import { emitter, EventType } from "../../components/events";
import { ForbiddenError } from "../../components/http-error";
import { GameState, GameStatus, Team } from "../types";
import { Goal } from "./Goal";
import { Player } from "./Player";

export class Game {

	public static getInstance() {
		if (!this.instance) {
			this.instance = new Game();
			this.instance.players = [];
			this.instance.goals = [];
		}

		return this.instance;
	}

	public static newInstance() {
		this.instance = new Game();
		this.instance.players = [];
		this.instance.goals = [];
	}

	protected static instance: Game;

	public id: string;
	public startGame: Date;
	public endGame: Date;
	public status: GameStatus;
	public winner: Team;

	public players: Player[];
	public goals: Goal[];

	public constructor() {
		this.id = uuid();

		this.status = GameStatus.READY;
	}

	public getState(): GameState {
		return {
			id: this.id,
			players: this.players ? this.players.map((item) => {
				return {
					role: item.role,
					team: item.team,
					user: item.user.serialize(),
					winRate: item.winRate
				};
			}) : [],
			goals: this.goals ? this.goals.map((item) => {
				return {
					team: item.team,
					time: item.time
				};
			}) : [],
			status: this.status,
			startGame: this.startGame,
			endGame: this.endGame
		};
	}

	public addPlayer(player: Player) {
		if (this.players.find((item) => item.role === player.role && item.team === player.team)) {
			throw new ForbiddenError("this place is already taken");
		}

		this.players.push(player);
	}

	public addGoals(goals: Goal[]) {
		this.goals.push(...goals);
	}

	public getScheme() {
		return {
			id: this.id,
			startGame: this.startGame,
			endGame: this.endGame,
			status: this.status,
			winner: this.winner
		};

	}

	public reset() {
		this.id = uuid();
		this.status = GameStatus.READY;
		this.players = [];
		this.goals = [];
		this.startGame = undefined;
		this.endGame = undefined;
		this.winner = undefined;
	}

	public playAgain() {
		this.id = uuid();
		this.status = GameStatus.INPROCESS;
		this.goals = [];
		this.startGame = new Date();
		this.endGame = undefined;
		this.winner = undefined;
	}
}
