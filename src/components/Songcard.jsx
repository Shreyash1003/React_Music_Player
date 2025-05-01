function SongCard({ song, isActive, onSelect }) {
    return (
    <div onClick={() => onSelect(song)} className={`song-card ${isActive ? "active" : ""}`}>
        <img src={song.cover} alt={song.title} />
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
    </div>
    );
}