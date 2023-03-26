
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, useNavigate } from "react-router-dom"

const UnprotectedRoutes = () => {
    const isLoggedin = useSelector((state) => state.auth.isLoggedIn)
    const navigate = useNavigate()

    return (
        isLoggedin ?
            <Navigate to="/" replace /> :
            <Outlet />
    )


}

export default UnprotectedRoutes