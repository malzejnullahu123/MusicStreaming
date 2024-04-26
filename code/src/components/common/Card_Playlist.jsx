import React from "react";
import { Link } from "react-router-dom";

export const CardPlaylist = ({ playlistId, name, user_name, image }) => {

  return (
    <Link to={`/playlistDetails/${playlistId}`} className="hover:shadow-lg transition duration-300 ease-in-out block relative">
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:translate-y-[-5px]">
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        <div className="p-4 bg-gray-50">
          <h2 className="text-lg font-bold mb-6">{name}</h2>
          <p className="text-xs text-gray-500 mt-2">Owner: {user_name}</p>
        </div>
      </div>
    </Link>
  );
  
};
