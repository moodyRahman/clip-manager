import { useEffect, useRef, useState } from "react"
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
} from 'amazon-cognito-identity-js';

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    // tearing this straight out of the documentation

    const handleSubmit = () => {
        console.log(username, password, email)
        var poolData = {
            UserPoolId: `${import.meta.env.VITE_COGNITO_USER_POOL_ID}`, // Your user pool id here
            ClientId: `${import.meta.env.VITE_COGNITO_CLIENT_ID}`, // Your client id here
        };

        var userPool = new CognitoUserPool(poolData);
        var attributeList = [];

    }

    const handleChange = (setter) => {
        return (e) => {
            setter(e.target.value)
        }
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