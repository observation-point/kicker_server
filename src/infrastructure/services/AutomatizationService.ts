import axios from "axios";
import { ServicesConfig, Config, ConfigType } from "../../components/config";

const serviceConfig = <ServicesConfig>Config.getInstance().getConfig(ConfigType.Services);

class AutomatizationService {
	public async startGame(id: string): Promise<void> {
		await axios.post(serviceConfig.observer + "/start", { gameId: id, gameRules: { goalsToWin: 10 } });
	}
}

export const automatizationService = new AutomatizationService();
