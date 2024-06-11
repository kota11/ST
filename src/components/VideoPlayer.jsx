import React from 'react';
import { Player } from 'react-player';

const VideoPlayer = ({ video }) => {
  return (
    <div className="video-container">
      <Player
        src={video}
        width="100%"
        height="400"
        controls={true}
      />
    </div>
  );
};

export default VideoPlayer;