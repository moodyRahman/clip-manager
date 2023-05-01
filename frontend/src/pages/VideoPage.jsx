import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import VideoComponent from "../components/Video";
import VideoPlayer from "../components/VideoPlayer";
import { useEffect, useState } from "react";


const Container = styled.div`
	display:flex;
	flex-flow: row;
	flex-wrap: wrap;

	& > * {
		width: 35%;
	}

`

const VideoPage = () => {
	const [videoUrls, setVideoUrls] = useState([]);
	const [search, setSearch] = useState("")
	async function fetchVideoUrls() {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/resources/clips/get`
			);
			const data = await response.json();
			console.log(data)
			setVideoUrls(data);
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

			<SearchBar state={{ search, setSearch }} >Search...</SearchBar>

			<Container>

				{videoUrls.filter((x) => (x.title.toLowerCase().includes(search.toLowerCase())) || (x.description.toLowerCase().includes(search.toLowerCase())))
					.map((v, i) =>
						<VideoComponent key={i} url={v.s3url} title={v.title} description={v.description} />
					)}
			</Container>
		</div>
	);
};

export default VideoPage;
