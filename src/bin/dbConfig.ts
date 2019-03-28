
import { Config, ConfigType, DbConfig } from "../components/config";

const dbConfig = Config.getInstance().getConfig(ConfigType.Db) as DbConfig;
process.stdout.write(JSON.stringify(dbConfig));
