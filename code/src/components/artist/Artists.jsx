import React, { useState, useEffect } from "react";
import ApiService from "../../axios/AxiosService";
import { Link } from "react-router-dom";

export const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchArtists();
  }, [page]); 

  const fetchArtists = async () => {
    try {
      const response = await ApiService.getAllArtists(page, 4);
      setArtists((prevArtists) => {
        const newArtists = response.data.filter(artist => !prevArtists.find(prevArtist => prevArtist.artistId === artist.artistId));
        return [...prevArtists, ...newArtists];
      });
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <section className='mt-8 sm:mt-20'>
        <div className="flex justify-between items-center mb-5">
          <h1 className='text-5xl font-bold text-primary mb-5'>Artists</h1>
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
        <div className="mt-5 text-center">
          <button onClick={handleShowMore} className="bg-primary text-white px-4 py-2 rounded-full">
            Show More
          </button>
        </div>
      </section>
    </div>
  );
};
