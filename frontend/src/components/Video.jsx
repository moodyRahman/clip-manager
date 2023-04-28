import React, { Component } from 'react';
import styled from 'styled-components'
import video1 from '../assets/apex_wipe.mp4'
import video2 from '../assets/bf_livin.mp4'
import video3 from '../assets/res_bomb.mp4'
import video4 from '../assets/val_tele.mp4'
import video5 from '../assets/apex_red.mp4'

const VideoWrapper = styled.ul`
    display: flex;
    overflow-x: auto;
`

const VideoWrapperInline = styled.ul`
    display: grid;
    padding-left: 0rem;
`

const TextWrapper = styled.ul`
    display: flex;
    justify-content: center;
`


class VideoComponent extends Component {
    render() {
        return(
            <>
                <VideoWrapper>
                    <VideoWrapperInline>
                        <TextWrapper>
                            <p>JASON</p>
                        </TextWrapper>
                        <video width="640" height="360" controls>
                            <source src ={video1} type="video/mp4" />
                        </video>
                        <TextWrapper>
                            <p>Apex Legends Wipe</p>
                        </TextWrapper>
                    </VideoWrapperInline>
                    <VideoWrapperInline>
                    <TextWrapper>
                            <p>JASON</p>
                        </TextWrapper>
                    <video width="640" height="360" controls>
                       <source src ={video2} type="video/mp4" />
                    </video>
                    <TextWrapper>
                            <p>Battlefield Sniper</p>
                        </TextWrapper>
                    </VideoWrapperInline>
                    <VideoWrapperInline>
                    <TextWrapper>
                            <p>JASON</p>
                        </TextWrapper>
                    <video width="640" height="360" controls>
                       <source src ={video3} type="video/mp4" />
                    </video>
                    <TextWrapper>
                            <p>Resident Evil Bomb</p>
                    </TextWrapper>
                    </VideoWrapperInline>
                </VideoWrapper>

                <VideoWrapper>
                <VideoWrapperInline>
                <TextWrapper>
                            <p>JASON</p>
                        </TextWrapper>
                    <video width="640" height="360" controls>
                       <source src ={video4} type="video/mp4" />
                    </video>
                    <TextWrapper>
                            <p>Valorant Teleporter</p>
                    </TextWrapper>
                    </VideoWrapperInline>
                    <VideoWrapperInline>
                    <TextWrapper>
                            <p>JASON</p>
                        </TextWrapper>
                    <video width="640" height="360" controls>
                       <source src ={video5} type="video/mp4" />
                    </video>
                    <TextWrapper>
                            <p>Apex Legends Heirloom</p>
                    </TextWrapper>
                    </VideoWrapperInline>
                </VideoWrapper>
            </>
        );
    }
}

export default VideoComponent