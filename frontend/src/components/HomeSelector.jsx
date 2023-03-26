import { useDispatch, useSelector } from "react-redux"
import AuthHome from "../pages/AuthHome"

const HomeSelector = () => {
    const loggedin = useSelector((state) => state.auth.isLoggedIn)
    return loggedin ? <AuthHome /> : <div>saucey home page</div>
}

export default HomeSelector