import React from 'react';

// really basic component to play video

const VideoPlayer = ({ videoUrls }) => {
  const handleEnded = (index, videoElements) => {
    // Play the next video in the array if available
    if (index < videoUrls.length - 1) {
      videoElements[index + 1].play();
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', overflow: 'auto', maxHeight: '80vh' }}>
      {videoUrls.map((url, index) => (
        <video key={index} src={url} controls onEnded={() => handleEnded(index, videoElements)}>
          Sorry, your browser doesn't support embedded videos.
        </video>
      ))}
    </div>
  );
};

export default VideoPlayer;
