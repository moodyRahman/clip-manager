import { useDispatch, useSelector } from "react-redux"
import AuthHome from "../pages/AuthHome"
import VideoComponent from "./Video"

const HomeSelector = () => {
    const loggedin = useSelector((state) => state.auth.isLoggedIn)
    return loggedin ? <AuthHome /> : 
    <>
    <div className="video-component">
        <VideoComponent>Title</VideoComponent>
    </div>
    </>
}

export default HomeSelector