import { Service } from "typedi";

@Service()
export class SocketService {
    public socket: any;

    public setSocket(socket: any) {
        this.socket = socket;
    }

    public emit(type: string, data: any) {
        this.socket.emit(type, data);
    }
}
