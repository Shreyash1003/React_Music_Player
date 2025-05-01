export default function Playlist({ songs, currentSong, onSelect }) {
    return (
    <div className="playlist">
        <h3>Playlist</h3>
        <ul>
        {songs.map(song => (
            <li
            key={song.id}
            style={{
                fontWeight: song.id === currentSong.id ? 'bold' : 'normal',
                cursor: 'pointer'
            }}
            onClick={() => onSelect(song)}
            >
            {song.title}
            </li>
        ))}
        </ul>
    </div>
    );
}