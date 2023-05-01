import { useSelector } from "react-redux";
import styled from "styled-components";

const AuthHome = () => {
	const username = useSelector((state) => state.auth.username);
	const userId = useSelector((state) => state.auth.userID);

	const Display = styled.div`
		color:white;
	`

	return (
		<Display>
			{typeof username === "string"
				? `welcome ${username}! it's a pleasure to see you`
				: null}
		</Display>
	);
};

export default AuthHome;
