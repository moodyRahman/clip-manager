import React from "react";

function UploadPage(props) {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", e.target.fileInput.files[0]);
		console.log([...formData.entries()]);

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/resources/clips/upload`, {
				method: "POST",
				body: formData,
			});
			const data = await response.json();
			console.log("Success upload");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="file" name="fileInput" />
			<button type="submit">Upload</button>
		</form>
	);
}

export default UploadPage;
