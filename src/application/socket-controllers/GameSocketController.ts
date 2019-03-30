import { SocketController, ConnectedSocket, OnConnect, OnDisconnect, OnMessage, MessageBody } from "socket-controllers";
import { Game } from "../../infrastructure/entities";
import { Inject } from "typedi";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { SocketService } from "../../infrastructure/services/SocketService";


@SocketController()
export class MessageController {

    @Inject()
    private gameRepository: GameRepository;
    
    @Inject()
    private socketService: SocketService

    @OnConnect()
    async connection(@ConnectedSocket() socket: any) {
        console.log("client connected");

        this.socketService.addSocket(socket);
        const game = Game.getInstance();
        await this.gameRepository.save(game);
        this.socketService.emit("updated_game", game.getState());
    }

    @OnDisconnect()
    disconnect(@ConnectedSocket() socket: any) {
        console.log("client disconnected");
    }


}
