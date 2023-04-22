import express from "express";
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from "amazon-cognito-identity-js";
import AWS from "aws-sdk/global.js";

import passport from "../middlewares/authentication.js";
import { verifyJSONBody } from "../middlewares/middleware.js";

const { CognitoIdentityCredentials: CIC } = AWS;
const app = express();
const router = express.Router();

const poolData = {
	UserPoolId: `${process.env.COGNITO_USER_POOL_ID}`, // Your user pool id here
	ClientId: `${process.env.COGNITO_CLIENT_ID}`, // Your client id here
};

router.get("/", (req, res, next) => {
	res.send("auth module online");
});

router.post(
	"/login",
	verifyJSONBody(["username", "password"]),
	passport.authenticate("local"),
	(req, res) => {
		// If this function gets called, authentication was successful.
		// `req.user` contains the authenticated user.
		res.json({ message: "Successfully Login" });
	}
);

router.get("/login", (req, res) => {
	if (req.user) {
		res.json(req.user);
	} else {
		res.sendStatus(401);
	}
});

router.get("/protected-route", passport.isAuthenticated(), function (req, res) {
	// This is your protected route
	// You can access the authenticated user's data through req.user
	res.json({
		message: "You are authorized to access this route!",
		user: req.user,
	});
});

router.post("/logout", (req, res, next) => {

	req.logout((err) => {
		if (err) return next(err);
		res.status(200).json({ message: "Logout successful" });
	});
});

router.post(
	"/confirm",
	verifyJSONBody(["username", "code"]),
	(req, res, next) => {
		const { username, code } = req.body;

		var userPool = new CognitoUserPool(poolData);

		var userData = {
			Username: username,
			Pool: userPool,
		};

		var cognitoUser = new CognitoUser(userData);

		cognitoUser.confirmRegistration(code, true, async function (err, result) {
			if (err) {
				res.status(401);
				return res.send({
					error: err.message ? err.message : "see server logs",
				});
			} else {
				cognitoUser.authenticateUser(authenticationDetails, {
					onSuccess: function (result) {
						cognitoUser.getUserAttributes(function (err, attributes) {
							if (err) {
								res.status(401);
								return res.send({
									error: err.message ? err.message : "see server logs",
								});
							} else {
								var cognitoId = attributes
									.find((attr) => attr.getName() === "sub")
									.getValue();
								res.status(202);
								return res.send({
									status: "confirmed",
									cognitoId: cognitoId,
								});
							}
						});
					},
					onFailure: function (err) {
						console.log(err);
						res.status(403);
						res.send(err);
					},
				});
			}
		});
	}
);

router.post("/resend", verifyJSONBody(["username"]), (req, res, next) => {
	const { username } = req.body;
});

router.post(
	"/signup",
	verifyJSONBody(["username", "password", "email"]),
	async (req, res, next) => {
		const { username, password, email } = req.body;

		var userPool = new CognitoUserPool(poolData);
		var attributeList = [];

		var dataEmail = {
			Name: "email",
			Value: email,
		};

		var dataUsername = {
			Name: "preferred_username",
			Value: username,
		};

		var attributeEmail = new CognitoUserAttribute(dataEmail);
		var attributeUsername = new CognitoUserAttribute(dataUsername);

		// this feels kinda weird but it's what the docs do
		attributeList.push(attributeEmail);
		attributeList.push(attributeUsername);

		userPool.signUp(
			username,
			password,
			attributeList,
			null,
			async (err, result) => {
				if (err) {
					console.log(err);
					return res.send({
						error: err.message ? err.message : "see server logs",
					});
				} else {
					var cognitoUser = result.user;
					res.status(201);
					return res.send({ username: cognitoUser.getUsername() });
				}
			}
		);
	}
);

export { router as authModule };
