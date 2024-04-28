import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../axios/AxiosService";
import { Card_sm } from "../components/common/Card_sm";

export const ArtistDetails = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [following, setFollowing] = useState(false);

  const handleFollow = () => {
    if (following) {
      ApiService.unfollowUser(artistId)
        .then(response => {
          setFollowing(false);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      ApiService.followUser(artistId)
        .then(response => {
          setFollowing(true);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistResponse, songsResponse] = await Promise.all([
          ApiService.getArtistById(artistId),
          ApiService.getSongsByArtist(artistId,page,10)
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
  }, [artistId, page]);

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

  const handleShowMore = () => {
    setPage(page+1);
  };
  const handleShowLess = () => {
    if(page > 1) {
      setPage(page-1);
    }
  };


  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg shadow-lg">
      {loading ? (
        <p>Loading...</p>
      ) : artist ? (
        <div className="flex flex-col justify-center">

          <div className="p-6">
          <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-4">{artist.name}</h1>
          <button onClick={handleFollow} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  {following ? "Following" : "Follow"}
                </button>
          </div>
          

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
                i={index}/>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleShowLess}>Show less</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"onClick={handleShowMore}>Show more</button>
          </div>
        </div>
      ) : (
        <p>no song for this artist</p>
      )}
    </div>
  );
};
