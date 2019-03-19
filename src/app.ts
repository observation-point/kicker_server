import "reflect-metadata";

import * as cors from "cors";
import * as express from "express";
import { NextFunction, Response } from "express";
import * as morgan from "morgan";
import * as path from "path";
import { createExpressServer } from "routing-controllers";
import { createConnection } from "typeorm";

import { middlewares } from "./components/middlewares";
import { dbConfig } from "./config/db";
import * as bodyParser from "body-parser";

const PUBLIC_PATH = path.join(__dirname, "../public");

const app = createExpressServer({
	controllers: [__dirname + "/controllers/*.js"],
	middlewares
});

app.use(morgan("dev"));

app.use(express.static(PUBLIC_PATH));

app.use(bodyParser.json())

async function startServer() {
	const connection = await createConnection(dbConfig);

	app.listen(3000, () => {
		console.log("\nServer started\n");

		connection.isConnected ?
			console.log("DB is connected\n") :
			console.log("DB isn't connected\n");
	});
}

startServer();
