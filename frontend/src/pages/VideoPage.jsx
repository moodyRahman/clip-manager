import VideoPlayer from "../components/VideoPlayer";
import { useEffect, useState } from "react";

const VideoPage = () => {
	const [videoUrls, setVideoUrls] = useState([]);

	async function fetchVideoUrls() {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/resources/clips/get`);
		const data = await response.json();
		setVideoUrls(data);
		localStorage.setItem("videoUrls", JSON.stringify(data)); // store data in localStorage
	}

	useEffect(() => {
		const cachedData = localStorage.getItem("videoUrls");
		if (cachedData) {
			setVideoUrls(JSON.parse(cachedData)); // retrieve cached data from localStorage
		} else {
			fetchVideoUrls();
		}
	}, []);

	return (
		<div>
			<h1>All Videos</h1>
			<VideoPlayer videoUrls={videoUrls} />
		</div>
	);
};

export default VideoPage;
