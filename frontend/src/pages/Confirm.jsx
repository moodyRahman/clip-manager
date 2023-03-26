import { useEffect, useState } from "react"
import { handleChange } from "../utils"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser
} from 'amazon-cognito-identity-js';
import { successConfirm } from "../redux/authStore";

const Confirm = () => {

    const verification = useSelector((state) => state.auth.verification)
    const username = useSelector((state) => state.auth.username)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (verification === "unverified") {
            navigate("/signup")
        }
    }, [])
    const [code, setCode] = useState("")

    const handleSubmit = () => {
        var poolData = {
            UserPoolId: `${import.meta.env.VITE_COGNITO_USER_POOL_ID}`, // Your user pool id here
            ClientId: `${import.meta.env.VITE_COGNITO_CLIENT_ID}`, // Your client id here
        };

        var userPool = new CognitoUserPool(poolData);

        var userData = {
            Username: username,
            Pool: userPool,
        };

        var cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }

            dispatch(successConfirm())
            navigate("/auth_test")

        });
    }


    return (
        <>
            you're almost there! check your email for a verification code and check if you recieved it. <br />
            <input placeholder="verification code" value={code} onChange={handleChange(setCode)} /> <br />
            <button onClick={handleSubmit} >submit</button>


        </>
    )
}

export default Confirm