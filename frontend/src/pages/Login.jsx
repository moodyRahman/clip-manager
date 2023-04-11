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

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async () => {
        console.log(username, password)
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })

        if (res.ok) {
            dispatch(successLogin(username))
            navigate("/")
        }


    }

    const handleChange = (setter) => {
        return (e) => {
            setter(e.target.value)
        }
    }

    return (
        <>
        <LogWrapper>
            <input onChange={handleChange(setUsername)} type="text" placeholder="username" value={username} />
            <input onChange={handleChange(setPassword)} type="password" placeholder="password" value={password} />
            <button onClick={handleSubmit}>submit</button>
        </LogWrapper>
        </>
    )
}

export default Login