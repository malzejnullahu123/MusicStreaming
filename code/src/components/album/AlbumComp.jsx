import React, { useState, useEffect } from "react";
import ApiService from "../../axios/AxiosService";
import {CardAlbum} from "../common/Card_Album"

export const AlbumComp = () => {

  const [page, setPage] = useState(1);
  const [albums, setAlbums] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, [page]);

  const fetchAlbums = async () => {
    try {
      const response = await ApiService.getAllAlbums(page, 3);
      if (response.data.length === 0) {
        setHasMore(false); // No more results available
      } else {
        setAlbums((prevAlbums) => {
          const newAlbums = response.data.filter(album => !prevAlbums.find(prevAlbum => prevAlbum.albumId === album.albumId));
          return [...prevAlbums, ...newAlbums];
        });
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };


  return (
    <>
      <section className='hero mt-8 sm:mt-20'>
        <div className="flex justify-between items-center mb-4">
          <h1 className='text-5xl font-bold mb-5 text-primary'>Album</h1>
          <button className="bg-primary text-white px-4 p-1.5 rounded-full">Add Album</button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {albums.map((album, i) => (
            <CardAlbum
              key={i}
              albumId={album.albumId}
              title={album.title}
              image={album.image}
              artistName={album.artistName}
              releaseDate={album.releaseDate}
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
  )
};

