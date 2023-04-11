import express from "express";
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
	AuthenticationDetails,
} from "amazon-cognito-identity-js";
import AWS from "aws-sdk/global.js";

const { CognitoIdentityCredentials: CIC } = AWS;

import { verifyJSONBody } from "../middleware.js";

const router = express.Router();

router.get("/", (req, res, next) => {
	res.send("auth module online");
});

router.post(
	"/login",
	verifyJSONBody(["username", "password"]),
	(req, res, next) => {
		const { username, password } = req.body;

		var authenticationData = {
			Username: username,
			Password: password,
		};

		var authenticationDetails = new AuthenticationDetails(authenticationData);

		var poolData = {
			UserPoolId: `${process.env.COGNITO_USER_POOL_ID}`, // Your user pool id here
			ClientId: `${process.env.COGNITO_CLIENT_ID}`, // Your client id here
		};

		var userPool = new CognitoUserPool(poolData);

		var userData = {
			Username: username,
			Pool: userPool,
		};

		var cognitoUser = new CognitoUser(userData);

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: function (result) {
				var accessToken = result.getAccessToken().getJwtToken();

				res.header(200);
				res.send({
					status: 200,
					message: "success",
					username: username,
				});

				//POTENTIAL: Region needs to be set if not already set previously elsewhere.

				// let userPoolURL = `cognito-idp.us-east-1.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`

				// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				//     IdentityPoolId: `${process.env.COGNITO_IDENTITY_POOL_ID}`, // your identity pool id here
				//     Logins: {
				//         userPoolURL: result
				//             .getIdToken()
				//             .getJwtToken(),
				//     },
				// });

				// //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
				// AWS.config.credentials.refresh(error => {
				//     if (error) {
				//         console.error(error);
				//     } else {
				//         // Instantiate aws sdk service objects now that the credentials have been updated.
				//         // example: var s3 = new AWS.S3();
				//         console.log('Successfully logged!');
				//         res.send("all good!!!")
				//     }
				// });
			},

			onFailure: function (err) {
				console.log(err);
				res.status(403);
				res.send(err);
			},
		});
	}
);

router.post(
	"/confirm",
	verifyJSONBody(["username", "code"]),
	(req, res, next) => {
		const { username, code } = req.body;

		// i wanna refactor this variable outside of this
		var poolData = {
			UserPoolId: `${process.env.COGNITO_USER_POOL_ID}`, // Your user pool id here
			ClientId: `${process.env.COGNITO_CLIENT_ID}`, // Your client id here
		};

		var userPool = new CognitoUserPool(poolData);

		var userData = {
			Username: username,
			Pool: userPool,
		};

		var cognitoUser = new CognitoUser(userData);

		cognitoUser.confirmRegistration(code, true, function (err, result) {
			if (err) {
				res.status(401);
				return res.send({
					error: err.message ? err.message : "see server logs",
				});
			} else {
				res.status(202);
				return res.send({ status: "confirmed" });
			}

			// dispatch(successConfirm())
			// navigate("/auth_test")
		});
	}
);

router.post("/resend", verifyJSONBody(["username"]), (req, res, next) => {
	const { username } = req.body;
});

router.post(
	"/signup",
	verifyJSONBody(["username", "password", "email"]),
	(req, res, next) => {
		const { username, password, email } = req.body;

		var poolData = {
			UserPoolId: `${process.env.COGNITO_USER_POOL_ID}`, // Your user pool id here
			ClientId: `${process.env.COGNITO_CLIENT_ID}`, // Your client id here
		};

		console.log(poolData);

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

		userPool.signUp(username, password, attributeList, null, (err, result) => {
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
		});
	}
);

export { router as authModule };
