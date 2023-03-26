import { useEffect, useState } from "react"
import { handleChange } from "../utils"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Confirm = () => {

    const verification = useSelector((state) => state.auth.verification)
    const navigate = useNavigate()
    useEffect(() => {
        if (verification === "unverified") {
            navigate("/signup")
        }
    }, [])
    const [code, setCode] = useState("")

    return (
        <>
            you're almost there! check your email for a verification code and check if you recieved it. <br />
            <input placeholder="verification code" value={code} onChange={handleChange(setCode)} />


        </>
    )
}

export default Confirm