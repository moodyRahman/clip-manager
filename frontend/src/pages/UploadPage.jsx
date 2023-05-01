import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Inp } from "./Login";

const Section = styled.div`
margin-top: 25px;
`

function UploadPage(props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [uploading, setUploading] = useState(false)
	const userId = useSelector((state) => state.auth.userID);
	const username = useSelector((state) => state.auth.username);

	const navigate = useNavigate();

	useEffect(() => {
		console.log(userId)
	})

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("file", e.target.fileInput.files[0]);
		formData.append("title", title);
		formData.append("description", description);
		formData.append("userID", userId);
		formData.append("username", username);


		try {
			setUploading(true)
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/resources/clips/upload`,
				{
					method: "POST",
					body: formData,
				}
			);
			const data = await response.json();
			console.log("Success upload");
		} catch (err) {
			console.error(err);
		}
		finally {
			navigate("/video")
		}
	};

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	return (
		<div>


			<form onSubmit={handleSubmit}>
				<Section>

					{/* <label htmlFor="title">Title:</label> */}
					<Inp
						type="text"
						id="title"
						name="title"
						value={title}
						placeholder="title"
						onChange={handleTitleChange}
					/>

				</Section>
				<Section>
					<textarea
						style={{
							padding: "12px 20px",
							background: "#1a1a1a",
							color: "white"
						}}
						id="description"
						name="description"
						value={description}
						placeholder="description"
						onChange={handleDescriptionChange}
					></textarea>

				</Section>
				<Section>

					<input type="file" name="fileInput" />
					<button type="submit">Upload</button>
				</Section>
			</form>
			{uploading ? <UploadingIndicator /> : <></>}
		</div>
	);
}


const UploadingIndicator = () => {

	const [counter, setCounter] = useState(0)

	useEffect(() => {
		setTimeout(() => {
			setCounter((counter + 1) % 4)
		}, 1000)
	}, [counter])

	return <div>
		uploading{".".repeat(counter)}
	</div>
}


export default UploadPage;
