import { Link, Outlet } from "react-router-dom"
import styled from "styled-components"
import Nav from "../components/Nav"
// import Nav from "../components/Nav"


const Test = styled.div`
    background: #1C6EA4;
`

const Root = () => {

    return (
        <div>
            <Nav />
            {/* implement a nav bar and some login logic hsdfdfere <br />
            <Link to="/login">login</Link><br />
            <Link to="/signup">sign up</Link><br /> */}
            <Outlet />
        </div>
    )

}

export default Root