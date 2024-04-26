import React from "react";
import { Link } from "react-router-dom";

export const CardAlbum = ({ albumId, title, image, artistName, releaseDate }) => {
const formatReleaseDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
    };

  return (
    <Link to={`/playlistDetails/${albumId}`} className="hover:shadow-lg transition duration-300 ease-in-out block relative">
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:translate-y-[-5px]">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="p-4 bg-gray-50">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="text-sm">{artistName}</p>
          <p className="text-xs text-gray-500 mt-2">{formatReleaseDate(releaseDate)}</p>
        </div>
      </div>
    </Link>
  );
};
