import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavWrapper = styled.ul`
    list-style-type: none;
    margin: 40px;
    padding: 0;
`

const NavElement = styled(Link)`
    display: inline;
    padding-right: 30px;
`

const Nav = () => {

    return (

        <NavWrapper>
            <NavElement to="/login">login</NavElement>
            <NavElement to="/signup">sign up</NavElement>
            <NavElement to="/">home</NavElement>
        </NavWrapper>
    )

}

export default Nav