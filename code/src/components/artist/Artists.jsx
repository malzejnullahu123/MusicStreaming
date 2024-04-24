import React, { useState, useEffect } from "react";
import ApiService from "../../axios/AxiosService";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import AddArtistPopup from "./AddArtistPopup"; // Import the popup component

export const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false); // State for managing popup visibility

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await ApiService.getAllArtists(1,10);
      setArtists(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  return (
    <div>
      <section className='mt-8 sm:mt-20'>
        <div className="flex justify-between items-center mb-5">
          <h1 className='text-5xl font-bold text-primary'>Artists</h1>
          <button onClick={() => setPopupOpen(true)} className="flex items-center bg-primary text-white rounded-full px-4 py-2">
            <AiOutlinePlus className="mr-2" />
            Add Artist
          </button>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 sm:grid-cols-1'>
          {artists.map((artist, i) => (
            <Link to={`/artist/${artist.artistId}`} key={artist.artistId}>
              <div className='box card text-center'>
                <div className='img relative h-52 w-52 m-auto'>
                  <img src={artist.embedImgLink} alt='cover' className='w-full h-full object-cover rounded-full' />
                </div>
                <div className='text-center'>
                  <h3 className='text-md text-gray-500 font-semibold'>{artist.name}</h3>
                  <span className='text-gray-400'>aa</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {isPopupOpen && <AddArtistPopup onClose={() => {setPopupOpen(false); fetchArtists();}} />} {/* Render the popup component if isPopupOpen is true */}
    </div>
  );
};
