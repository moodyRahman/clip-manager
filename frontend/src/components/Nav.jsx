import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/authStore'
import { useEffect } from 'react'
import SearchBar from './SearchBar'


const NavWrapper = styled.ul`
    list-style-type: none;
    margin: 3%;
    padding: 0;
    display: flex;
    justify-content: space-between;
    background-color: #17171a;
    border: ridge;
`

const NavElement = styled(Link)`
    display: inline;
    padding-right: 4%;
    padding-left: 4%;
    font-size: 175%;
    color: white;
`

const Nav = () => {
    const loggedin = useSelector((state) => state.auth.isLoggedIn)
    const verification = useSelector((state) => state.auth.verification)
    const dispatch = useDispatch()

    const nav = verification !== "in progress" ?
        <>
            {
                loggedin ? (<>
                    <NavElement to="/">Home</NavElement>
                    <NavElement to="/video">all clips</NavElement>
                    <NavElement to="/myclips">my clips</NavElement>
                    <NavElement to="/upload">upload</NavElement>
                    <NavElement onClick={() => { dispatch(logout()) }} >sign out</NavElement>

                </>) :
                    (
                        <>
                            <NavElement to="/signup">Sign Up</NavElement>
                            <NavElement to="/login">Login</NavElement>
                        </>
                    )
            }
        </> :
        <><NavElement to="/" onClick={() => { dispatch(logout()) }}>cancel</NavElement></>


    return (

        <NavWrapper>
            {nav}
        </NavWrapper>
    )

}

export default Nav