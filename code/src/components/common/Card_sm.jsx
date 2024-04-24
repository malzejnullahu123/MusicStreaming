import React, { useState } from "react";
import { AiFillPlayCircle, AiOutlineHeart } from "react-icons/ai";
import { BsPlayCircle, BsThreeDots } from "react-icons/bs";
import { useAuth } from '../../authContext/AuthContext';
import AudioPlayer from "../AudioPlayer";
import ApiService from '../../axios/AxiosService';

export const Card_sm = ({ songId, embedIMGLink, title, genre, embedLink, artistName, i, show }) => {
  const [isPlayerVisible, setPlayerVisible] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [currentEmbedLink, setCurrentEmbedLink] = useState(null);
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
      <div className='box card relative flex hover:bg-gray-100 p-2 rounded-md transition ease-in-out cursor-pointer' onClick={handlePlayClick}>
        {show && <div className='flex items-center text-lg text-gray-600 mr-5'>{i + 1}</div>}
        <div className='img relative h-16 w-16 mr-5'>
          <img src={embedIMGLink} alt='cover' className='w-full h-full object-cover rounded-md' />
          <div className='overlay icon absolute top-3 left-2 text-white '>
            {isPlaying && currentEmbedLink === embedLink ? (
              <BsPlayCircle size={45} className='show' />
            ) : (
              <AiFillPlayCircle size={50} className='hide absolute -top-1 -left-1' />
            )}
          </div>
        </div>
        <div className='overlay absolute bottom-0 right-0 text-secondary'>
          <div className='flex p-3'>
            <AiOutlineHeart size={22} className='mx-3' />
            <BsThreeDots size={22} />
          </div>
        </div>
        <div className='text'>
          <h3 className='text-md text-gray-500 font-semibold'>{title}</h3>
          <span className='text-gray-400'>{genre}</span>
        </div>
      </div>

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