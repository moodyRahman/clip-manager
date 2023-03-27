import { useState } from "react"
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

    const handleSubmit = async () => {
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
            <input onChange={handleChange(setEmail)} type="text" placeholder="email" value={email} />
            <input onChange={handleChange(setUsername)} type="text" placeholder="username" value={username} />
            <input onChange={handleChange(setPassword)} type="password" placeholder="password" value={password} />
            <button onClick={handleSubmit}>signup</button>
        </>
    )
}

export default Register