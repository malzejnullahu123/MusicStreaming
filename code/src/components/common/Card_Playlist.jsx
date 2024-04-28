import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../axios/AxiosService";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const CardPlaylist = ({ playlistId, name, user_name, image, visibility }) => {
  const [ownerName, setOwnerName] = useState("");

  useEffect(() => {
    ApiService.getUserById(user_name)
      .then(response => {
        setOwnerName(response.data.fullName);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, [user_name]);

  return (
    <Link to={`/playlistDetails/${playlistId}`} className="hover:shadow-lg transition duration-300 ease-in-out block relative">
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:translate-y-[-5px]">
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        <div className="p-4 bg-gray-50">
          <h2 className="text-lg font-bold mb-6">{name}</h2>
          <p className="text-xs text-gray-500 mt-2">Owner: {ownerName}</p>
          <div className="flex justify-between">
            <p>{visibility ? "Visible to public" : "Followers only"}</p>
            <p>{visibility ? <AiFillEye /> : <AiFillEyeInvisible />}</p>
          </div>

        </div>
      </div>
    </Link>
  );
};
