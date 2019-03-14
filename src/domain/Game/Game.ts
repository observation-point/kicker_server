import { Lobby } from "./Lobby";
import { GameState, Player } from "./types";

export class Game {

	public static getInstance() {
		if (!this.instance) {
			this.instance = new Game();
		}

		return this.instance;
	}
	protected static instance: Game;

	protected lobby: Lobby;
	protected isRunning: boolean;
	protected count: number[];

	protected startGame: Date;
	protected endGame: Date;

	protected constructor() {
		this.isRunning = false;
		this.lobby = new Lobby();
		this.count = [0, 0];
	}

	public addPlayer(player: Player) {
		if (this.isRunning) {
			return;
		}
		this.lobby.add(player);

		if (this.lobby.isFull()) {
			this.isRunning = true;
			this.startGame = new Date();
		}
	}

	public updateCount(count: number[]) {
		this.count = count;
		if (this.count[0] === 10 || this.count[1] === 10) {
			this.endGame = new Date();

			// emit action end game, save statistic to db

			this.reset();
		}
	}

	public getState(): GameState {
		return {
			players: this.lobby.getPlayersInfo(),
			count: this.count,
			isRunning: this.isRunning
		};
	}

	private reset() {
		this.isRunning = false;
		this.lobby.clear();
		this.count = [0, 0];

		this.startGame = null;
		this.endGame = null;
	}

}
