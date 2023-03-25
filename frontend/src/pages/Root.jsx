import { Link, Outlet } from "react-router-dom"
import styled from "styled-components"
import Nav from "../components/Nav"
// import Nav from "../components/Nav"


// for some odd reason, applying styling to an Outlet like this just straight up
// doesnt work
// it's a little hacky but I'm just gonna wrap outlet in a padded div
// if we care about mobile compatibility, refactor this styling into a style.css file
const PaddedOutlet = styled(Outlet)`
    margin: 400px;
    padding 400px;
`

const Root = () => {

    return (
        <div>
            <Nav />
            <div style={{ padding: "40px" }}>
                <Outlet />
            </div>
        </div>
    )

}

export default Root