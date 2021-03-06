import { ConnectedSocket, OnConnect, OnDisconnect, SocketController } from "socket-controllers";
import { Inject } from "typedi";
import { Game } from "../../infrastructure/entities";
import { SocketService } from "../../infrastructure/services/SocketService";

@SocketController()
export class MessageController {

	@Inject()
	private socketService: SocketService;

	@OnConnect()
	public async connection(@ConnectedSocket() socket: any) {

		this.socketService.addSocket(socket);
		const game = Game.getInstance();

		socket.emit("updated_game", game.getState());
	}

	@OnDisconnect()
	public disconnect(@ConnectedSocket() socket: any) {
		this.socketService.deleteSocket(socket);
	}

}
