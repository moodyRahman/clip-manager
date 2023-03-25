import { useRef, useState } from "react"


const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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