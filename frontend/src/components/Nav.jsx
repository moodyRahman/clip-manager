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
            <NavElement to="/">home</NavElement>
            <NavElement to="/test">test</NavElement>
            <SearchBar>Search...</SearchBar>
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
            {/* <NavElement to="/">home</NavElement>
            <NavElement to="/test">test</NavElement>
            <SearchBar>Search...</SearchBar> */}
        </> :
        <><NavElement to="/" onClick={() => { dispatch(logout()) }}>cancel</NavElement></>


    return (

        <NavWrapper>
            {nav}
        </NavWrapper>
    )

}

export default Nav