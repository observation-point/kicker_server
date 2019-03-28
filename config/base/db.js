const path = require('path');

module.exports = {
    type: "postgres",
    host: "127.0.0.1",
    database: process.env.KC_DB_NAME || "kicker",
    username: process.env.KC_DB_USERNAME || "kickerman",
    password: process.env.KC_DB_PASSWORD || "123qwe",
    entities: [
		"dist/infrastructure/models/*.js"
	],
    migrations: [
        "dist/infrastructure/migrations/*.js"
    ],
    logging: ["error"]
};
