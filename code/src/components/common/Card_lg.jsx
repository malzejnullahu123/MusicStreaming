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

  const handleImgClick = () => {
    window.location.href = `/songDetails/${songId}`;
  }

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this song: ${title} by ${artistName}`,
        url: window.location.href
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href+"songDetails/"+songId)
        .then(() => alert('Link copied to clipboard'))
        .catch((error) => console.error('Error copying link to clipboard:', error));
    }
  };
  


  return (
    <>
      <div className="img relative h-72">
        <img src={embedIMGLink} alt="embedIMGLink" className="w-full h-full object-cover rounded-md cursor-pointer" onClick={handleImgClick} />
        <div className="overlay icon absolute top-1/2 left-[40%] text-white ">
          <AiFillPlayCircle size={50} className="cursor-pointer" onClick={handlePlayClick} />
        </div>
        <div className="overlay absolute bottom-0 right-0 text-white">
          <div className="flex p-3">
            <BsThreeDots size={22} onClick={handleShareClick} />
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
