import { useState, useRef, useEffect } from 'react';
import songs from './data/songs';
import Playlist from './components/Playlist';
import NowPlaying from './components/NowPlaying';

function App() {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);  // Track current time of the song
  const [duration, setDuration] = useState(0);  // Track the duration of the song
  const audioRef = useRef(null);
  const sliderRef = useRef(null);  // Reference to the slider element

  // Effect to play/pause the audio
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);  // Re-run effect when either isPlaying or currentSong changes

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleRestart = () => {
    audioRef.current.currentTime = 0;  // Restart the song from the beginning
    setCurrentTime(0);  // Update the current time to 0
    setIsPlaying(true);  // Start playing again
  };

  // Handle when the slider changes
  const handleSliderChange = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;  // Set audio current time based on slider value
  };

  // Update slider value as the song plays
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Update song duration once the song is loaded
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div className="app">
      {/* Show NowPlaying and Playlist only when a song is playing */}
      {isPlaying && (
        <>
          <NowPlaying 
            song={currentSong} 
            isPlaying={isPlaying} 
            onPlayPause={handlePlayPause} 
          />
          <Playlist 
            songs={songs} 
            currentSong={currentSong} 
            onSelect={song => {
              setCurrentSong(song);
              setIsPlaying(true);  // Start music when a new song is selected
            }} 
          />
        </>
      )}

      {/* Audio Player */}
      <audio 
        ref={audioRef} 
        src={currentSong.audio} 
        onTimeUpdate={handleTimeUpdate} 
        onLoadedMetadata={handleLoadedMetadata} 
      />
      
      {/* Initial Playlist display (without music playing) */}
      {!isPlaying && (
        <div className="initial-playlist">
          <h3>Select a song to play</h3>
          <Playlist 
            songs={songs} 
            currentSong={currentSong} 
            onSelect={song => {
              setCurrentSong(song);
              setIsPlaying(true);  // Start music when a song is selected
            }} 
          />
        </div>
      )}

      {/* Display Play/Pause and Restart Button */}
      <div className="controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        {/* Restart Button */}
        <button onClick={handleRestart}>Restart</button>
      </div>

      {/* Song Progress Slider */}
      {isPlaying && (
        <div className="progress-bar">
          <input 
            ref={sliderRef} 
            type="range" 
            min="0" 
            max={duration || 0} 
            value={currentTime} 
            step="0.1" 
            onChange={handleSliderChange}
            className="slider" 
          />
          <div className="progress-time">
            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to format time in MM:SS format
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${minutes}:${sec < 10 ? `0${sec}` : sec}`;
};

export default App;
