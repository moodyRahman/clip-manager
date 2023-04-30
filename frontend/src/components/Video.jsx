import React, { Component, useEffect } from 'react';
import styled from 'styled-components'
import { useSelector } from "react-redux";

const VideoWrapper = styled.ul`
    display: flex;
    overflow-x: auto;
    gap: 2rem;
    padding-left: 0rem;
`

const VideoWrapperInline = styled.ul`
    display: grid;
    padding-left: 0rem;
`

const TitleWrapper = styled.ul`
    display: flex;
    justify-content: center;
`

const DeleteButton = ({ id, title, drill: { clips, setClips } }) => {

    const userId = useSelector((state) => state.auth.userID);
    const onClick = (e) => {

        console.log(`${import.meta.env.VITE_BACKEND_URL}/resources/clips/delete/${id}`)
        console.log({ userID: `${userId}` })

        fetch(`${import.meta.env.VITE_BACKEND_URL}/resources/clips/delete/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userID: `${userId}` })
        })
        setClips(clips.filter(x => x.dataValues.id !== id))

    }

    return (
        <button onClick={onClick} >delete {title}? {id}</button>
    )
}


const VideoComponent = ({ url, title, description, id, drill }) => {

    return (
        <>
            {id ? <DeleteButton id={id} title={title} drill={drill} /> : <></>}
            <VideoWrapper>
                <VideoWrapperInline>
                    <video width="640" height="360" src={url} controls>
                    </video>
                    <TitleWrapper>
                        <p>{title} -&nbsp;</p><p>{description}</p>
                    </TitleWrapper>
                </VideoWrapperInline>
            </VideoWrapper>
        </>
    );
}

export default VideoComponent