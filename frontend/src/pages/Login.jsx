import { useEffect, useRef, useState } from "react"
import * as AWS from 'aws-sdk/global';

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // tearing this straight out of the documentation
    const handleSubmit = () => {
        console.log(username, password)

    }

    const handleChange = (setter) => {
        return (e) => {
            setter(e.target.value)
        }
    }

    return (
        <>
            <input onChange={handleChange(setUsername)} type="text" placeholder="username" value={username} />
            <input onChange={handleChange(setPassword)} type="password" placeholder="password" value={password} />
            <button onClick={handleSubmit}>submit</button>
        </>
    )
}

export default Login