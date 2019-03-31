import { Service } from "typedi";

@Service()
export class SocketService {
	public sockets: any[] = [];

	public addSocket(socket: any) {
		this.sockets.push(socket);
	}

	public emit(type: string, data: any) {
		this.sockets.forEach((item) => item.emit(type, data));
	}
}
