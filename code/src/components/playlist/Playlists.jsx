import { CardPlaylist } from "../common/Card_Playlist";
import React, { useState, useEffect } from "react";
import ApiService from "../../axios/AxiosService";

export const Playlists = () => {
  const [page, setPage] = useState(1);
  const [playlists, setPlaylists] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPlaylists();
  }, [page]);

  const fetchPlaylists = async () => {
    try {
      const response = await ApiService.getAllPlaylists(page, 3);
      if (response.data.length === 0) {
        setHasMore(false); // No more results available
      } else {
        setPlaylists((prevPlaylists) => {
          const newPlaylists = response.data.filter(
            (playlist) => !prevPlaylists.find((prevPlaylist) => prevPlaylist.playlistId === playlist.playlistId)
          );
          return [...prevPlaylists, ...newPlaylists];
        });
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <section className="hero mt-8 sm:mt-20">
        <h1 className="text-5xl font-bold mb-5 text-primary">Public playlists</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {playlists.map((playlist, i) => (
            <CardPlaylist
              key={i}
              playlistId={playlist.playlistId}
              name={playlist.name}
              user_name={playlist.userId}
              image={playlist.image} // Add this line if you have an 'image' property
              visibility={playlist.isVisible}
            />
          ))}
        </div>
        {hasMore && (
          <div className="mt-5 text-center">
            <button onClick={handleShowMore} className="bg-primary text-white px-4 py-2 rounded-full">
              Show More
            </button>
          </div>
        )}
      </section>
    </>
  );
};
