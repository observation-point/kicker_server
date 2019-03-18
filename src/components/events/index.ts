import { EventEmitter } from "events"
import { gameHandlers } from "src/infrastructure/handlers/GameHandlers";

export const emitter = new EventEmitter();

export enum EventType {
    StartGame = "start_game",

}

emitter.on(EventType.StartGame, gameHandlers.startGame.bind(gameHandlers));
