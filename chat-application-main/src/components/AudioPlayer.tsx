import React from 'react';
import './AudioPlayer.css'; // Import CSS file for styling

const AudioPlayer = ({src} : {src: any}) => {
  return (
    <div className="custom-audio">
      <audio preload='none' controls>
        <source src={src} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default AudioPlayer;
