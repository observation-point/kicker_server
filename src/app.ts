import "reflect-metadata";

import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { createConnection } from "typeorm";

import * as bodyParser from "body-parser";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Config, ConfigType, CorsConfig, ServerConfig } from "./components/config";
import { middlewares } from "./components/middlewares";

import "./components/di";

const configBuilder = Config.getInstance();

const dbConfig = configBuilder.getConfig(ConfigType.Db) as PostgresConnectionOptions;
const serverConfig = configBuilder.getConfig(ConfigType.Server) as ServerConfig;
const corsConfig = configBuilder.getConfig(ConfigType.Cors) as CorsConfig;

const PUBLIC_PATH = path.join(__dirname, "../public");

useContainer(Container);
const app = createExpressServer({
	cors: corsConfig,
	controllers: [__dirname + "/application/controllers/*.js"],
	middlewares
});

app.use(morgan("dev"));

app.use(express.static(PUBLIC_PATH));

app.use(bodyParser.json());

async function startServer() {
	const connection = await createConnection(dbConfig);

	app.listen(serverConfig, () => {
		console.log(`\nServer started at http://${serverConfig.host}:${serverConfig.port}`);

		connection.isConnected ?
			console.log("DB is connected\n") :
			console.log("DB isn't connected\n");
	});
}

startServer();
