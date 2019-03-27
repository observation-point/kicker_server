import axios from "axios";
import { Config, ConfigType, ServicesConfig } from "../../components/config";

const serviceConfig = Config.getInstance().getConfig(ConfigType.Services) as ServicesConfig;

class AutomatizationService {
	public async startGame(id: string): Promise<void> {
		await axios.post(serviceConfig.observer + "/start", { gameId: id, gameRules: { goalsToWin: 10 } });
	}
}

export const automatizationService = new AutomatizationService();
