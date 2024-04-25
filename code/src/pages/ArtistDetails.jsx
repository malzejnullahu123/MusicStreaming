import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../axios/AxiosService";
import { Card_sm } from "../components/common/Card_sm";

export const ArtistDetails = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistResponse, songsResponse] = await Promise.all([
          ApiService.getArtistById(artistId),
          ApiService.getSongsByArtist(artistId)
        ]);
        setArtist(artistResponse.data);
        setSongs(songsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [artistId]);

  useEffect(() => {
    const fetchGenreNames = async () => {
      const genreIds = songs.map((song) => song.genreId);
      const genreNames = await Promise.all(
        genreIds.map(async (genreId) => {
          try {
            const response = await ApiService.getGenreById(genreId);
            return response.data.name;
          } catch (error) {
            console.error('Error fetching genre name:', error);
            return "Unknown Genre";
          }
        })
      );

      setSongs((prevSongs) =>
        prevSongs.map((song, index) => ({
          ...song,
          genreName: genreNames[index]
        }))
      );
    };

    if (songs.length > 0 && !songs[0].genreName) {
      fetchGenreNames();
    }
  }, [songs]);

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg shadow-lg">
      {loading ? (
        <p>Loading...</p>
      ) : artist ? (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{artist.name}</h1>
          <p className="text-gray-700 mb-4">These are all the songs from {artist.name}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {songs.map((song, index) => (
              <Card_sm
              songId={song.songId}
                embedIMGLink={song.embedIMGLink}
                title={song.title}
                genre={song.genreName}
                embedLink={song.embedLink}
                artistName={artist.name}
                show={true}
                i={index}
              />
            ))}
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};
