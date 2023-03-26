import { useState } from "react"
import {
    CognitoUserPool,
    CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { successRegister } from "../redux/authStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { handleChange } from "../utils";

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = () => {
        console.log(username, password, email)
        var poolData = {
            UserPoolId: `${import.meta.env.VITE_COGNITO_USER_POOL_ID}`, // Your user pool id here
            ClientId: `${import.meta.env.VITE_COGNITO_CLIENT_ID}`, // Your client id here
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
                return;
            }
            else {
                console.log(result)
                dispatch(successRegister({ username: result.user.getUsername(), verification: "in progress" }))
                navigate("/confirm")
            }
        });

    }

    return (
        <>
            <input onChange={handleChange(setEmail)} type="text" placeholder="email" value={email} />
            <input onChange={handleChange(setUsername)} type="text" placeholder="username" value={username} />
            <input onChange={handleChange(setPassword)} type="password" placeholder="password" value={password} />
            <button onClick={handleSubmit}>signup</button>
        </>
    )
}

export default Register