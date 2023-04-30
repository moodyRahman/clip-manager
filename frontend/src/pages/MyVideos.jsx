import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VideoComponent from "../components/Video";

// TODO: add delete clip button to this page
// TODO: deploy with terraform

const MyVideos = () => {

    const [clips, setClips] = useState([])

    const userId = useSelector((state) => state.auth.userID);
    const username = useSelector((state) => state.auth.username);

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_BACKEND_URL}/resources/users/${userId}/clips`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setClips(data)
            })
        console.log(userId)
    }, [])

    return <div>
        {clips.map((v, i) => <VideoComponent drill={{ setClips, clips }} key={i} url={v.s3url} id={v.dataValues.id} title={v.dataValues.title} description={v.dataValues.description} />)}
    </div>
}

export default MyVideos;
