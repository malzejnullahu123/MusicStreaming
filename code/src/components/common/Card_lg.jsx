import React, { useState, useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import AudioPlayer from "../AudioPlayer"
import { useAuth } from '../../authContext/AuthContext';
import ApiService from '../../axios/AxiosService';

export const Card_lg = ({ songId, embedIMGLink, title, embedLink, artistName }) => {
  const [currentEmbedLink, setCurrentEmbedLink] = useState(null);
  const [isPlayerVisible, setPlayerVisible] = useState(false);
  const { isLoggedIn } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  const handlePlayClick = () => {
    const audio = document.querySelector("audio");
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      if (isLoggedIn) {
        ApiService.postPlayHistory(songId)
          .catch(error => {
            console.error('Error posting play history:', error);
          });
      }
    }

    if (currentEmbedLink !== embedLink) {
      setCurrentEmbedLink(embedLink);
      setPlayerVisible(true);
    } else {
      setPlayerVisible(!isPlayerVisible);
    }
  };

  const handleImgClick = () => {
    window.location.href = `/songDetails/${songId}`;
  }

  const [showDropdown, setShowDropdown] = useState(false);


  // const handleDropdownClose = () => setShowDropdown(false);

  const handleDropdownOptionClick = (option) => {
    switch (option) {
      case "Share on Facebook":
        // spunon
        break;
      case "Share on Instagram":
        // spunon
        break;
        case "Add to playlist":

          break;
      case "Copy Link":
        navigator.clipboard.writeText(window.location.href + `songDetails/${songId}`)
          .then(() => alert('Link copied to clipboard'))
          .catch((error) => console.error('Error copying link to clipboard:', error));
        break;
      default:
        break;
    }
    setShowDropdown(false);
  };


  const handleCreate = async (event) => {
    event.preventDefault();
    const selectedPlaylistId = formData.name;  // Access the selected ID
    console.log("Selected Playlist ID:", selectedPlaylistId);

    try {
      const response = await ApiService.addSongInPlaylist(selectedPlaylistId ,songId);
      console.log("success", response.data);
      setShowPopup(false);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  

  const [formData, setFormData] = useState({
    name: ""
  });

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    ApiService.getMyPlaylists(1,50)
      .then(response => {
        setPlaylists(response.data.map(playlist => ({ id: playlist.playlistId, name: playlist.name })));
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
    <>
      <div className="img relative h-72">
      <img src={embedIMGLink} alt="embedIMGLink" className="w-full h-full object-cover rounded-md cursor-pointer" onClick={handleImgClick} />
      <div className="overlay icon absolute top-1/2 left-[40%] text-white ">
        <AiFillPlayCircle size={50} className="cursor-pointer" onClick={handlePlayClick} />
      </div>
      <div className="overlay absolute bottom-0 right-0 text-white">
        <div className="flex p-3">

          <BsThreeDots size={22} onClick={() => setShowDropdown(!showDropdown)} />
          {showDropdown && (
              <ul className=" overlay dropdown absolute right-0 top-full shadow-md rounded-md bg-black p-2 w-40">
                <li className="dropdown-item hover:bg-gray-200 flex items-center justify-between" onClick={() => handleDropdownOptionClick("Share on Facebook")}>
                  <span>Share on Facebook</span>
                  </li>
                <li className="dropdown-item hover:bg-gray-200 flex items-center justify-between" onClick={() => handleDropdownOptionClick("Share on Instagram")}>
                  <span>Share on Instagram</span>
                </li>
                <li className="dropdown-item hover:bg-gray-200 flex items-center justify-between" onClick={() => setShowPopup("Add to playlist")}>
                  <span>Add to playlist</span>
                </li>
                <li className="dropdown-item hover:bg-gray-200 flex items-center justify-between" onClick={() => handleDropdownOptionClick("Copy Link")}>
                  <span>Copy Link</span>
                </li>
              </ul>
            )}
        </div>
      </div>
    </div>
    <div className="text">
      <h3 className="text-md text-gray-500 font-semibold">{title}</h3>
      <span className="text-gray-400">{artistName}</span>
    </div>

      {/* audiplayer */}
      {/* audiplayer */}
      {/* audiplayer */}
      {/* audiplayer */}

      {isPlayerVisible && (
          <AudioPlayer
            embedIMGLink={embedIMGLink}
            title={title}
            artistName={artistName}
            embedLink={embedLink}
          />
        )}









    {showPopup && (
      <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg max-w-md shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Create your own playlist</h2>
          <p className="text-gray-700 mb-6 text-center">Unleash your musical flair! Craft your own playlist and let your favorite tunes take center stage.</p>
          <form className="space-y-6" onSubmit={handleCreate}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Choose Playlist</label>
              <select value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} name="name" id="name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required>
                <option value="">Select a playlist</option>
                {playlists.map(playlist => (
                  <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                ))}
              </select>
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