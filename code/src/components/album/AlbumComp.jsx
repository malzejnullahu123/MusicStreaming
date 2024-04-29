import React, { useState, useEffect } from "react";
import ApiService from "../../axios/AxiosService";
import {CardAlbum} from "../common/Card_Album"

export const AlbumComp = () => {

  const [page, setPage] = useState(1);
  const [albums, setAlbums] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const role = localStorage.getItem('userRole');


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



  const [formData, setFormData] = useState({
    title: "",
    image: ""
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await ApiService.addNewAlbum(formData);
      setShowPopup(false);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };


  return (
    <>
      <section className='hero mt-8 sm:mt-20'>
        <div className="flex justify-between items-center mb-4">
          <h1 className='text-5xl font-bold mb-5 text-primary'>Album</h1>
          {role == "artist" &&
          <button className="bg-primary text-white px-4 p-1.5 rounded-full" onClick={handleShowPopup}>Add Album</button>
          }
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








      {showPopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg max-w-md shadow-lg"> {/* Added shadow for depth */}
          <h2 className="text-2xl font-bold mb-4 text-center">Add Album</h2> {/* Increased font size and bold for emphasis */}
          <p className="text-gray-700 mb-6 text-center">Unleash your musical flair! Craft your own playlist and let your favorite tunes take center stage.</p> {/* Centered text and increased margin for better spacing */}
          <form className="space-y-6" onSubmit={handleCreate}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Albume title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} name="title" id="title" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
              <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} name="image" id="image" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
            </div>

            <div className="flex justify-center"> 
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button> {/* Enhanced button styling */}
              <button onClick={() => setShowPopup(false)} className="ml-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button> {/* Enhanced button styling */}
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  )
};

