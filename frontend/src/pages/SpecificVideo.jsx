import React, { Component } from 'react';
import styled from 'styled-components'
import video from '../assets/video.mp4'
import moist from '../assets/moist.png'

const ImageWrapper = styled.ul`
border-radius: 50%;
`

const SpecificVideo = () =>{
    // class VideoPage extends Component {
    //     render() {
    //         return(
    //             <>
    //             <video width="640" height="360" controls>
    //                        <source src ={video} type="video/mp4" />
    //             </video>
    //             <p>HELLO IS THIS WORKING?</p>
    //             </>
    //         );
    
    //         }
    //     }
    return(
        <>
        <video width="720" height="400" controls>
            <source src ={video} type="video/mp4" />
        </video>
        <p>
            Hello thisis my title
        </p>
        <ImageWrapper>
        <img style={{ width: 130, height: 80, borderRadius: 10 }} src = {moist} />
        </ImageWrapper>
        </>
    );
}

export default SpecificVideo