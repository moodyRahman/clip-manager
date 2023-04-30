import { useEffect, useState, useRef } from "react"
import { handleChange } from "../utils"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser
} from 'amazon-cognito-identity-js';
import { successConfirm, successLogin } from "../redux/authStore";
import styled from 'styled-components'

const ConfirmWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    margin-right: 30%;
    margin-left: 30%;
`

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

    const useOnUnmount = (callback, dependencies) => {
        const isUnmounting = useRef(false);

        useEffect(() => () => (isUnmounting.current = true), []);

        useEffect(
            () => () => {
                if (isUnmounting.current) {
                    callback();
                }
            },
            dependencies
        );
    };

    useOnUnmount(() => {
        console.log("you're leaving the page")
    }, [])

    const handleSubmit = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/confirm`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, code: code })
        })
        const data = await res.json()
        if (res.ok) {
            dispatch(successConfirm())
            navigate("/login")
        }
        else {
            // handle error
            console.log(data)
            alert(data)
        }
    }

    const handleResend = () => {
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

        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('call result: ' + result);
        });
    }


    return (
        <>
            <ConfirmWrapper>
                You're almost there! Check your email for a verification code and check if you recieved it. <br />
                DO NOT LEAVE THIS PAGE
                <input placeholder="verification code" value={code} onChange={handleChange(setCode)} /> <br />
                <button onClick={handleSubmit} >submit</button> <br /> <br />
                <button onClick={handleResend} >resend verification</button>


            </ConfirmWrapper>
        </>
    )
}

export default Confirm