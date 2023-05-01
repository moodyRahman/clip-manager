
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, useNavigate } from "react-router-dom"

const ProtectedRoutes = () => {
    const isLoggedin = useSelector((state) => state.auth.isLoggedIn)
    const navigate = useNavigate()

    return (
        isLoggedin ?

            <div style={{ color: "white" }}><Outlet /> </div> :
            <Navigate to="/signup" replace />
    )


}

export default ProtectedRoutes