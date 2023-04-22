import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UploadPage(props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const userId = useSelector((state) => state.auth.userID);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("file", e.target.fileInput.files[0]);
		formData.append("title", title);
		formData.append("description", description);
		formData.append("userID", userId);

		try {
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
		finally{
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
		<form onSubmit={handleSubmit}>
			<label htmlFor="title">Title:</label>
			<input
				type="text"
				id="title"
				name="title"
				value={title}
				onChange={handleTitleChange}
			/>

			<label htmlFor="description">Description:</label>
			<textarea
				id="description"
				name="description"
				value={description}
				onChange={handleDescriptionChange}
			></textarea>

			<input type="file" name="fileInput" />
			<button type="submit">Upload</button>
		</form>
	);
}

export default UploadPage;
