import { useSelector } from "react-redux"


const AuthHome = () => {
    const username = useSelector((state) => state.auth.username)


    return (
        <>welcome {username}! it's a pleasure to see you </>
    )

}

export default AuthHome
