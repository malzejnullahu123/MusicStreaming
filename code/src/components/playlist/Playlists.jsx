import { CardPlaylist } from "../common/Card_Playlist";
import React, { useState, useEffect } from "react";
import ApiService from "../../axios/AxiosService";

export const Playlists = () => {
  const [page, setPage] = useState(1);
  const [playlists, setPlaylists] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const loggedIn = localStorage.getItem('isLoggedIn');

  useEffect(() => {
    fetchPlaylists();
  }, [page]);

  const fetchPlaylists = async () => {
    try {
      const response = await ApiService.getAllPlaylists(page, 3);
      if (response.data.length === 0) {
        setHasMore(false); 
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


  // {
  //   "name": "string",
  //   "userId": 0,
  //   "image": "string",
  //   "isVisible": true
  // }


  const [formData, setFormData] = useState({
    name: "",
    image: "",
    isVisible: false
  });


  const handleShowPopup = () => {
    setShowPopup(true);
  };
  
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await ApiService.createPlaylist(formData);
      console.log("success", response.data);
      setShowPopup(false);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };
  


  return (
    <>
      <section className="hero mt-8 sm:mt-20">
        <div className="flex justify-between items-center mb-4">
        <h1 className="text-5xl font-bold mb-5 text-primary">Public playlists</h1>
        {loggedIn === 'true' &&
          <button className="bg-primary text-white px-4 p-1.5 rounded-full" onClick={handleShowPopup}>Create your own Playlist</button>
        }
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {playlists.map((playlist, i) => (
            <CardPlaylist
              key={i}
              playlistId={playlist.playlistId}
              name={playlist.name}
              user_name={playlist.userId}
              image={playlist.image}
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




      {showPopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg max-w-md shadow-lg"> 
          <h2 className="text-2xl font-bold mb-4 text-center">Create your own playlist</h2> 
          <p className="text-gray-700 mb-6 text-center">Unleash your musical flair! Craft your own playlist and let your favorite tunes take center stage.</p> 
          <form className="space-y-6" onSubmit={handleCreate}> 
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Playlist Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} name="name" id="name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
              <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} name="image" id="image" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
            </div>
            <div className="flex items-center justify-center mt-4">
            <label htmlFor="visibility" className="text-sm font-medium text-gray-700">Visibility:</label>
              <input
                type="checkbox"
                id="visibility"
                checked={formData.isVisible}
                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                className="ml-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded-md"
              />
              <label htmlFor="visibility" className="ml-1 text-sm font-medium text-gray-700">Public</label>
            </div>

            <div className="flex justify-center"> 
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button> 
              <button onClick={() => setShowPopup(false)} className="ml-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button> 
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );

};
