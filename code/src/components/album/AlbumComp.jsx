import React, { useState, useEffect } from "react";
import ApiService from "../../axios/AxiosService";
import { Link } from "react-router-dom";

const AlbumCard = ({ albumId, title, image, artistName, releaseDate }) => {
  const getRelativeTime = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 24) {
      return `${Math.floor(hours / 24)} days ago`;
    }
    return `${hours} hours ago`;
  };

  return (
    <Link to={`/albumDetails/${albumId}`} className="hover:shadow-lg transition duration-300 ease-in-out block relative">
      <div className='box card lg:box-border lg:box-content rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400'>
        <img src={image} alt={title} className='w-full h-40 object-cover transition duration-300 ease-in-out transform hover:scale-105' />
        <div className='p-4'>
          <h2 className='text-lg font-bold mb-2'>{title}</h2>
          <p className='text-sm'>{artistName}</p>
        </div>
        <p className='text-xs absolute bottom-0 right-0 bg-white bg-opacity-75 p-1 rounded-bl-lg'>{getRelativeTime(releaseDate)}</p>
      </div>
    </Link>
  );
};






export const AlbumComp = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    ApiService.getAllAlbums()
      .then(response => {
        setAlbums(response.data);
      })
      .catch(error => {
        console.error('Error fetching albums:', error);
      });
  }, []);

  return (
    <>
      <section className='hero mt-8 sm:mt-20'>
        <h1 className='text-5xl font-bold mb-5 text-primary'>Album</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {albums.map((album, i) => (
            <AlbumCard
              key={i}
              albumId={album.albumId}
              title={album.title}
              image={album.image}
              artistName={album.artistName}
              releaseDate={album.releaseDate}
            />
          ))}
        </div>
      </section>
    </>
  );
};
