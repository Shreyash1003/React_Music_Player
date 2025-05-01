import React from 'react';

export default function NowPlaying({ song, isPlaying, onPlayPause }) {
return (
    <div className="now-playing">
    <img src={song.cover} alt={song.title} width="200" />
    <h2>{song.title}</h2>
    <p>{song.artist}</p>

    <button onClick={onPlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
    </button>
    </div>
);
}
