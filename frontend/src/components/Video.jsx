import React, { Component } from 'react';
import styled from 'styled-components'
import video from '../assets/video.mp4'

const VideoWrapper = styled.ul`
    display: flex;

`

const InternalVideoWrapper = styled.ul`
display: flex;
`

const TitleWrapper = styled.ul`
display: flex;
padding-left: 2%;
flex-direction: row;
`


class VideoComponent extends Component {
    render() {
        return(
            <>
                <VideoWrapper>
                    <video width="320" height="180" controls>
                       <source src ={video} type="video/mp4" />
                    </video>
                    <InternalVideoWrapper>
                    <video width="320" height="180" controls>
                       <source src ={video} type="video/mp4" />
                    </video>
                    </InternalVideoWrapper>
                </VideoWrapper>
                <TitleWrapper>
                    <p>Title</p>
                </TitleWrapper>
                <VideoWrapper>
                    <video width="320" height="180" controls>
                       <source src ={video} type="video/mp4" />
                    </video>
                </VideoWrapper>
            <p>Title</p>
            </>
        );
    }
}

export default VideoComponent