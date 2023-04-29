import React, { Component } from 'react';
import styled from 'styled-components'
import video1 from '../assets/apex_wipe.mp4'
import profilepic from '../assets/moist.png'

const ImageWrapper = styled.ul`
border-radius: 50%;
`

const SpecificVideo = () =>{
    return(
        <>
        <video width="1280" height="720" controls>
            <source src ={video1} type="video/mp4" />
        </video>
        <p>
            Hello this is my title
        </p>
        <ImageWrapper>
            <img style={{ width: 200, borderRadius: "50%" }} src = {profilepic} />
        </ImageWrapper>
        </>
    );
}

export default SpecificVideo