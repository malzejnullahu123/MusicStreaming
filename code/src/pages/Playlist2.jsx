import React, { useState } from "react";
import { SongCard } from "../components";

const Playlist2 = () => {
  const [activeSong, setActiveSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data for Playlist 1
  const playlistData = [
    {
      key: "1",
      title: "Song from Playlist 2",
      subtitle: "Artist Name 1",
      images: { coverart: "https://via.placeholder.com/150" },
    },
    {
      key: "1",
      title: "Song from Playlist 2",
      subtitle: "Artist Name 1",
      images: { coverart: "https://via.placeholder.com/150" },
    },
    {
      key: "1",
      title: "Song from Playlist 2",
      subtitle: "Artist Name 1",
      images: { coverart: "https://via.placeholder.com/150" },
    },
    // Add more songs...
  ];

  const filteredSongs = searchTerm
    ? playlistData.filter(
        (song) =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : playlistData;

  const handlePlayClick = (song, index) => {
    setActiveSong({ ...song, index });
    setIsPlaying(true);
  };

  const handlePauseClick = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Playlist 1</h2>
        <input
          type="text"
          placeholder="Search Songs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-base p-2 rounded-full"
        />
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {filteredSongs.map((song, index) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePlayClick={() => handlePlayClick(song, index)}
            handlePauseClick={handlePauseClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist2;
