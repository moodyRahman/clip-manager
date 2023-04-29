import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { successLogin } from "../redux/authStore";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async () => {
		console.log(username, password);
		const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: username, password: password }),
		});

		if (res.ok) {
			const data = await res.json();
			dispatch(successLogin({ username: username, userID: data.id }));
			navigate("/");
		}
	};

	const handleChange = (setter) => {
		return (e) => {
			setter(e.target.value);
		};
	};

	return (
		<>
			<input
				onChange={handleChange(setUsername)}
				type="text"
				placeholder="username"
				value={username}
			/>
			<input
				onChange={handleChange(setPassword)}
				type="password"
				placeholder="password"
				value={password}
			/>
			<button onClick={handleSubmit}>submit</button>
		</>
	);
};

export default Login;
