import axios from "axios";
import { Service } from "typedi";
import { Config, ConfigType, ServicesConfig } from "../../components/config";

const serviceConfig = Config.getInstance().getConfig(
  ConfigType.Services
) as ServicesConfig;

@Service()
export class ReplayService {
  public async startRecordingGame(gameId: string): Promise<void> {
		try {
			await axios.post(serviceConfig.replay + "/stream", { gameId });
		} catch (error) {
			console.error("Start stream error");
		}
  }

  public async stopRecordingGame(): Promise<void> {
		try {
			await axios.delete(serviceConfig.replay + "/stream");
		} catch (error) {
			console.error("Stop recording error");
		}
  }

  public async recordGoal(gameId: string, goalId: string): Promise<void> {
		try {
			await axios.post(serviceConfig.replay + "/replay", { gameId, goalId });
		} catch (error) {
			console.error("Record goal error");
		}
  }
}
