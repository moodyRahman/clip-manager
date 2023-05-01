import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { successLogin } from "../redux/authStore"
import styled from 'styled-components'

const LogWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    margin-right: 30%;
    margin-left: 30%;
`

const Inp = styled.input`
    padding: 12px 20px;
    background-color: #1a1a1a;
    color:white;
`

const Button = styled.button`
    background-color: #1a1a1a;
    color: white;
`

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log(username, password);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(successLogin({ username: username, userID: data.id }));
            navigate("/video");
        } else {
            setMessage("incorrect credentials")
        }
    };

    const handleChange = (setter) => {
        return (e) => {
            setter(e.target.value);
        };
    };

    return (
        <>
            <LogWrapper>
                <Inp onChange={handleChange(setUsername)} type="text" placeholder="username" value={username} />
                <Inp onChange={handleChange(setPassword)} type="password" placeholder="password" value={password} />
                <Button onClick={handleSubmit}>submit</Button>
                {message}
            </LogWrapper>
        </>
    )
}

export default Login

export { Inp, Button }
