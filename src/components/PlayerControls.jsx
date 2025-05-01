export default function PlayerControls({ isPlaying, onPlayPause }) {
    return (
    <div className="player-controls">
        <button onClick={onPlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
        </button>
    </div>
    );
}
