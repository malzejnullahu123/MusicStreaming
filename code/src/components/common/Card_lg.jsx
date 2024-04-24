import React, { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import AudioPlayer from "../AudioPlayer"
import { useAuth } from '../../authContext/AuthContext';
import ApiService from '../../axios/AxiosService';

export const Card_lg = ({ songId, embedIMGLink, title, embedLink, artistName }) => {
  const [currentEmbedLink, setCurrentEmbedLink] = useState(null);
  const [isPlayerVisible, setPlayerVisible] = useState(false);
  const { isLoggedIn } = useAuth();

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

  return (
    <>
      <div className="img relative h-72">
        <img src={embedIMGLink} alt="embedIMGLink" className="w-full h-full object-cover rounded-md" />
        <div className="overlay icon absolute top-1/2 left-[40%] text-white ">
          <AiFillPlayCircle size={50} className="cursor-pointer" onClick={handlePlayClick} />
        </div>
        <div className="overlay absolute bottom-0 right-0 text-white">
          <div className="flex p-3">
            <BsThreeDots size={22} />
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
    </>
  );
};

      {/* {isPlayerVisible && (
        <div
          className="fixed bottom-0 left-0 right-0 text-white p-4 flex items-center justify-center"
          style={{
            zIndex: 9999,
            backdropFilter: "blur(10px)",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div className="flex items-center w-full">
            <img
              src={embedIMGLink}
              alt="Song cover"
              className="w-16 h-16 mr-4 object-cover rounded-md hidden md:block"
            />
            <div className="flex-1 relative">
              <div className="ml-6">
              <div className="flex items-center">
                <h3 className="text-lg text-black font-semibold mb-1 mr-4" style={{ textShadow: "0 0 5px white" }}>{title}</h3>
                <p className="text-sm text-black" style={{ textShadow: "0 0 5px white" }}>{artistName}</p>
              </div>
              </div>
              <audio controls autoPlay src={embedLink} className="w-full ml-4">
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      )} */}