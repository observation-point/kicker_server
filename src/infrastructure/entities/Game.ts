import { v4 as uuid } from "uuid";
import { emitter, EventType } from "../../components/events";
import { Goal } from "./Goal";
import { Player } from "./Player";
import { GameState, GameStatus, Side } from "../types";

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
					side: item.side,
					user: item.user.serialize()
				};
			}) : [],
			goals: this.goals ? this.goals.map((item) => {
				return {
					side: item.side,
					time: item.time
				};
			}) : [],
			status: this.status
		};
	}

	public addPlayer(player: Player) {
		if (this.players.find((item) => item.role === player.role && item.side === player.side)) {
			throw new Error("this place is already taken");
		}

		this.players.push(player);
		if (this.players.length === 4) {
			this.status = GameStatus.INPROCESS;
			this.startGame = new Date();
			emitter.emit(EventType.StartGame, this.id);
		}
	}

	public addGoal(goal: Goal) {
		this.goals.push(goal);
	}

	public getScheme() {
		return {
			id: this.id,
			startGame: this.startGame,
			endGame: this.endGame,
			status: this.status
		};

	}
}
