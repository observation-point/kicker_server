import { ConnectedSocket, OnConnect, OnDisconnect, SocketController } from "socket-controllers";
import { Inject } from "typedi";
import { Game } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { SocketService } from "../../infrastructure/services/SocketService";

@SocketController()
export class MessageController {

	@Inject()
	private gameRepository: GameRepository;

	@Inject()
	private socketService: SocketService;

	@OnConnect()
	public async connection(@ConnectedSocket() socket: any) {
		console.log("client connected");

		this.socketService.addSocket(socket);
		const game = Game.getInstance();

		this.socketService.emit("updated_game", game.getState());
	}

	@OnDisconnect()
	public disconnect(@ConnectedSocket() socket: any) {
		console.log("client disconnected");
	}

}
