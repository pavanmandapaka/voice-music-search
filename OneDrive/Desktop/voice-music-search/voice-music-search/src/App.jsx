import React, { useState, useEffect } from "react";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
import { searchSong } from "./spotify";
import "./styles.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply stored theme on load
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Handle voice search
  const handleTranscript = async (transcript) => {
    setQuery(transcript);
    setLoading(true);
    const results = await searchSong(transcript);
    setSongs(results);
    setLoading(false);
  };

  // Play song on Spotify
  const playOnSpotify = (songId) => {
    const autoplayUrl = `https://open.spotify.com/track/${songId}?autoplay=true`;
    window.open(autoplayUrl, "_blank");
  };

  return (
    <div className="app-container">
      <h1>🎶 Voice-Controlled Music Search</h1>

      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      {/* Voice Search */}
      <SpeechRecognitionComponent onTranscript={handleTranscript} />

      {/* Search Query Display */}
      <p><strong>Search Query:</strong> {query}</p>

      {/* Loading Spinner */}
      {loading && <div className="spinner"></div>}

      {/* Search Results */}
      <div className="songs-container">
        {songs.length > 0 ? (
          songs.map((song) => (
            <div key={song.id} className="song-card">
              <img src={song.album.images[0]?.url} alt="Album Cover" />
              <p className="song-title">{song.name}</p>
              <p className="artist-name">🎤 {song.artists.map((artist) => artist.name).join(", ")}</p>

              {/* Check if preview_url is available */}
              {song.preview_url ? (
                <audio controls>
                  <source src={song.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p className="no-preview">⚠️ No preview </p>
              )}

              {/* Play Full Song Button */}
              <button
                className="theme-toggle"
                onClick={() => playOnSpotify(song.id)}
                style={{ display: "block", marginTop: "10px", textDecoration: "none" }}
              >
                🎧 Play Full Song
              </button>
            </div>
          ))
        ) : (
          !loading && <p>No songs found. Try another search! 🎵</p>
        )}
      </div>
    </div>
  );
};

export default App;
