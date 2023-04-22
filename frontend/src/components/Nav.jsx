import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authStore";
import { useEffect } from "react";
const NavWrapper = styled.ul`
	list-style-type: none;
	margin: 40px;
	padding: 0;
`;

const NavElement = styled(Link)`
	display: inline;
	padding-right: 30px;
`;

const Nav = () => {
	const loggedin = useSelector((state) => state.auth.isLoggedIn);
	const verification = useSelector((state) => state.auth.verification);
	const dispatch = useDispatch();

	const nav =
		verification !== "in progress" ? (
			<>
				{loggedin ? (
					<>
						<NavElement
							onClick={() => {
								dispatch(logout());
							}}
						>
							sign out
						</NavElement>
					</>
				) : (
					<>
						<NavElement to="/login">login</NavElement>
						<NavElement to="/signup">sign up</NavElement>
					</>
				)}
				<NavElement to="/">home</NavElement>
				<NavElement to="/video">video</NavElement>
				<NavElement to="/upload">upload</NavElement>
			</>
		) : (
			<>
				<NavElement
					to="/"
					onClick={() => {
						dispatch(logout());
					}}
				>
					cancel
				</NavElement>
			</>
		);

	return <NavWrapper>{nav}</NavWrapper>;
};

export default Nav;
