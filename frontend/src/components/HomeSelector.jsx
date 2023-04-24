import { useDispatch, useSelector } from "react-redux"
import AuthHome from "../pages/AuthHome"
import Video from "./Video"
import VideoComponent from "./Video"
import "../index.css"

const HomeSelector = () => {
    const loggedin = useSelector((state) => state.auth.isLoggedIn)
    return (
        loggedin ? <AuthHome /> : 
        <>
            <div>saucey home page</div>
            <div className="video-component">
                <VideoComponent>Title</VideoComponent>
            </div>
        </>
    )
}

export default HomeSelector