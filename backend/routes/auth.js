import express from 'express'
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser
} from 'amazon-cognito-identity-js';
import { verifyJSONBody } from '../middleware.js';
const router = express.Router()

router.get("/", (req, res, next) => {
    res.send("auth module online")
})

router.post("/login", (req, res, next) => {
    res.send("backend endpoint for logins")
})


router.post("/signup", verifyJSONBody(["username", "password", "email"]), (req, res, next) => {

    const { username, password, email } = req.body

    var poolData = {
        UserPoolId: `${process.env.COGNITO_USER_POOL_ID}`, // Your user pool id here
        ClientId: `${process.env.COGNITO_CLIENT_ID}`, // Your client id here
    };

    console.log(poolData)

    var userPool = new CognitoUserPool(poolData);
    var attributeList = [];

    var dataEmail = {
        Name: 'email',
        Value: email,
    };

    var dataUsername = {
        Name: 'preferred_username',
        Value: username,
    };

    var attributeEmail = new CognitoUserAttribute(dataEmail);
    var attributeUsername = new CognitoUserAttribute(dataUsername);

    // this feels kinda weird but it's what the docs do
    attributeList.push(attributeEmail)
    attributeList.push(attributeUsername)



    userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
            console.log(err)
            return res.send({ error: (err.message ? err.message : "see server logs") })
        }
        else {
            var cognitoUser = result.user;
            res.status(201)
            return res.send({ username: cognitoUser.getUsername() })
        }
    });
})


export { router as authModule }
