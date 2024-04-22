import { useState } from 'react';
import axios from 'axios';
import {genres } from '../assets/constants';

const NewUploadPopup = ({ isOpen, onClose }) => {
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(' http://localhost:5432/song', { //port might be wrong needs to be checked
        title: songName,
        artistId: 1, // Replace with the appropriate artist ID
        genreId: parseInt(selectedGenre), // Assuming genreId is an integer
        embedLink: link,
      });
      console.log('Song uploaded:', response.data);
      setIsLoading(false);
      onClose(); // Close the popup after successful upload
    } catch (error) {
      console.error('Error uploading song:', error);
      setError('Error uploading song. Please try again.');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
        <p className="mb-4">New Upload</p>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Song Name"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Artist Name"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
          <select
  className="border border-gray-300 rounded-md px-2 py-1"
  onChange={handleGenreChange}
  value={selectedGenre}
  required
>
  <option value="" disabled>Select Genre</option>
  {genres.map((genre, index) => (
    <option key={index} value={genre.id}>
      {genre.title}
    </option>
  ))}
</select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-[#601a56] text-white rounded hover:bg-[#601a56]s"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
      </div>
    </div>
  );
}

export default NewUploadPopup;
