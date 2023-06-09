import { useState } from "react"
import { successRegister } from "../redux/authStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { handleChange } from "../utils";
import styled from 'styled-components'
import { Button, Inp } from "./Login";

const RegWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    margin-right: 30%;
    margin-left: 30%;
`
const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async () => {


        if (password.length < 9) {
            setMessage("password too short, 9 characters + 1 caps + special character required")
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setMessage("password too short, 9 characters + 1 caps + special character required");
            return;
        }

        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (!format.test(password)) {
            setMessage("password too short, 9 characters + 1 caps + special character required");
            return;
        }

        setMessage("")






        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password, email: email })
        })
        const data = await res.json()
        if (res.ok) {
            dispatch(successRegister(data.username))
            navigate("/confirm")
        }
        else {
            // handle error
            console.log(data)
            alert(data)
        }
    }

    return (
        <>
            <RegWrapper>
                <Inp onChange={handleChange(setEmail)} type="text" placeholder="email" value={email} />
                <Inp onChange={handleChange(setUsername)} type="text" placeholder="username" value={username} />
                <Inp onChange={handleChange(setPassword)} type="password" placeholder="password" value={password} />
                <Button onClick={handleSubmit}>signup</Button>
                {message}
            </RegWrapper>
        </>
    )
}

export default Register