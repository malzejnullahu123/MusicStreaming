
import { genres } from '../assets/constants';
import React, { useState } from 'react';

const NewUploadPopup = ({ isOpen, onClose }) => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
        <p className="mb-4">New Upload</p>
        <div className="mb-4">
          <input type="text" placeholder="Song Name" className="border border-gray-300 rounded-md px-2 py-1" />
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Artist Name" className="border border-gray-300 rounded-md px-2 py-1" />
        </div>
        <div className="mb-4">
          <select
            className="border border-gray-300 rounded-md px-2 py-1"
            onChange={handleGenreChange}
            value={selectedGenre}
          >
            <option value="" disabled>Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>
       
      
        <div className="mb-4">
          <input type="text" placeholder="Link" className="border border-gray-300 rounded-md px-2 py-1" />
        </div>
        <div className="flex justify-center">
          <button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 bg-[#601a56] text-white rounded hover:bg-[#601a56]s">Upload</button>
        </div>
      </div>
    </div>
  );
}

export default NewUploadPopup;
