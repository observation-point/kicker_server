import { EventEmitter } from "events";
import Container from "typedi";
import { GameHandlers } from "../../infrastructure/handlers/GameHandlers";

export const emitter = new EventEmitter();

export enum EventType {
	StartGame = "start_game",
}

const gameHandlers = Container.get(GameHandlers);

emitter.on(EventType.StartGame, gameHandlers.startGame.bind(gameHandlers));
