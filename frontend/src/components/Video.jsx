import React, { Component } from 'react';
import styled from 'styled-components'
import video1 from '../assets/apex_wipe.mp4'
import video2 from '../assets/bf_livin.mp4'
import video3 from '../assets/res_bomb.mp4'
import video4 from '../assets/val_tele.mp4'
import video5 from '../assets/apex_red.mp4'

const VideoWrapper = styled.ul`
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
                    <video width="640" height="360" controls>
                       <source src ={video1} type="video/mp4" />
                    </video>
                    <ul>
                    <video width="640" height="360" controls>
                       <source src ={video2} type="video/mp4" />
                    </video>
                    </ul>
                    <ul>
                    <video width="640" height="360" controls>
                       <source src ={video3} type="video/mp4" />
                    </video>
                    </ul>
                </VideoWrapper>

                <TitleWrapper>
                    <p>Title</p>
                </TitleWrapper>
                <VideoWrapper>
                    <video width="640" height="360" controls>
                       <source src ={video4} type="video/mp4" />
                    </video>
                    <ul>
                    <video width="640" height="360" controls>
                       <source src ={video5} type="video/mp4" />
                    </video>
                    </ul>
                </VideoWrapper>
            <p>Title</p>
            </>
        );
    }
}

export default VideoComponent