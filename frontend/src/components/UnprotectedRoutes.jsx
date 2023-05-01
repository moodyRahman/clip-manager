
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, useNavigate } from "react-router-dom"

const UnprotectedRoutes = () => {
    const isLoggedin = useSelector((state) => state.auth.isLoggedIn)
    const navigate = useNavigate()

    return (
        isLoggedin ?
            <Navigate to="/" replace /> :
            <div style={{ color: "white" }}>
                <Outlet />
            </div>
    )


}

export default UnprotectedRoutes