import passport from "passport";
import Strategy from "passport-local";

import db from "../models/index.js";
import User from "../models/User.js";
import {
	CognitoUserPool,
	CognitoUser,
	AuthenticationDetails,
} from "amazon-cognito-identity-js";
import jwt from 'jsonwebtoken';

const LocalStrategy = Strategy.Strategy;
const poolData = {
	UserPoolId: `${process.env.COGNITO_USER_POOL_ID}`, // Your user pool id here
	ClientId: `${process.env.COGNITO_CLIENT_ID}`, // Your client id here
};

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
		},
		(username, password, done) => {
			var authenticationData = {
				Username: username,
				Password: password,
			};

			var authenticationDetails = new AuthenticationDetails(authenticationData);

			var userPool = new CognitoUserPool(poolData);

			var userData = {
				Username: username,
				Pool: userPool,
			};

			var cognitoUser = new CognitoUser(userData);

			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess: function (result) {
					var idToken = result.getIdToken().getJwtToken();

					var cognitoUser = jwt.decode(idToken);
                    let user = {username: cognitoUser.preferred_username, id: cognitoUser.sub};
					
                    // console.log(user)
					done(null, user);
				},

				onFailure: function (err) {
					// console.log(err);
					done(err, null);
				},
			});
		}
	)
);
passport.serializeUser((user, done) => {
	// console.log(user);
	done(null, user.id);
});

passport.deserializeUser((cognitoID, done) => {
	db.User.findOne({ where: { cognitoID } })
		.then((user) => {
			if (!user) {
				done(null, false);
				return;
			}

			done(null, user);
			return;
		})
		.catch((err) => done(err, null));
});

passport.isAuthenticated = () => (req, res, next) =>
	req.user ? next() : res.sendStatus(401);

export default passport;
