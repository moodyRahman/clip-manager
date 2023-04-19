import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

import Sequelize from "sequelize";
import configJson from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const config = configJson[env];
const basename = path.basename(__filename);
const db = {};

config.logging = true;

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,
		port: config.port,
		dialect: config.dialect,
		logging: console.log,
		dialectOptions: {
			ssl: {
				ca: fs.readFileSync("global-bundle.pem"),
			},
		},
		language: "en",
	}
);

fs.readdirSync(__dirname)
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
