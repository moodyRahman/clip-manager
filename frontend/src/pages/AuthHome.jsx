import { useSelector } from "react-redux";

const AuthHome = () => {
	const username = useSelector((state) => state.auth.username);
    const userId = useSelector((state) => state.auth.userID);

	return (
		<>
			{typeof username === "string"
				? `welcome ${username}! it's a pleasure to see you`
				: null}
		</>
	);
};

export default AuthHome;
