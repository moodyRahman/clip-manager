import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import dotenv from "./config/dotenv.js";
import db from "./models/index.js";
import { authModule, resourceModule } from "./routes/index.js";

const app = express();
const PORT = 8087;

app.use(bodyParser.json());
app.use(cors());

morgan.token("keys", function (req, res) {
	if (req.method === "POST") {
		return Object.keys(req.body);
	}
	return "";
});

app.use(morgan(":method :url | recieved data: [:keys] | :status"));

app.get("/", (req, res) => {
	res.send("hello");
});

app.use("/auth", authModule);
app.use("/resources", resourceModule);

app.use((err, req, res, next) => {
	console.log(err);
	// these fields are only ever defined if it's an error we're intentionally throwing
	// an error from a geniune server error would automatically give the user a 500 error
	const { status, message } = err;

	res.status(status ? status : 500);
	return res.send({
		status: status ? status : 500,
		message: message ? message : "internal server error, see logs",
	});
});

// update DB tables based on model updates. Does not handle renaming tables/columns
// NOTE: toggling this to true drops all tables (including data)
// ❗❗❗❗❗⚠️⚠️⚠️⚠️⚠️⚠️
db.sequelize.sync({ force: false });
// ❗❗❗❗❗⚠️⚠️⚠️⚠️⚠️⚠️

app.listen(PORT, () => {
	console.log(`backend online at http://localhost:${PORT}`);
});
