import { Link, Outlet } from "react-router-dom"


const Root = () => {

    return (
        <div>
            implement a nav bar and some login logic here <br />
            <Link to="/login">login</Link><br />
            <Link to="/signup">sign up</Link><br />

            <Outlet />
        </div>
    )

}

export default Root