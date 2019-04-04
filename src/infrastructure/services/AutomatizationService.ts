import axios from "axios";
import { Service } from "typedi";
import { Config, ConfigType, ServicesConfig } from "../../components/config";
import { HttpError } from "routing-controllers";

const serviceConfig = Config.getInstance().getConfig(ConfigType.Services) as ServicesConfig;

@Service()
export class AutomatizationService {
	public async startGame(id: string): Promise<void> {
		try {
			await axios.post(serviceConfig.observer + "/start", { gameId: id, gameRules: { goalsToWin: 10 } });
		} catch (error) {
			console.info(error.response.data.message);
			await this.stopGame(this.parseError(error));
			await axios.post(serviceConfig.observer + "/start", { gameId: id, gameRules: { goalsToWin: 10 } });
			console.info("new game with id: " + id + " is started");
		}
	}

	public async stopGame(id: string): Promise<void> {
		await axios.post(serviceConfig.observer + "/stop", { gameId: id });
	}

	private parseError(error: any): string {
		const message: string = error.response.data.message;

		return message.split(' ')[2];
	}
}
