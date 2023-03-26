import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/authStore'
import { useEffect } from 'react'
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
    const loggedin = useSelector((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    return (

        <NavWrapper>
            {
                loggedin ? (<>
                    <NavElement onClick={() => { dispatch(logout()) }} >sign out</NavElement>
                </>) :
                    (
                        <>
                            <NavElement to="/login">login</NavElement>
                            <NavElement to="/signup">sign up</NavElement>
                        </>
                    )
            }
            <NavElement to="/">home</NavElement>
        </NavWrapper>
    )

}

export default Nav