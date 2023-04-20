import Sequelize from "sequelize";
import configJson from "../config/config.js";
import clipModel from "./Clip.js";
import userModel from "./User.js";

const env = process.env.NODE_ENV || "development";
const config = configJson[env];
const db = {};

config.logging = false;

let sequelize;

sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

const models = {
	Clip: clipModel(sequelize, Sequelize.DataTypes),
	User: userModel(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((modelName) => {
	db[modelName] = models[modelName];
});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

(async () => {
    try {
      await sequelize.authenticate(); // authenticate the connection to the database
      const tableNames = Object.keys(sequelize.models); // get all the table names
      console.log(tableNames); // print the table names

      // Drop the Clip and User tables
      await sequelize.drop({ cascade: true });
      console.log('Clip and User tables dropped');
      
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

export default db;
