import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { emitter, EventType } from "../../components/events";
import { Goal } from "./Goal";
import { Player } from "./Player";
import { GameState, GameStatus, Side } from "./types";

@Entity("game")
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

	@PrimaryColumn()
	public id: string;

	@Column("timestamptz")
	public startGame: Date;

	@Column("timestamptz")
	public endGame: Date;

	@Column("varchar")
	public status: GameStatus;

	@OneToMany((type) => Player, (player) => player.game)
	public players: Player[];

	@OneToMany((type) => Goal, (goal) => goal.game)
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
}
