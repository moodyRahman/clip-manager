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


class VideoComponent extends Component {
    render() {
        return(
            <>
                <h1>ALL</h1>
                <VideoWrapper>
                    <VideoWrapperInline>
                        <video width="640" height="360" controls>
                            <source src ={video4} type="video/mp4" />
                        </video>
                        <TitleWrapper>
                            <p>Jason -&nbsp;</p><p>Valorant Teleporter</p>
                        </TitleWrapper>
                    </VideoWrapperInline>
                    <VideoWrapperInline>
                        <video width="640" height="360" controls>
                            <source src ={video2} type="video/mp4" />
                        </video>
                        <TitleWrapper>
                            <p>Jason -&nbsp;</p><p>Battlefield Sniper</p>
                        </TitleWrapper>
                    </VideoWrapperInline>
                    <VideoWrapperInline>
                            <video width="640" height="360" controls>
                                <source src ={video3} type="video/mp4" />
                            </video>
                        <TitleWrapper>
                            <p>Jason -&nbsp;</p><p>Resident Evil Bomb</p>
                        </TitleWrapper>
                    </VideoWrapperInline>
                </VideoWrapper>

                <h1>APEX LEGENDS</h1>
                <VideoWrapper>
                    <VideoWrapperInline>
                            <video width="640" height="360" controls>
                                <source src ={video1} type="video/mp4" />
                            </video>
                        <TitleWrapper>
                            <p>Jason -&nbsp;</p><p>Apex Legends Wipe</p>
                        </TitleWrapper>
                    </VideoWrapperInline>
                    <VideoWrapperInline>
                            <video width="640" height="360" controls>
                                <source src ={video5} type="video/mp4" />
                            </video>
                        <TitleWrapper>
                            <p>Jason -&nbsp;</p><p>Apex Legends Heirloom</p>
                        </TitleWrapper>
                    </VideoWrapperInline>
                </VideoWrapper>
            </>
        );
    }
}

export default VideoComponent