import React, { Component, useEffect } from 'react';
import styled from 'styled-components'
// import video1 from '../assets/apex_wipe.mp4'
// import video2 from '../assets/bf_livin.mp4'
// import video3 from '../assets/res_bomb.mp4'
// import video4 from '../assets/val_tele.mp4'
// import video5 from '../assets/apex_red.mp4'

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


const VideoComponent = ({ url, title, description }) => {

    return (
        <>
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