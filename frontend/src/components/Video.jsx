import React, { Component, useEffect, useState } from 'react';
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

const Container = styled.div`
    background: #32323d;
    margin-bottom: 25px;
    margin-top: 10px;
    margin-left: 15px;
    padding: 15px 25px 25px;
    width: 30%;

`

const DeleteButton = ({ id, title, drill: { clips, setClips } }) => {

    const userId = useSelector((state) => state.auth.userID);
    const [areYouSure, setSure] = useState(false)
    const onClick = (e) => {
        if (!areYouSure) {
            setSure(true)
            return
        }

        if (areYouSure) {
            console.log(`${import.meta.env.VITE_BACKEND_URL}/resources/clips/delete/${id}`)
            console.log({ userID: `${userId}` })

            fetch(`${import.meta.env.VITE_BACKEND_URL}/resources/clips/delete/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userID: `${userId}` })
            })
            setSure(false)
            setClips(clips.filter(x => x.dataValues.id !== id))
        }

    }

    return (
        <button onClick={onClick} > {areYouSure ? <>are you sure?</> : <>delete</>} </button>
    )
}


const VideoComponent = ({ url, title, description, id, drill }) => {

    return (
        <Container>
            <div>
                {id ? <DeleteButton id={id} title={title} drill={drill} /> : <></>}
                <p>{title} | {description}</p>
                <video width="100%" src={url} controls>
                </video>
                {/* <TitleWrapper> */}
                {/* </TitleWrapper> */}
            </div>
            {/* <VideoWrapper>
                <VideoWrapperInline>

                </VideoWrapperInline>
            </VideoWrapper> */}
        </Container>
    );
}

export default VideoComponent