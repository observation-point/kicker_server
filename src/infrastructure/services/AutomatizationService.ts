import axios from "axios";
import { Service } from "typedi";
import { Config, ConfigType, ServicesConfig } from "../../components/config";

const serviceConfig = Config.getInstance().getConfig(ConfigType.Services) as ServicesConfig;

@Service()
export class AutomatizationService {
	public async startGame(id: string): Promise<void> {
		await axios.post(serviceConfig.observer + "/start", { gameId: id, gameRules: { goalsToWin: 10 } });
	}

	public async stopGame(id: string): Promise<void> {
		await axios.post(serviceConfig.observer + "/stop", { gameId: id });
	}
}
