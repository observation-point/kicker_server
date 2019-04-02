import "reflect-metadata";

import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import { createExpressServer, useContainer } from "routing-controllers";
import { createSocketServer, useContainer as useContainerSocket } from "socket-controllers";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { Config, ConfigType, CorsConfig, ServerConfig } from "./components/config";
import { middlewares } from "./components/middlewares";

import "./components/di";

const configBuilder = Config.getInstance();
const dbConfig = configBuilder.getConfig(ConfigType.Db) as PostgresConnectionOptions;
const serverConfig = configBuilder.getConfig(ConfigType.Server) as ServerConfig;
const corsConfig = configBuilder.getConfig(ConfigType.Cors) as CorsConfig;

useContainer(Container);
useContainerSocket(Container);
const app = createExpressServer({
	cors: corsConfig,
	controllers: [__dirname + "/application/controllers/*.js"],
	middlewares
});

createSocketServer(8889, {
	controllers: [__dirname + "/application/socket-controllers/*.js"]
});

app.use(morgan("dev"));
app.use(bodyParser.json());

async function startServer() {
	const connection = await createConnection(dbConfig);

	app.listen(serverConfig, () => {
		console.info(`\nServer started at http://${serverConfig.host}:${serverConfig.port}`);

		connection.isConnected ?
			console.info("DB is connected\n") :
			console.info("DB isn't connected\n");
	});

}

startServer();
