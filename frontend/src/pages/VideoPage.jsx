import VideoPlayer from "../components/VideoPlayer";
import { useEffect, useState } from "react";

const VideoPage = () => {
	const [videoUrls, setVideoUrls] = useState([]);

	async function fetchVideoUrls() {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/resources/clips/get`
			);
			const data = await response.json();
			const urls = data.map((clip) => clip.s3url); // Extract s3url property from each clip object
			setVideoUrls(urls);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		fetchVideoUrls();
	}, []);

	return (
		<div>
			<h1>All Videos</h1>
			<VideoPlayer videoUrls={videoUrls} />
		</div>
	);
};

export default VideoPage;
